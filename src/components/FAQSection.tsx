import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What are the eligibility requirements for a loan?",
      answer: "You must be a Kenyan citizen aged 18 or above, have a valid national ID, proof of income, and an active M-PESA account. Credit assessment will be conducted as part of the approval process."
    },
    {
      question: "How much can I borrow?",
      answer: "You can borrow from KES 5,000 to KES 100,000. The exact amount depends on your creditworthiness, income level, and repayment capacity as determined during our assessment."
    },
    {
      question: "What is the interest rate?",
      answer: "Our representative APR ranges from 10% to 35% depending on the loan amount, term, and your individual creditworthiness. The exact rate will be provided upon application approval."
    },
    {
      question: "How long does approval take?",
      answer: "Most applications are reviewed within 24-48 hours during business days. However, some applications may take longer if additional verification is required. You'll be notified of your application status via SMS and email."
    },
    {
      question: "How do I receive my loan?",
      answer: "Once approved, funds are sent directly to your registered M-PESA account within 1-3 business days. You'll receive an SMS notification when the transfer is complete."
    },
    {
      question: "What documents do I need to apply?",
      answer: "You'll need a valid Kenyan national ID, proof of income (payslip or bank statements), M-PESA statements, and potentially other documents based on your employment status."
    },
    {
      question: "Can I repay my loan early?",
      answer: "Yes! We encourage early repayment and there are no penalties for paying off your loan before the due date. This can also help improve your credit score."
    },
    {
      question: "What happens if I can't make a payment?",
      answer: "If you're experiencing financial difficulties, please contact our support team immediately. We may be able to arrange a payment plan. Late payments incur penalties and are reported to credit bureaus."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we use bank-level encryption and security protocols to protect your data. We comply with all data protection regulations and never share your information without consent."
    },
    {
      question: "Will applying affect my credit score?",
      answer: "We conduct a soft credit check during initial application which doesn't affect your score. A hard check is only done if you accept a loan offer. All loan activity is reported to credit bureaus."
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-xl text-gray-600">
            Everything you need to know about our loan services
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-gray-50 text-gray-700">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 bg-green-50 rounded-xl text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Our support team is here to help during business hours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Contact Support
            </button>
            <button className="px-6 py-3 bg-white text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
              View Terms & Conditions
            </button>
          </div>
        </motion.div>

        {/* Compliance Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> All loans are subject to approval based on our credit assessment criteria. 
            The information provided here is for general guidance only. Specific terms will be provided upon application. 
            Representative APR: 10%-35%. Borrowing costs money.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
