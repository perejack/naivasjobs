import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button, Input } from '../components/ui';
import './AuthPages.css';

export const LoginPage = () => {
    const navigate = useNavigate();
    const { signIn, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Navigate when user is authenticated
    useEffect(() => {
        if (user && loading) {
            console.log('✅ User authenticated, navigating to dashboard');
            navigate('/dashboard');
        }
    }, [user, loading, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Start login - don't wait for Promise, auth state change will handle navigation
            signIn(formData.email, formData.password)
                .then(() => {
                    console.log('✅ SignIn Promise resolved');
                })
                .catch((err) => {
                    console.error('❌ Login error:', err);

                    let errorMessage = 'Invalid email or password';
                    if (err.message?.includes('Invalid login')) {
                        errorMessage = 'Invalid email or password';
                    } else if (err.message?.includes('Email not confirmed')) {
                        errorMessage = 'Please check your email and click the confirmation link first';
                    } else if (err.message) {
                        errorMessage = err.message;
                    }

                    setError(errorMessage);
                    setLoading(false);
                });
        } catch (err) {
            console.error('❌ Login error:', err);
            setError(err.message || 'Invalid email or password');
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-bg">
                <div className="auth-orb orb-1"></div>
                <div className="auth-orb orb-2"></div>
            </div>

            <div className="auth-container">
                <Link to="/" className="auth-logo">
                    <span className="logo-icon">⚡</span>
                    <span className="logo-text">SwiftPay</span>
                </Link>

                <div className="auth-card">
                    <div className="auth-header">
                        <h1>Welcome back</h1>
                        <p>Sign in to your account to continue</p>
                    </div>

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            icon={<Mail size={20} />}
                            required
                            disabled={loading}
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            icon={<Lock size={20} />}
                            required
                            disabled={loading}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            loading={loading}
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Don't have an account?{' '}
                            <Link to="/signup" className="auth-link">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
