import { useState, useEffect } from 'react';
import { CreditCard, Search, Filter, Download } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { Card, Input, Button } from '../components/ui';
import './TransactionsPage.css';

export const TransactionsPage = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        if (user) {
            fetchTransactions();
        }
    }, [user]);

    const fetchTransactions = async () => {
        try {
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTransactions(data || []);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-KE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status) => {
        const styles = {
            completed: { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' },
            pending: { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
            failed: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' },
            cancelled: { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' }
        };
        return styles[status] || styles.pending;
    };

    const filteredTransactions = transactions.filter(tx => {
        const matchesSearch =
            tx.transaction_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tx.phone?.includes(searchQuery) ||
            tx.mpesa_receipt?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const exportCSV = () => {
        const headers = ['Transaction ID', 'Phone', 'Amount', 'Status', 'Receipt', 'Date'];
        const rows = filteredTransactions.map(tx => [
            tx.transaction_id,
            tx.phone,
            tx.amount,
            tx.status,
            tx.mpesa_receipt || '-',
            formatDate(tx.created_at)
        ]);

        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'swiftpay-transactions.csv';
        a.click();
    };

    return (
        <div className="transactions-page">
            <div className="page-header">
                <div>
                    <h1>Transactions</h1>
                    <p>View and manage all your payment transactions.</p>
                </div>
                <Button variant="secondary" icon={<Download size={20} />} onClick={exportCSV}>
                    Export CSV
                </Button>
            </div>

            {/* Filters */}
            <div className="filters-bar">
                <div className="search-input">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search by ID, phone, or receipt..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="status-filter">
                    <Filter size={20} />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Transactions Table */}
            <Card className="transactions-card">
                <div className="transactions-table">
                    {loading ? (
                        <div className="loading-state">
                            <div className="loading-spinner"></div>
                        </div>
                    ) : filteredTransactions.length > 0 ? (
                        <>
                            <div className="table-header">
                                <span>Transaction ID</span>
                                <span>Phone</span>
                                <span>Amount</span>
                                <span>Status</span>
                                <span>M-Pesa Receipt</span>
                                <span>Date</span>
                            </div>
                            <div className="table-body">
                                {filteredTransactions.map((tx) => {
                                    const statusStyle = getStatusBadge(tx.status);
                                    return (
                                        <div key={tx.id} className="table-row">
                                            <span className="tx-id" title={tx.transaction_id}>
                                                {tx.transaction_id?.slice(0, 18)}...
                                            </span>
                                            <span className="tx-phone">{tx.phone}</span>
                                            <span className="tx-amount">{formatAmount(tx.amount)}</span>
                                            <span
                                                className="tx-status"
                                                style={{ background: statusStyle.bg, color: statusStyle.color }}
                                            >
                                                {tx.status}
                                            </span>
                                            <span className="tx-receipt">{tx.mpesa_receipt || '-'}</span>
                                            <span className="tx-date">{formatDate(tx.created_at)}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <div className="empty-state">
                            <CreditCard size={48} />
                            <h3>No Transactions Found</h3>
                            <p>
                                {searchQuery || statusFilter !== 'all'
                                    ? 'Try adjusting your filters.'
                                    : 'When you start accepting payments, they\'ll appear here.'}
                            </p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};
