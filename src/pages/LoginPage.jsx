import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button, Input } from '../components/ui';
import './AuthPages.css';

export const LoginPage = () => {
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Set a timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
            setLoading(false);
            setError('Connection timeout. Please try again.');
        }, 15000);

        try {
            await signIn(formData.email, formData.password);
            clearTimeout(timeoutId);
            navigate('/dashboard');
        } catch (err) {
            clearTimeout(timeoutId);
            console.error('Login error:', err);

            // Map common errors to user-friendly messages
            let errorMessage = 'Invalid email or password';
            if (err.message?.includes('Invalid login')) {
                errorMessage = 'Invalid email or password';
            } else if (err.message?.includes('Email not confirmed')) {
                errorMessage = 'Please verify your email first';
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
