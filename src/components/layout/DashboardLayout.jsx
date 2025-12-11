import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    CreditCard,
    Key,
    Store,
    Webhook,
    FileText,
    LogOut,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './DashboardLayout.css';

const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Overview', exact: true },
    { path: '/dashboard/transactions', icon: CreditCard, label: 'Transactions' },
    { path: '/dashboard/api-keys', icon: Key, label: 'API Keys' },
    { path: '/dashboard/tills', icon: Store, label: 'Till Numbers' },
    { path: '/dashboard/webhooks', icon: Webhook, label: 'Webhooks' },
    { path: '/docs', icon: FileText, label: 'Documentation' }
];

export const DashboardLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, profile, signOut, loading } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const isActive = (path, exact = false) => {
        if (exact) return location.pathname === path;
        return location.pathname.startsWith(path);
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="dashboard-layout">
            {/* Mobile Header */}
            <header className="dashboard-mobile-header">
                <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <Link to="/" className="mobile-logo">
                    <span className="logo-icon">⚡</span>
                    <span>SwiftPay</span>
                </Link>
            </header>

            {/* Sidebar */}
            <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <Link to="/" className="sidebar-logo">
                        <span className="logo-icon">⚡</span>
                        <span className="logo-text">SwiftPay</span>
                    </Link>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${isActive(item.path, item.exact) ? 'active' : ''}`}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                            {isActive(item.path, item.exact) && <ChevronRight size={16} className="nav-arrow" />}
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="user-avatar">
                            {profile?.business_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="user-details">
                            <span className="user-name">{profile?.business_name || 'My Business'}</span>
                            <span className="user-email">{user?.email}</span>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleSignOut}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <Outlet />
            </main>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
            )}
        </div>
    );
};
