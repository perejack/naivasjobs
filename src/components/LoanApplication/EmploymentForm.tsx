import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaMoneyBillWave, FaBullseye, FaMobileAlt, FaChevronRight, FaChevronLeft, FaIdCard } from 'react-icons/fa';

interface EmploymentFormProps {
  onNext: () => void;
  onBack: () => void;
}

const EmploymentForm: React.FC<EmploymentFormProps> = ({ onNext, onBack }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
          Employment Details
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaBriefcase className="text-green-500" />
            </div>
            <select
              required
              className="pl-10 w-full px-4 py-3 bg-white bg-opacity-90 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">Select Employment Status</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self Employed</option>
              <option value="business">Business Owner</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaMoneyBillWave className="text-green-500" />
            </div>
            <select
              required
              className="pl-10 w-full px-4 py-3 bg-white bg-opacity-90 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">Select Monthly Income</option>
              <option value="0-50000">0 - 50,000</option>
              <option value="50001-100000">50,001 - 100,000</option>
              <option value="100001-200000">100,001 - 200,000</option>
              <option value="200001+">Above 200,000</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaBullseye className="text-green-500" />
            </div>
            <select
              required
              className="pl-10 w-full px-4 py-3 bg-white bg-opacity-90 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">Select Loan Purpose</option>
              <option value="business">Business</option>
              <option value="education">Education</option>
              <option value="medical">Medical</option>
              <option value="emergency">Emergency</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaIdCard className="text-green-500" />
            </div>
            <input
              type="text"
              required
              className="pl-10 w-full px-4 py-3 bg-white bg-opacity-90 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              placeholder="ID Number"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaMobileAlt className="text-green-500" />
            </div>
            <input
              type="tel"
              required
              className="pl-10 w-full px-4 py-3 bg-white bg-opacity-90 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              placeholder="Mobile Number"
            />
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
          >
            <FaChevronLeft className="mr-2" />
            Back
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 shadow-lg"
          >
            Continue to Guarantor
            <FaChevronRight className="ml-2" />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EmploymentForm;