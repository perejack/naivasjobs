# SwiftPay - M-Pesa Payment Integration Platform

A modern payment integration platform that enables businesses to accept M-Pesa payments through a simple API.

## Features

- 🚀 **STK Push API** - Initiate payments directly to customer phones
- 📊 **Dashboard** - Real-time transaction analytics
- 🔑 **API Keys** - Secure key management
- 🔔 **Webhooks** - Real-time payment notifications
- 📱 **Responsive** - Works on all devices

## Tech Stack

- **Frontend**: React + Vite
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Deployment**: Vercel

## Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/your-username/swiftpay.git
cd swiftpay
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `supabase/schema.sql`
3. Copy your project URL and API keys

### 3. Configure Environment

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run Development Server

```bash
npm run dev
```

## API Usage

```javascript
const response = await fetch('https://your-app.vercel.app/api/payments/stkpush', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    api_key: 'swp_xxxxx',
    amount: 100,
    phone: '254712345678',
    reference: 'ORDER_123'
  })
});
```

## License

MIT
