// SwiftPay Transaction Status API
// Vercel Serverless Function

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const { api_key, transaction_id } = req.body;

        // Validate required fields
        if (!api_key) {
            return res.status(401).json({ success: false, message: 'API key is required' });
        }

        if (!transaction_id) {
            return res.status(400).json({ success: false, message: 'Transaction ID is required' });
        }

        // Verify API key
        const { data: apiKeyData, error: apiKeyError } = await supabase
            .from('api_keys')
            .select('*')
            .eq('api_key', api_key)
            .eq('is_active', true)
            .single();

        if (apiKeyError || !apiKeyData) {
            return res.status(401).json({ success: false, message: 'Invalid API key' });
        }

        // Get transaction
        const { data: transaction, error: txError } = await supabase
            .from('transactions')
            .select('*')
            .eq('transaction_id', transaction_id)
            .eq('user_id', apiKeyData.user_id)
            .single();

        if (txError || !transaction) {
            return res.status(404).json({ success: false, message: 'Transaction not found' });
        }

        return res.status(200).json({
            success: true,
            transaction: {
                transaction_id: transaction.transaction_id,
                status: transaction.status,
                amount: transaction.amount,
                phone: transaction.phone,
                reference: transaction.reference,
                mpesa_receipt: transaction.mpesa_receipt,
                result_desc: transaction.result_desc,
                created_at: transaction.created_at,
                completed_at: transaction.completed_at
            }
        });

    } catch (error) {
        console.error('Status check error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
