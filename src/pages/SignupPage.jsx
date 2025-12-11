import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Building2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button, Input } from '../components/ui';
import './AuthPages.css';

export const SignupPage = () => {
    const navigate = useNavigate();
    const { signUp, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        businessName: ''
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

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Start signup - don't wait for Promise, auth state change will handle navigation
            signUp(formData.email, formData.password, formData.businessName)
                .then(() => {
                    console.log('✅ SignUp Promise resolved');
                })
                .catch((err) => {
                    console.error('❌ Signup error:', err);
                    setError(err.message || 'Failed to create account');
                    setLoading(false);
                });
        } catch (err) {
            console.error('❌ Signup error:', err);
            setError(err.message || 'Failed to create account');
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
                        <h1>Create account</h1>
                        <p>Start accepting M-Pesa payments today</p>
                    </div>

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <Input
                            label="Business Name"
                            type="text"
                            name="businessName"
                            placeholder="Your Business"
                            value={formData.businessName}
                            onChange={handleChange}
                            icon={<Building2 size={20} />}
                            disabled={loading}
                        />

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

                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
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
                            {loading ? 'Creating account...' : 'Create account'}
                        </Button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="auth-link">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
