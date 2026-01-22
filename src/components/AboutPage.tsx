import React from 'react';
import { motion } from 'framer-motion';
import { Building, Users, Target, Award, Shield, Clock } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About SwiftLoan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted digital lending partner, providing accessible financial solutions 
            to help you achieve your goals.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600">
              To democratize access to credit by providing fast, transparent, and affordable 
              loan services through innovative digital technology, helping individuals and 
              businesses thrive in the modern economy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-600">
              To be the leading digital lending platform in East Africa, recognized for our 
              commitment to financial inclusion, customer satisfaction, and responsible 
              lending practices.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Trust & Security',
                description: 'We protect your data with bank-level security and maintain complete transparency in all our operations.'
              },
              {
                icon: Clock,
                title: 'Speed & Efficiency',
                description: 'We leverage technology to provide fast loan processing while maintaining thorough verification standards.'
              },
              {
                icon: Users,
                title: 'Customer First',
                description: 'Your success is our priority. We offer flexible terms and dedicated support throughout your loan journey.'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '10,000+', label: 'Loans Disbursed' },
              { number: 'KES 500M+', label: 'Total Disbursed' },
              { number: '95%', label: 'Approval Rate' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Compliance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Building className="w-8 h-8 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Regulatory Compliance</h2>
          </div>
          <p className="text-gray-600 mb-4">
            SwiftLoan operates in full compliance with all applicable financial regulations. 
            We are committed to responsible lending practices and maintain strict adherence 
            to data protection laws.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> All loans are subject to approval based on our credit 
              assessment criteria. Representative APR ranges from 10% to 35%. Please review our 
              Terms of Service for complete details.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
