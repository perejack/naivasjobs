import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://dbpbvoqfexofyxcexmmp.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicGJ2b3FmZXhvZnl4Y2V4bW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDc0NTMsImV4cCI6MjA3NDkyMzQ1M30.hGn7ux2xnRxseYCjiZfCLchgOEwIlIAUkdS6h7byZqc';

const supabase = createClient(supabaseUrl, supabaseKey);

// SwiftPay M-Pesa Verification Proxy
const MPESA_PROXY_URL = process.env.MPESA_PROXY_URL || 'https://swiftpay-backend-uvv9.onrender.com/api/mpesa-verification-proxy';
const MPESA_PROXY_API_KEY = process.env.MPESA_PROXY_API_KEY || '';

// Query M-Pesa payment status via SwiftPay proxy
async function queryMpesaPaymentStatus(checkoutId) {
  try {
    console.log(`Querying M-Pesa status for ${checkoutId} via proxy`);
    
    const response = await fetch(MPESA_PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        checkoutId: checkoutId,
        apiKey: MPESA_PROXY_API_KEY
      })
    });

    if (!response.ok) {
      console.error('Proxy response status:', response.status);
      return null;
    }

    const data = await response.json();
    console.log('Proxy response:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error querying M-Pesa via proxy:', error.message);
    return null;
  }
}

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
    console.log('--- Payment Status Check Start ---');
    console.log('Query reference:', reference);
    
    if (!reference) {
      console.log('Error: No reference provided');
      return res.status(400).json({
        success: false,
        message: 'Payment reference is required'
      });
    }
    
    console.log('Supabase URL:', supabaseUrl);
    
    try {
      const { data: transaction, error: dbError } = await supabase
        .from('transactions')
        .select('*')
        .or(`reference.eq.${reference},transaction_request_id.eq.${reference}`)
        .maybeSingle();
      
      if (dbError) {
        throw dbError;
      }
      
      console.log('Transaction from DB:', transaction ? 'Found' : 'Not Found');
      
      if (transaction && transaction.id) {
        console.log(`Payment status found for ${reference}:`, JSON.stringify(transaction));
        
        let paymentStatus = 'PENDING';
        try {
          if (transaction.status === 'success' || transaction.status === 'completed') {
            paymentStatus = 'SUCCESS';
          } else if (transaction.status === 'failed' || transaction.status === 'cancelled') {
            paymentStatus = 'FAILED';
          }
        } catch (statusError) {
          console.error('Error parsing transaction status:', statusError);
        }
        
        // If status is still pending, query M-Pesa via SwiftPay proxy
        if (paymentStatus === 'PENDING' && transaction.transaction_request_id) {
          console.log(`Status is pending, querying M-Pesa via proxy for ${transaction.transaction_request_id}`);
          try {
            const proxyResponse = await queryMpesaPaymentStatus(transaction.transaction_request_id);
            console.log('Proxy raw response:', JSON.stringify(proxyResponse));
            
            if (proxyResponse && proxyResponse.success && proxyResponse.payment && proxyResponse.payment.status === 'success') {
              console.log(`Proxy confirmed payment success for ${transaction.transaction_request_id}, updating database`);
              
              // Update transaction to success
              const { data: updatedTransaction, error: updateError } = await supabase
                .from('transactions')
                .update({
                  status: 'success'
                })
                .eq('id', transaction.id)
                .select();
              
              if (!updateError && updatedTransaction && updatedTransaction.length > 0) {
                paymentStatus = 'SUCCESS';
                console.log(`Transaction ${transaction.transaction_request_id} updated to success:`, updatedTransaction[0]);
              } else if (updateError) {
                console.error('Error updating transaction:', updateError);
              }
            } else if (proxyResponse && proxyResponse.payment && proxyResponse.payment.status === 'failed') {
              paymentStatus = 'FAILED';
              console.log(`Proxy confirmed payment failed for ${transaction.transaction_request_id}`);
            }
          } catch (proxyError) {
            console.error('Error in proxy handling block:', proxyError);
            // Continue with local status if proxy query fails
          }
        }
        
        console.log('Final payment status to return:', paymentStatus);
        
        return res.status(200).json({
          success: true,
          payment: {
            status: paymentStatus,
            amount: transaction.amount || 0,
            phoneNumber: transaction.phone || '',
            mpesaReceiptNumber: transaction.receipt_number || '',
            resultDesc: transaction.result_description || '',
            resultCode: transaction.result_code || '',
            timestamp: transaction.updated_at || new Date().toISOString(),
            provider: transaction.payment_provider || 'swiftpay'
          }
        });
      } else {
        console.log(`Payment status not found for ${reference} in DB, trying direct proxy check`);
        // Fall through to catch block logic for direct proxy check
        throw new Error('Transaction not found in DB');
      }
    } catch (dbError) {
      console.error('Database connection failed, falling back to direct proxy check:', dbError.message);
      
      // FALLBACK: If DB is down, try to check M-Pesa status directly via proxy using the reference as checkoutId
      if (reference.startsWith('ws_')) {
        console.log(`Attempting direct proxy check for ${reference} (DB bypass)`);
        const proxyResponse = await queryMpesaPaymentStatus(reference);
        
        if (proxyResponse && proxyResponse.success && proxyResponse.payment && proxyResponse.payment.status === 'success') {
          return res.status(200).json({
            success: true,
            payment: {
              status: 'SUCCESS',
              amount: proxyResponse.payment.amount || 10,
              phoneNumber: proxyResponse.payment.phoneNumber || '',
              mpesaReceiptNumber: proxyResponse.payment.mpesaReceiptNumber || '',
              provider: 'swiftpay',
              debug: 'db_bypass_success'
            }
          });
        }
      }
      
      // If direct check fails or not applicable, return PENDING instead of 500
      return res.status(200).json({
        success: true,
        payment: {
          status: 'PENDING',
          message: 'Payment status currently unavailable, please wait.',
          debug: 'db_bypass_pending'
        }
      });
    }
  } catch (error) {
    console.error('CRITICAL Payment status check error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to check payment status',
      error: error.message || String(error),
      stack: error.stack,
      debug_step: 'global_catch'
    });
  }
};
