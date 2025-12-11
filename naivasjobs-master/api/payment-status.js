import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dbpbvoqfexofyxcexmmp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicGJ2b3FmZXhvZnl4Y2V4bW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDc0NTMsImV4cCI6MjA3NDkyMzQ1M30.hGn7ux2xnRxseYCjiZfCLchgOEwIlIAUkdS6h7byZqc';

const supabase = createClient(supabaseUrl, supabaseKey);

// SwiftPay API Configuration
const SWIFTPAY_API_KEY = 'swp_VCru0R620pgCpLAIFPbgLOPPcPBVp0Kx';
const SWIFTPAY_STATUS_URL = 'https://swiftpayv2.vercel.app/api/payments/status';

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).send('');
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { reference } = req.query;

    if (!reference) {
      return res.status(400).json({
        success: false,
        message: 'Payment reference is required'
      });
    }

    console.log('Checking status for reference:', reference);

    // First check local database
    const { data: transaction, error: dbError } = await supabase
      .from('transactions')
      .select('*')
      .or(`reference.eq.${reference},transaction_request_id.eq.${reference}`)
      .maybeSingle();

    if (dbError) {
      console.error('Database query error:', dbError);
    }

    // If we have a success or failed status locally, return it
    if (transaction && (transaction.status === 'success' || transaction.status === 'failed')) {
      console.log(`Payment status found for ${reference}:`, transaction);

      let paymentStatus = 'PENDING';
      if (transaction.status === 'success') {
        paymentStatus = 'SUCCESS';
      } else if (transaction.status === 'failed' || transaction.status === 'cancelled') {
        paymentStatus = 'FAILED';
      }

      return res.status(200).json({
        success: true,
        payment: {
          status: paymentStatus,
          amount: transaction.amount,
          phoneNumber: transaction.phone,
          mpesaReceiptNumber: transaction.receipt_number,
          resultDesc: transaction.result_description,
          resultCode: transaction.result_code,
          timestamp: transaction.updated_at
        }
      });
    }

    // Otherwise, check SwiftPay API for status
    try {
      const statusResponse = await fetch(`${SWIFTPAY_STATUS_URL}?transaction_id=${reference}&api_key=${SWIFTPAY_API_KEY}`);
      const statusData = await statusResponse.json();

      if (statusData.success && statusData.status === 'completed') {
        // Update local database
        if (transaction) {
          await supabase
            .from('transactions')
            .update({
              status: 'success',
              receipt_number: statusData.mpesa_receipt,
              updated_at: new Date().toISOString()
            })
            .eq('transaction_request_id', reference);
        }

        return res.status(200).json({
          success: true,
          payment: {
            status: 'SUCCESS',
            amount: statusData.amount,
            mpesaReceiptNumber: statusData.mpesa_receipt,
            resultDesc: 'Payment completed successfully'
          }
        });
      } else if (statusData.status === 'failed') {
        return res.status(200).json({
          success: true,
          payment: {
            status: 'FAILED',
            resultDesc: statusData.message || 'Payment failed'
          }
        });
      }
    } catch (apiErr) {
      console.error('SwiftPay status check error:', apiErr);
    }

    // Default to pending if no definitive status
    return res.status(200).json({
      success: true,
      payment: {
        status: 'PENDING',
        message: 'Payment is still being processed'
      }
    });

  } catch (error) {
    console.error('Payment status check error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to check payment status',
      error: error.message || String(error)
    });
  }
};
