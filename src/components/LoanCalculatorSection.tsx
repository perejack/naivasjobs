import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info } from 'lucide-react';

const LoanCalculatorSection: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(12);
  const [interestRate] = useState(15); // Representative APR

  const calculateMonthlyPayment = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;
    
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return monthlyPayment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * loanTerm;
  const totalInterest = totalPayment - loanAmount;

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Loan Calculator
          </h2>
          <p className="text-xl text-gray-600">
            Calculate your estimated monthly payments
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Loan Details
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount (KES)
                </label>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-green-600"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>KES 5,000</span>
                  <span className="font-semibold text-green-600 text-lg">
                    KES {loanAmount.toLocaleString()}
                  </span>
                  <span>KES 100,000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Term (Months)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 6, 12, 24].map((term) => (
                    <button
                      key={term}
                      onClick={() => setLoanTerm(term)}
                      className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                        loanTerm === term
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {term} mo
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Interest Rate</span>
                </div>
                <p className="text-sm text-blue-700">
                  Representative APR: {interestRate}% (varies based on creditworthiness)
                </p>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-lg p-6 text-white"
          >
            <h3 className="text-xl font-semibold mb-6">
              Your Estimated Payments
            </h3>

            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <p className="text-green-100 text-sm mb-1">Monthly Payment</p>
                <p className="text-3xl font-bold">
                  KES {monthlyPayment.toFixed(2)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <p className="text-green-100 text-sm mb-1">Total Interest</p>
                  <p className="text-xl font-semibold">
                    KES {totalInterest.toFixed(2)}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <p className="text-green-100 text-sm mb-1">Total Repayment</p>
                  <p className="text-xl font-semibold">
                    KES {totalPayment.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/20">
                <h4 className="font-semibold mb-3">What's Included:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-300">✓</span>
                    No hidden charges - all fees disclosed upfront
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-300">✓</span>
                    Flexible repayment options available
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-300">✓</span>
                    No penalty for early repayment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-300">✓</span>
                    Insurance coverage included*
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-3 bg-white/10 rounded-lg">
              <p className="text-xs text-green-100">
                *This is an estimate only. Actual rates and payments will be determined upon application 
                approval based on creditworthiness and other factors. All loans subject to approval.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LoanCalculatorSection;
