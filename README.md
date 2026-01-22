# SwiftLoan with Paystack Integration

A modern loan management application with Paystack payment processing integration, featuring both card payments and M-PESA withdrawals.

## Features

- User registration and authentication
- Loan application processing
- Paystack payment integration for loan payments
- M-PESA withdrawal functionality
- Dashboard for monitoring loan status and repayments

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Payment Processing**: Paystack API
- **Deployment**: Vercel with Serverless Functions

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Paystack account with API keys

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/frankloan.git
cd frankloan
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Environment Variables

Create a `.env` file at the root of your project with the following variables:
```
PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
```

## Vercel Deployment Instructions

1. **Push to GitHub**
   - Push your code to a GitHub repository

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository and click "Import"

3. **Configure Project**
   - Vercel should automatically detect your project as a Vite project
   - Make sure the following settings are correct:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

4. **Set Environment Variables**
   - Under "Environment Variables" section, add the following:
     - `PAYSTACK_PUBLIC_KEY`: Your Paystack public key
     - `PAYSTACK_SECRET_KEY`: Your Paystack secret key
     - `VITE_API_URL`: The URL of your deployed app (leave blank during initial deployment)
     - `VITE_APP_URL`: The URL of your deployed app (leave blank during initial deployment)

5. **Deploy**
   - Click "Deploy"
   - Wait for the deployment to complete

6. **Update Environment Variables**
   - After initial deployment, update your environment variables in the Vercel dashboard:
     - `VITE_API_URL`: The URL of your deployed app (e.g., https://swiftloan.vercel.app)
     - `VITE_APP_URL`: The URL of your deployed app (e.g., https://swiftloan.vercel.app)
   - Go to Settings > Environment Variables in your Vercel project dashboard

7. **Redeploy**
   - After updating environment variables, trigger a redeployment

### Important Notes for Paystack Integration

1. **Webhook Setup**
   - In your Paystack dashboard, set up a webhook endpoint to receive payment events
   - Use the URL: `https://your-vercel-app.vercel.app/api/paystack/webhook`
   - Ensure the webhook is configured to send events for successful payments

2. **Callback URL**
   - Make sure your production callback URL is correctly set in the code
   - This should be: `https://your-vercel-app.vercel.app/account?activation=complete`

3. **Testing**
   - After deployment, test the payment flow to ensure everything works correctly
   - Use Paystack test cards for testing (available in Paystack documentation)

### Development

Run the development server:
```bash
npm run dev
# or
yarn dev
```

### Production Build

Build the application for production:
```bash
npm run build
# or
yarn build
```

## Paystack Integration

This project integrates with Paystack for two main functions:

1. **Card Payments**: Using Paystack's standard checkout for loan payments
2. **M-PESA Withdrawals**: Custom implementation using Paystack's API for withdrawals to M-PESA in Kenya

### M-PESA Integration

For M-PESA functionality, the following Netlify Functions have been implemented:

- `mpesa-check-status.js`: Checks if M-PESA is activated for a user
- `mpesa-withdraw.js`: Processes withdrawal requests to M-PESA accounts

## Deployment

This project is configured for deployment on Netlify:

1. Connect your GitHub repository to Netlify
2. Set the build command to `npm run build` (already configured in netlify.toml)
3. Set the publish directory to `dist` (already configured in netlify.toml)
4. Add your Paystack API keys as environment variables in the Netlify dashboard

## License

[MIT](LICENSE)
