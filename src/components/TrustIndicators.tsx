import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Award, CheckCircle, Building, Users } from 'lucide-react';

const TrustIndicators: React.FC = () => {
  const indicators = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Licensed & Regulated",
      description: "Fully licensed financial services provider complying with all regulations"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Bank-Level Security",
      description: "256-bit SSL encryption protecting all your personal and financial data"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Industry Certified",
      description: "ISO certified for quality management and information security"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Transparent Pricing",
      description: "No hidden fees - all costs disclosed upfront before you commit"
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "CRB Registered",
      description: "Registered with credit reference bureaus for responsible lending"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "10,000+ Customers",
      description: "Trusted by thousands of satisfied customers across Kenya"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Trust SwiftLoan?
          </h2>
          <p className="text-xl text-gray-600">
            Your security and trust are our top priorities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {indicators.map((indicator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 flex-shrink-0">
                  {indicator.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {indicator.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {indicator.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partnership Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-center text-lg font-semibold text-gray-700 mb-8">
            Our Trusted Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="flex items-center justify-center">
              <div className="bg-gray-100 px-6 py-4 rounded-lg">
                <span className="text-gray-600 font-semibold">M-PESA</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-gray-100 px-6 py-4 rounded-lg">
                <span className="text-gray-600 font-semibold">CRB Kenya</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-gray-100 px-6 py-4 rounded-lg">
                <span className="text-gray-600 font-semibold">Paystack</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-gray-100 px-6 py-4 rounded-lg">
                <span className="text-gray-600 font-semibold">SSL Secured</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lock className="w-6 h-6" />
            <h3 className="text-2xl font-bold">Your Data is Protected</h3>
          </div>
          <p className="text-green-100 max-w-2xl mx-auto">
            We use industry-standard encryption and never share your personal information 
            without your explicit consent. All data transmission is secured with 256-bit SSL encryption.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-300" />
              <span>PCI DSS Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-300" />
              <span>ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-300" />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustIndicators;
