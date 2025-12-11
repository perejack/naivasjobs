import { Link } from 'react-router-dom';
import { Zap, Shield, Clock, Code, CreditCard, BarChart3, ChevronRight, Check } from 'lucide-react';
import { Button } from '../components/ui';
import './LandingPage.css';

const features = [
    {
        icon: <Zap size={24} />,
        title: 'Lightning Fast',
        description: 'Process payments in under 2 seconds with our optimized API infrastructure.'
    },
    {
        icon: <Shield size={24} />,
        title: 'Bank-Grade Security',
        description: 'End-to-end encryption and secure API keys protect every transaction.'
    },
    {
        icon: <Code size={24} />,
        title: 'Developer Friendly',
        description: 'Simple REST API with comprehensive documentation and code examples.'
    },
    {
        icon: <Clock size={24} />,
        title: '24/7 Availability',
        description: 'Our platform is always available with 99.9% uptime guarantee.'
    },
    {
        icon: <CreditCard size={24} />,
        title: 'Multiple Payment Types',
        description: 'STK Push, C2B, B2C, and more - all from a single integration.'
    },
    {
        icon: <BarChart3 size={24} />,
        title: 'Real-time Analytics',
        description: 'Track all transactions with detailed reports and insights.'
    }
];

const pricingPlans = [
    {
        name: 'Starter',
        price: 'Free',
        description: 'Perfect for testing and small projects',
        features: [
            '1,000 transactions/month',
            'STK Push API',
            'Transaction Status',
            'Email Support',
            'Basic Analytics'
        ]
    },
    {
        name: 'Professional',
        price: 'KES 2,500',
        period: '/month',
        description: 'For growing businesses',
        popular: true,
        features: [
            'Unlimited transactions',
            'All Payment APIs',
            'Webhooks',
            'Priority Support',
            'Advanced Analytics',
            'Custom Callbacks'
        ]
    }
];

export const LandingPage = () => {
    return (
        <div className="landing">
            {/* Navigation */}
            <nav className="landing-nav">
                <div className="container">
                    <Link to="/" className="nav-logo">
                        <span className="logo-icon">⚡</span>
                        <span className="logo-text">SwiftPay</span>
                    </Link>
                    <div className="nav-links">
                        <a href="#features">Features</a>
                        <a href="#pricing">Pricing</a>
                        <a href="/docs">Documentation</a>
                        <Link to="/login">
                            <Button variant="ghost" size="sm">Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button size="sm">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="hero-orb orb-1"></div>
                    <div className="hero-orb orb-2"></div>
                    <div className="hero-orb orb-3"></div>
                </div>
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <span className="badge-dot"></span>
                            Now Live in Production
                        </div>
                        <h1 className="hero-title">
                            M-Pesa Integration
                            <span className="gradient-text"> Made Simple</span>
                        </h1>
                        <p className="hero-description">
                            Accept M-Pesa payments in your app with just a few lines of code.
                            SwiftPay handles the complexity so you can focus on building.
                        </p>
                        <div className="hero-actions">
                            <Link to="/signup">
                                <Button size="lg" icon={<ChevronRight size={20} />}>
                                    Start for Free
                                </Button>
                            </Link>
                            <Link to="/docs">
                                <Button variant="secondary" size="lg">
                                    View Documentation
                                </Button>
                            </Link>
                        </div>

                        {/* Code Preview */}
                        <div className="code-preview">
                            <div className="code-header">
                                <span className="code-dot red"></span>
                                <span className="code-dot yellow"></span>
                                <span className="code-dot green"></span>
                                <span className="code-title">Quick Integration</span>
                            </div>
                            <pre className="code-content">
                                {`// Initiate STK Push
const response = await fetch('https://swiftpay.app/api/payments/stkpush', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    api_key: 'swp_xxxxxxxxxxxxx',
    amount: 100,
    phone: '254712345678',
    reference: 'ORDER_123'
  })
});

const data = await response.json();
console.log(data.transaction_id); // SWP_20231211123456`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features" id="features">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Why SwiftPay</span>
                        <h2 className="section-title">Everything You Need</h2>
                        <p className="section-description">
                            A complete payment platform built for modern developers and businesses.
                        </p>
                    </div>

                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="pricing" id="pricing">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Pricing</span>
                        <h2 className="section-title">Simple, Transparent Pricing</h2>
                        <p className="section-description">
                            Start free and scale as you grow. No hidden fees.
                        </p>
                    </div>

                    <div className="pricing-grid">
                        {pricingPlans.map((plan, index) => (
                            <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                                {plan.popular && <span className="popular-badge">Most Popular</span>}
                                <h3 className="plan-name">{plan.name}</h3>
                                <div className="plan-price">
                                    <span className="price">{plan.price}</span>
                                    {plan.period && <span className="period">{plan.period}</span>}
                                </div>
                                <p className="plan-description">{plan.description}</p>
                                <ul className="plan-features">
                                    {plan.features.map((feature, i) => (
                                        <li key={i}>
                                            <Check size={16} className="check-icon" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/signup">
                                    <Button variant={plan.popular ? 'primary' : 'secondary'} fullWidth>
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Transform Your Payments?</h2>
                        <p>Join thousands of businesses using SwiftPay to accept M-Pesa payments.</p>
                        <Link to="/signup">
                            <Button size="lg">Get Started Free</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <span className="logo-icon">⚡</span>
                            <span className="logo-text">SwiftPay</span>
                        </div>
                        <p className="footer-text">
                            © 2024 SwiftPay. Powered by M-Pesa Daraja API.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
