import { useState } from 'react';
import { Copy, Check, Code, Terminal, Webhook, CreditCard } from 'lucide-react';
import { Card, CardContent, Button } from '../components/ui';
import './DocsPage.css';

const CodeBlock = ({ code, language = 'javascript' }) => {
    const [copied, setCopied] = useState(false);

    const copyCode = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="code-block">
            <div className="code-header">
                <span>{language}</span>
                <button onClick={copyCode}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre><code>{code}</code></pre>
        </div>
    );
};

export const DocsPage = () => {
    return (
        <div className="docs-page">
            <div className="docs-header">
                <h1>API Documentation</h1>
                <p>Learn how to integrate SwiftPay into your application.</p>
            </div>

            {/* Getting Started */}
            <section className="docs-section">
                <h2>
                    <Terminal size={24} />
                    Getting Started
                </h2>
                <p>
                    SwiftPay provides a simple REST API for accepting M-Pesa payments.
                    All requests should be made to our API endpoint with your API key.
                </p>

                <Card className="info-card">
                    <CardContent>
                        <h3>Base URL</h3>
                        <code>https://swiftpay.vercel.app/api</code>
                    </CardContent>
                </Card>
            </section>

            {/* Authentication */}
            <section className="docs-section">
                <h2>
                    <Code size={24} />
                    Authentication
                </h2>
                <p>
                    All API requests require an API key. Include your API key in the request body:
                </p>

                <CodeBlock
                    code={`{
  "api_key": "swp_xxxxxxxxxxxxxxxxxxxxx",
  // ... other parameters
}`}
                />
            </section>

            {/* STK Push */}
            <section className="docs-section">
                <h2>
                    <CreditCard size={24} />
                    STK Push
                </h2>
                <p>
                    Initiate an STK Push request to prompt the customer to enter their M-Pesa PIN.
                </p>

                <h3>Endpoint</h3>
                <code className="endpoint">POST /api/payments/stkpush</code>

                <h3>Request Body</h3>
                <CodeBlock
                    code={`{
  "api_key": "swp_xxxxxxxxxxxxxxxxxxxxx",
  "amount": 100,
  "phone": "254712345678",
  "reference": "ORDER_123"
}`}
                />

                <h3>Response</h3>
                <CodeBlock
                    code={`{
  "success": true,
  "transaction_id": "SWP_20231211123456789",
  "checkout_request_id": "ws_CO_xxxxx",
  "message": "STK Push sent successfully"
}`}
                />

                <h3>Example (JavaScript)</h3>
                <CodeBlock
                    code={`const response = await fetch('https://swiftpay.vercel.app/api/payments/stkpush', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    api_key: 'swp_xxxxxxxxxxxxxxxxxxxxx',
    amount: 100,
    phone: '254712345678',
    reference: 'ORDER_123'
  })
});

const data = await response.json();

if (data.success) {
  console.log('Transaction ID:', data.transaction_id);
  // Customer will receive STK push on their phone
} else {
  console.error('Error:', data.message);
}`}
                />

                <h3>Example (PHP)</h3>
                <CodeBlock
                    language="php"
                    code={`<?php
$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://swiftpay.vercel.app/api/payments/stkpush",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
    CURLOPT_POSTFIELDS => json_encode([
        "api_key" => "swp_xxxxxxxxxxxxxxxxxxxxx",
        "amount" => 100,
        "phone" => "254712345678",
        "reference" => "ORDER_123"
    ])
]);

$response = curl_exec($curl);
$data = json_decode($response, true);

if ($data['success']) {
    echo "Transaction ID: " . $data['transaction_id'];
} else {
    echo "Error: " . $data['message'];
}
?>`}
                />
            </section>

            {/* Transaction Status */}
            <section className="docs-section">
                <h2>
                    <Terminal size={24} />
                    Transaction Status
                </h2>
                <p>
                    Check the status of a transaction using its transaction ID.
                </p>

                <h3>Endpoint</h3>
                <code className="endpoint">POST /api/payments/status</code>

                <h3>Request Body</h3>
                <CodeBlock
                    code={`{
  "api_key": "swp_xxxxxxxxxxxxxxxxxxxxx",
  "transaction_id": "SWP_20231211123456789"
}`}
                />

                <h3>Response</h3>
                <CodeBlock
                    code={`{
  "success": true,
  "transaction": {
    "transaction_id": "SWP_20231211123456789",
    "status": "completed",
    "amount": 100,
    "phone": "254712345678",
    "mpesa_receipt": "SIS88JC7AM",
    "created_at": "2023-12-11T12:34:56Z"
  }
}`}
                />
            </section>

            {/* Webhooks */}
            <section className="docs-section">
                <h2>
                    <Webhook size={24} />
                    Webhooks
                </h2>
                <p>
                    Configure webhooks to receive real-time notifications when transactions complete.
                </p>

                <h3>Webhook Payload</h3>
                <CodeBlock
                    code={`{
  "event": "payment.completed",
  "data": {
    "transaction_id": "SWP_20231211123456789",
    "status": "completed",
    "amount": 100,
    "phone": "254712345678",
    "mpesa_receipt": "SIS88JC7AM",
    "reference": "ORDER_123",
    "completed_at": "2023-12-11T12:35:00Z"
  }
}`}
                />

                <h3>PHP Webhook Handler</h3>
                <CodeBlock
                    language="php"
                    code={`<?php
// webhook.php - Your webhook endpoint

$payload = file_get_contents('php://input');
$data = json_decode($payload, true);

if ($data['event'] === 'payment.completed') {
    $transaction = $data['data'];
    
    // Update your order status
    $orderId = $transaction['reference'];
    $receipt = $transaction['mpesa_receipt'];
    
    // Mark order as paid in your database
    updateOrderStatus($orderId, 'paid', $receipt);
    
    // Return 200 OK to acknowledge receipt
    http_response_code(200);
    echo json_encode(['status' => 'ok']);
} else {
    http_response_code(400);
}
?>`}
                />
            </section>

            {/* Error Codes */}
            <section className="docs-section">
                <h2>Error Codes</h2>
                <table className="error-table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>401</code></td>
                            <td>Invalid or missing API key</td>
                        </tr>
                        <tr>
                            <td><code>400</code></td>
                            <td>Invalid request parameters</td>
                        </tr>
                        <tr>
                            <td><code>404</code></td>
                            <td>Transaction not found</td>
                        </tr>
                        <tr>
                            <td><code>500</code></td>
                            <td>Internal server error</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};
