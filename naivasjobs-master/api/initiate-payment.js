import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dbpbvoqfexofyxcexmmp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicGJ2b3FmZXhvZnl4Y2V4bW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDc0NTMsImV4cCI6MjA3NDkyMzQ1M30.hGn7ux2xnRxseYCjiZfCLchgOEwIlIAUkdS6h7byZqc'

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// SwiftPay API Configuration
const SWIFTPAY_API_KEY = 'swp_VCru0R620pgCpLAIFPbgLOPPcPBVp0Kx';
const SWIFTPAY_API_URL = 'https://swiftpayv2.vercel.app/api/payments/stkpush';

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).send('');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    if (!req.body) {
      console.error('Request body is missing or empty');
      return res.status(400).json({ success: false, message: 'Request body is missing or invalid' });
    }
    const { phoneNumber, amount = 130, description = 'Job Application Processing Fee' } = req.body;

    console.log('Parsed request:', { phoneNumber, amount, description });

    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    // Format phone number for SwiftPay (must be 254XXXXXXXXX)
    let formattedPhone = phoneNumber.replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    } else if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone;
    }

    const externalReference = `NAIVAS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const swiftpayPayload = {
      api_key: SWIFTPAY_API_KEY,
      amount: parseInt(amount),
      phone: formattedPhone,
      reference: externalReference,
    };

    console.log('Making API request to SwiftPay:', { ...swiftpayPayload, api_key: 'swp_***' });

    const response = await fetch(SWIFTPAY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(swiftpayPayload),
    });

    const data = await response.json();
    console.log('SwiftPay response:', data);

    if (data.success) {
      try {
        const { error: dbError } = await supabase
          .from('transactions')
          .insert({
            transaction_request_id: data.transaction_id,
            status: 'pending',
            amount: amount,
            phone: formattedPhone,
            reference: externalReference,
          });

        if (dbError) {
          console.error('Database insert error:', dbError);
        } else {
          console.log('Transaction stored in database:', data.transaction_id);
        }
      } catch (dbErr) {
        console.error('Database error:', dbErr);
      }

      return res.status(200).json({
        success: true,
        message: 'Payment initiated successfully',
        data: {
          externalReference: data.transaction_id,
          checkoutRequestId: data.checkout_request_id,
          transactionRequestId: data.transaction_id
        }
      });
    } else {
      console.error('SwiftPay error:', data);
      return res.status(400).json({
        success: false,
        message: data.message || 'Payment initiation failed',
        error: data
      });
    }
  } catch (error) {
    console.error('Global error in initiate-payment:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected server error occurred',
      error: error.message || String(error)
    });
  }
};
