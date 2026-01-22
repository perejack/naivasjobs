import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, FileText, CheckCircle, Smartphone } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8" />,
      title: "1. Register Account",
      description: "Create your account in minutes with basic information",
      time: "2 minutes"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "2. Submit Application",
      description: "Complete the loan application with required documents",
      time: "5 minutes"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "3. Get Approval",
      description: "Receive decision within 24-48 hours*",
      time: "24-48 hours"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "4. Receive Funds",
      description: "Funds sent to your M-PESA upon approval",
      time: "Same day"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Get your loan in 4 simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div 
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {step.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 mb-2">
                {step.description}
              </p>
              <span className="text-sm text-green-600 font-medium">
                {step.time}
              </span>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 -right-4 text-green-300">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <p className="text-sm text-yellow-800">
            <strong>*Important:</strong> Approval times are estimates and subject to verification requirements. 
            All loans subject to credit assessment and eligibility criteria. Not all applications are approved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
