import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Building2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button, Input } from '../components/ui';
import './AuthPages.css';

export const SignupPage = () => {
    const navigate = useNavigate();
    const { signUp } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        businessName: ''
    });

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

        // Set a timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
            setLoading(false);
            setError('Connection timeout. Please try again.');
        }, 15000);

        try {
            const result = await signUp(formData.email, formData.password, formData.businessName);
            clearTimeout(timeoutId);

            // Check if email confirmation is required
            if (result?.user && !result.session) {
                setSuccess(true);
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            clearTimeout(timeoutId);
            console.error('Signup error:', err);

            let errorMessage = 'Failed to create account';
            if (err.message?.includes('already registered')) {
                errorMessage = 'This email is already registered';
            } else if (err.message?.includes('fetch')) {
                errorMessage = 'Network error. Please check your connection.';
            } else if (err.message) {
                errorMessage = err.message;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
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
                            <h1>Check your email</h1>
                            <p>We've sent you a confirmation link to verify your account.</p>
                        </div>
                        <div className="auth-footer">
                            <Link to="/login">
                                <Button fullWidth>Go to Login</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
