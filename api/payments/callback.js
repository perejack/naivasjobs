// SwiftPay M-Pesa Callback Handler
// Vercel Serverless Function

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
    // Always return 200 to M-Pesa
    res.setHeader('Content-Type', 'application/json');

    if (req.method !== 'POST') {
        return res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted' });
    }

    try {
        const callbackData = req.body;

        // Log callback for debugging
        console.log('M-Pesa Callback:', JSON.stringify(callbackData));

        const stkCallback = callbackData?.Body?.stkCallback;
        if (!stkCallback) {
            console.error('Invalid callback structure');
            return res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted' });
        }

        const {
            MerchantRequestID,
            CheckoutRequestID,
            ResultCode,
            ResultDesc,
            CallbackMetadata
        } = stkCallback;

        // Find the transaction
        const { data: transaction, error: findError } = await supabase
            .from('transactions')
            .select('*, api_keys(*, profiles(*))')
            .eq('checkout_request_id', CheckoutRequestID)
            .single();

        if (findError || !transaction) {
            console.error('Transaction not found:', CheckoutRequestID);
            return res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted' });
        }

        // Parse callback metadata
        let mpesaReceipt = null;
        let transactionAmount = null;
        let transactionDate = null;
        let phoneNumber = null;

        if (ResultCode === 0 && CallbackMetadata?.Item) {
            for (const item of CallbackMetadata.Item) {
                switch (item.Name) {
                    case 'MpesaReceiptNumber':
                        mpesaReceipt = item.Value;
                        break;
                    case 'Amount':
                        transactionAmount = item.Value;
                        break;
                    case 'TransactionDate':
                        transactionDate = item.Value;
                        break;
                    case 'PhoneNumber':
                        phoneNumber = item.Value;
                        break;
                }
            }
        }

        // Determine status
        let status = 'failed';
        if (ResultCode === 0) {
            status = 'completed';
        } else if (ResultCode === 1032) {
            status = 'cancelled';
        }

        // Update transaction
        await supabase
            .from('transactions')
            .update({
                status,
                result_code: ResultCode,
                result_desc: ResultDesc,
                mpesa_receipt: mpesaReceipt,
                callback_data: callbackData,
                completed_at: status === 'completed' ? new Date().toISOString() : null
            })
            .eq('id', transaction.id);

        // Send webhook to user if configured
        if (transaction.api_keys?.profiles?.id) {
            const { data: webhooks } = await supabase
                .from('webhooks')
                .select('*')
                .eq('user_id', transaction.api_keys.profiles.id)
                .eq('is_active', true);

            if (webhooks?.length > 0) {
                const webhookPayload = {
                    event: status === 'completed' ? 'payment.completed' : 'payment.failed',
                    data: {
                        transaction_id: transaction.transaction_id,
                        status,
                        amount: transaction.amount,
                        phone: transaction.phone,
                        mpesa_receipt: mpesaReceipt,
                        reference: transaction.reference,
                        result_desc: ResultDesc,
                        completed_at: new Date().toISOString()
                    }
                };

                // Send webhooks (fire and forget)
                for (const webhook of webhooks) {
                    fetch(webhook.url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-SwiftPay-Signature': webhook.secret
                        },
                        body: JSON.stringify(webhookPayload)
                    }).catch(err => console.error('Webhook error:', err));
                }
            }
        }

        return res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted' });

    } catch (error) {
        console.error('Callback processing error:', error);
        return res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted' });
    }
}
