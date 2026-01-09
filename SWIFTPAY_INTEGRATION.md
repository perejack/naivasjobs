# SwiftPay Integration Guide for NaivasJobs

## Overview
This document explains how the NaivasJobs application integrates with SwiftPay for M-Pesa payment processing.

## SwiftPay Credentials
- **API Key:** `sp_25c79c9c-5980-410e-b8e6-b223796c55a6`
- **Till ID:** `dbdedaea-11d8-4bbe-b94f-84bbe4206d3c`
- **Backend URL:** `https://swiftpay-backend-uvv9.onrender.com/api`

## Integration Points

### 1. Payment Initiation (`/api/initiate-payment`)
**Endpoint:** `POST /api/initiate-payment`

**Request Body:**
```json
{
  "phoneNumber": "254712345678",
  "amount": 130,
  "description": "Job Application Processing Fee"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Payment initiated successfully",
  "data": {
    "externalReference": "NAIVASJOBS-1702566000000-123",
    "checkoutRequestId": "NAIVASJOBS-1702566000000-123",
    "transactionRequestId": "NAIVASJOBS-1702566000000-123"
  }
}
```

**How It Works:**
1. Receives phone number, amount, and description from frontend
2. Calls SwiftPay STK Push API: `POST /api/mpesa/stk-push-api`
3. Includes API Key in Authorization header: `Bearer sp_25c79c9c-5980-410e-b8e6-b223796c55a6`
4. Stores transaction in Supabase with status "pending"
5. Returns checkout request ID to frontend

### 2. Payment Status Check (`/api/payment-status`)
**Endpoint:** `GET /api/payment-status?reference=NAIVASJOBS-1702566000000-123`

**Response:**
```json
{
  "success": true,
  "payment": {
    "status": "PENDING|SUCCESS|FAILED",
    "amount": 130,
    "phoneNumber": "254712345678",
    "mpesaReceiptNumber": "ABC123DEF456",
    "resultDesc": "The service request has been accepted successfully.",
    "resultCode": "0",
    "timestamp": "2025-12-14T12:00:00Z",
    "provider": "swiftpay"
  }
}
```

**How It Works:**
1. Queries Supabase transactions table by reference
2. Returns current payment status
3. Status values: PENDING, SUCCESS, FAILED
4. Updates in real-time as webhooks are received

### 3. Application Submission (`/api/submit-application`)
**Endpoint:** `POST /api/submit-application`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "254712345678",
  "location": "Nairobi",
  "education": "Bachelor's Degree",
  "jobTitle": "Software Engineer",
  "salary": 100000,
  "medicalAllowance": 5000,
  "paymentReference": "NAIVASJOBS-1702566000000-123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "applicationId": "uuid-here",
    "reference": "NAIVASJOBS-1702566000000-123"
  }
}
```

## Frontend Integration

### Payment Flow
1. User fills job application form
2. User enters phone number and clicks "Pay"
3. Frontend calls `/api/initiate-payment` with phone number
4. SwiftPay STK Push prompt appears on user's phone
5. User enters M-Pesa PIN to complete payment
6. Frontend polls `/api/payment-status` to check payment status
7. Once payment succeeds, user submits application with payment reference
8. Application is saved with payment status

### Example Frontend Code
```javascript
// Initiate payment
const initiatePayment = async (phoneNumber, amount) => {
  const response = await fetch('/api/initiate-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, amount })
  });
  return response.json();
};

// Check payment status
const checkPaymentStatus = async (reference) => {
  const response = await fetch(`/api/payment-status?reference=${reference}`);
  return response.json();
};

// Submit application
const submitApplication = async (formData, paymentReference) => {
  const response = await fetch('/api/submit-application', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...formData,
      paymentReference
    })
  });
  return response.json();
};
```

## Database Schema

### Transactions Table
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_request_id TEXT,
  status TEXT DEFAULT 'pending', -- pending, success, failed
  amount INTEGER,
  phone TEXT,
  reference TEXT UNIQUE,
  description TEXT,
  payment_provider TEXT DEFAULT 'swiftpay',
  receipt_number TEXT,
  result_description TEXT,
  result_code TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Applications Table
```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name TEXT,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  project_data JSONB,
  payment_reference TEXT,
  payment_status TEXT DEFAULT 'unpaid',
  payment_amount INTEGER DEFAULT 0,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Webhook Integration

SwiftPay sends payment callbacks to your webhook endpoint. The webhook should:
1. Verify the callback is from SwiftPay
2. Update the transaction status in Supabase
3. Update the application payment status if needed

**Webhook Endpoint:** Configure in SwiftPay dashboard
**Callback URL:** `https://your-domain.com/api/webhook`

## Testing

### Test Payment Flow
1. Use test phone number: `254712345678`
2. Use test amount: `130` (KES)
3. Check Supabase for transaction records
4. Verify payment status endpoint returns correct data

### Common Issues

**Issue:** Payment initiation fails with 401
- **Solution:** Verify API key is correct: `sp_25c79c9c-5980-410e-b8e6-b223796c55a6`

**Issue:** Payment status shows PENDING forever
- **Solution:** Ensure webhook is configured and receiving callbacks from SwiftPay

**Issue:** Phone number format error
- **Solution:** Use format `254712345678` (country code + number without +)

## Production Checklist

- [ ] Verify SwiftPay API key and Till ID are correct
- [ ] Test payment flow end-to-end
- [ ] Verify webhook endpoint is accessible
- [ ] Ensure Supabase transactions table exists
- [ ] Test payment status polling
- [ ] Verify application submission with payment reference
- [ ] Monitor payment success rate
- [ ] Set up error logging and alerts

## Support

For issues or questions about SwiftPay integration:
1. Check SwiftPay documentation: https://swiftpayfinancial.vercel.app
2. Review API logs in Supabase
3. Check browser console for frontend errors
4. Verify network requests in browser DevTools

