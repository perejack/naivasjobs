import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Clock, CreditCard, Smartphone, FileCheck, UserCheck, ArrowRight, MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import LoanApplication from './components/LoanApplication';
import PrivateRoute from './components/PrivateRoute';
import AuthModal from './components/AuthModal';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AccountPage from './components/Account/AccountPage';
import LoanApprovalPage from './components/LoanApprovalPage';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import AdminDashboard from './components/AdminDashboard';
import Testimonials from './components/Testimonials';
import HowItWorks from './components/HowItWorks';
import LoanCalculatorSection from './components/LoanCalculatorSection';
import FAQSection from './components/FAQSection';
import TrustIndicators from './components/TrustIndicators';

function HomePage() {
  const navigate = useNavigate();
  const { user, setShowAuthModal } = useAuth();

  const handleButtonClick = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      navigate('/apply');
    }
  };

  const features = [
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Secure Process",
      description: "Bank-level security protocols to protect your data"
    },
    {
      icon: <Clock className="w-6 h-6 text-green-600" />,
      title: "Streamlined Process",
      description: "Simple application with fast response times"
    },
    {
      icon: <CreditCard className="w-6 h-6 text-green-600" />,
      title: "Flexible Terms",
      description: "Customizable loan terms that fit your needs"
    }
  ];

  const quickFeatures = [
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Flexible Eligibility",
      description: "We consider various factors beyond credit scores*"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Simple Requirements",
      description: "Streamlined application with minimal documentation*"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "MPESA Disbursement",
      description: "Receive approved funds directly to your MPESA*"
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: "Digital Process",
      description: "Fully digital application and verification"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50/30 pt-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 max-w-xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Unlock Your Dreams
                <span className="text-green-600 block">With Fast Financing</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Apply for loans up to KES 100,000 directly to your M-PESA. Digital application with simple requirements.*
              </p>
              <p className="text-sm text-gray-500 mb-4">
                *Subject to approval. Terms and conditions apply. Representative APR varies based on loan amount and term.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleButtonClick}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="flex-1 relative"
            >
              <div className="relative">
                {/* Main Floating Image */}
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    rotate: [-2, 2, -2]
                  }}
                  transition={{ 
                    duration: 6,
                    ease: "easeInOut",
                    repeat: Infinity
                  }}
                  className="relative z-10"
                >
                  <img
                    src="/hero.jpeg"
                    alt="Digital Loan Application - Professional Financial Services"
                    className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl"
                  />
                  
                  {/* Decorative Gradient Overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-green-600/10 to-transparent pointer-events-none" />
                  
                  {/* Decorative Circles */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ 
                      duration: 8,
                      ease: "easeInOut",
                      repeat: Infinity
                    }}
                    className="absolute -z-10 -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-green-600/20 to-transparent blur-xl"
                  />
                  <motion.div
                    animate={{ scale: [1.2, 1, 1.2] }}
                    transition={{ 
                      duration: 8,
                      ease: "easeInOut",
                      repeat: Infinity
                    }}
                    className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-tr from-green-600/20 to-transparent blur-xl"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Background Decorations */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity
              }}
              className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-green-600/10 via-green-600/5 to-transparent -z-10"
            />
          </div>
        </div>
      </section>

      {/* Quick Features Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-green-600/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-green-600 mb-4">
              Quick Loan Features
            </h2>
            <p className="text-xl text-green-600/80">
              Experience hassle-free borrowing with our streamlined process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {quickFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card bg-green-600 text-white transition-all duration-300 cursor-pointer"
              >
                <div className="text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
                <p className="text-white/90">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-green-600 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-green-600/80">
              Experience the future of lending with our innovative platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center hover:shadow-2xl transition-all duration-300"
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-600/10 mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-lg text-green-600/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Trust Indicators Section */}
      <TrustIndicators />

      {/* Loan Calculator Section */}
      <LoanCalculatorSection />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}

function AppContent() {
  const { showAuthModal, setShowAuthModal, handleAuthSuccess } = useAuth();
  const navigate = useNavigate();

  const onAuthSuccess = () => {
    handleAuthSuccess();
    navigate('/apply');
  };

  return (
    <div className="relative">
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/apply"
            element={
              <PrivateRoute>
                <LoanApplication />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <AccountPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/loan-approved" element={<LoanApprovalPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
      
      <Footer />

      <a
        href="https://wa.me/254105575260"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="font-medium">Talk to us</span>
      </a>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={onAuthSuccess}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;