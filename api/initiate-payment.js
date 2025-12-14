import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dbpbvoqfexofyxcexmmp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicGJ2b3FmZXhvZnl4Y2V4bW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDc0NTMsImV4cCI6MjA3NDkyMzQ1M30.hGn7ux2xnRxseYCjiZfCLchgOEwIlIAUkdS6h7byZqc'

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// SwiftPay Configuration
const SWIFTPAY_API_KEY = 'sp_25c79c9c-5980-410e-b8e6-b223796c55a6';
const SWIFTPAY_TILL_ID = 'dbdedaea-11d8-4bbe-b94f-84bbe4206d3c';
const SWIFTPAY_BACKEND_URL = 'https://swiftpay-backend-uvv9.onrender.com/api';

// Normalize phone number to 254 format
function normalizePhoneNumber(phone) {
  if (!phone) return null;
  
  // Remove any spaces, dashes, or special characters
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  
  // If starts with 0, replace with 254
  if (cleaned.startsWith('0')) {
    cleaned = '254' + cleaned.substring(1);
  }
  
  // If doesn't start with 254, add it
  if (!cleaned.startsWith('254')) {
    cleaned = '254' + cleaned;
  }
  
  // Validate length (should be 12 digits: 254 + 9 digits)
  if (cleaned.length !== 12 || !/^\d+$/.test(cleaned)) {
    return null;
  }
  
  return cleaned;
}

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
    let { phoneNumber, amount = 130, description = 'Job Application Processing Fee' } = req.body;

    console.log('Parsed request (original):', { phoneNumber, amount, description });

    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    // Normalize phone number
    phoneNumber = normalizePhoneNumber(phoneNumber);
    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: 'Invalid phone number format. Use 07XXXXXXXX or 254XXXXXXXXX' });
    }

    console.log('Parsed request (normalized):', { phoneNumber, amount, description });

    if (!SWIFTPAY_API_KEY || !SWIFTPAY_TILL_ID) {
      console.error('SwiftPay credentials are not set');
      return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    const externalReference = `NAIVASJOBS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // SwiftPay STK Push payload
    const swiftpayPayload = {
      phone_number: phoneNumber,
      amount: amount,
      till_id: SWIFTPAY_TILL_ID,
      reference: externalReference,
      description: description
    };

    console.log('Making API request to SwiftPay');

    const response = await fetch(`${SWIFTPAY_BACKEND_URL}/mpesa/stk-push-api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SWIFTPAY_API_KEY}`,
      },
      body: JSON.stringify(swiftpayPayload),
    });

    const responseText = await response.text();
    console.log('SwiftPay response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse SwiftPay response:', responseText);
      return res.status(502).json({
        success: false,
        message: 'Invalid response from payment service'
      });
    }

    if (data.status === 'success' || data.success === true) {
      try {
        const { error: dbError } = await supabase
          .from('transactions')
          .insert({
            transaction_request_id: data.checkoutRequestId || data.request_id || externalReference,
            status: 'pending',
            amount: amount,
            phone: phoneNumber,
            reference: externalReference,
            description: description,
            payment_provider: 'swiftpay'
          });

        if (dbError) {
          console.error('Database insert error:', dbError);
        } else {
          console.log('Transaction stored in database:', data.checkoutRequestId || externalReference);
        }
      } catch (dbErr) {
        console.error('Database error:', dbErr);
      }

      return res.status(200).json({
        success: true,
        message: 'Payment initiated successfully',
        data: {
          externalReference: data.checkoutRequestId || externalReference,
          checkoutRequestId: data.checkoutRequestId || externalReference,
          transactionRequestId: data.checkoutRequestId || externalReference
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
