import { useState, useEffect } from 'react';
import {
    TrendingUp,
    TrendingDown,
    CreditCard,
    Users,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Clock
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent } from '../components/ui';
import './DashboardPage.css';

export const DashboardPage = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalTransactions: 0,
        successfulTransactions: 0,
        totalAmount: 0,
        todayTransactions: 0
    });
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    const fetchDashboardData = async () => {
        try {
            // Fetch transactions
            const { data: transactions, error } = await supabase
                .from('transactions')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Calculate stats
            const successful = transactions?.filter(t => t.status === 'completed') || [];
            const today = new Date().toDateString();
            const todayTx = transactions?.filter(t =>
                new Date(t.created_at).toDateString() === today
            ) || [];

            setStats({
                totalTransactions: transactions?.length || 0,
                successfulTransactions: successful.length,
                totalAmount: successful.reduce((sum, t) => sum + parseFloat(t.amount || 0), 0),
                todayTransactions: todayTx.length
            });

            setRecentTransactions(transactions?.slice(0, 5) || []);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
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
            failed: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }
        };
        return styles[status] || styles.pending;
    };

    const statsCards = [
        {
            title: 'Total Revenue',
            value: formatAmount(stats.totalAmount),
            icon: DollarSign,
            change: '+12.5%',
            positive: true
        },
        {
            title: 'Total Transactions',
            value: stats.totalTransactions,
            icon: CreditCard,
            change: '+8.2%',
            positive: true
        },
        {
            title: 'Success Rate',
            value: stats.totalTransactions > 0
                ? `${Math.round((stats.successfulTransactions / stats.totalTransactions) * 100)}%`
                : '0%',
            icon: TrendingUp,
            change: '+2.1%',
            positive: true
        },
        {
            title: 'Today\'s Transactions',
            value: stats.todayTransactions,
            icon: Clock,
            change: stats.todayTransactions > 0 ? `+${stats.todayTransactions}` : '0',
            positive: stats.todayTransactions > 0
        }
    ];

    if (loading) {
        return (
            <div className="dashboard-loading-state">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="page-header">
                <h1>Dashboard</h1>
                <p>Welcome back! Here's what's happening with your payments.</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {statsCards.map((stat, index) => (
                    <Card key={index} className="stat-card">
                        <CardContent>
                            <div className="stat-header">
                                <span className="stat-title">{stat.title}</span>
                                <div className="stat-icon">
                                    <stat.icon size={20} />
                                </div>
                            </div>
                            <div className="stat-value">{stat.value}</div>
                            <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                                {stat.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                {stat.change} from last month
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Transactions */}
            <Card className="transactions-card">
                <div className="card-header-custom">
                    <h2>Recent Transactions</h2>
                    <a href="/dashboard/transactions" className="view-all">View all</a>
                </div>
                <div className="transactions-table">
                    {recentTransactions.length > 0 ? (
                        <>
                            <div className="table-header">
                                <span>Transaction ID</span>
                                <span>Phone</span>
                                <span>Amount</span>
                                <span>Status</span>
                                <span>Date</span>
                            </div>
                            <div className="table-body">
                                {recentTransactions.map((tx) => {
                                    const statusStyle = getStatusBadge(tx.status);
                                    return (
                                        <div key={tx.id} className="table-row">
                                            <span className="tx-id">{tx.transaction_id?.slice(0, 20)}...</span>
                                            <span className="tx-phone">{tx.phone}</span>
                                            <span className="tx-amount">{formatAmount(tx.amount)}</span>
                                            <span
                                                className="tx-status"
                                                style={{ background: statusStyle.bg, color: statusStyle.color }}
                                            >
                                                {tx.status}
                                            </span>
                                            <span className="tx-date">{formatDate(tx.created_at)}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <div className="empty-state">
                            <CreditCard size={48} />
                            <h3>No transactions yet</h3>
                            <p>When you start accepting payments, they'll appear here.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};
