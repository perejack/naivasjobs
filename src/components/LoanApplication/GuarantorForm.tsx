import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaPhone, FaUserFriends, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

interface GuarantorFormProps {
  onNext: () => void;
  onBack: () => void;
}

interface GuarantorData {
  fullName: string;
  mobileNumber: string;
  relationship: string;
}

const GuarantorForm: React.FC<GuarantorFormProps> = ({ onNext, onBack }) => {
  const [activeGuarantor, setActiveGuarantor] = useState(1);
  const [guarantor1, setGuarantor1] = useState<GuarantorData>({
    fullName: '',
    mobileNumber: '',
    relationship: ''
  });
  const [guarantor2, setGuarantor2] = useState<GuarantorData>({
    fullName: '',
    mobileNumber: '',
    relationship: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeGuarantor === 1) {
      setActiveGuarantor(2);
    } else {
      onNext();
    }
  };

  const updateGuarantorData = (guarantorNumber: number, field: keyof GuarantorData, value: string) => {
    if (guarantorNumber === 1) {
      setGuarantor1(prev => ({ ...prev, [field]: value }));
    } else {
      setGuarantor2(prev => ({ ...prev, [field]: value }));
    }
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
          Guarantor {activeGuarantor} Information
        </h2>
        <div className="flex justify-center gap-4 mt-4">
          <div 
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeGuarantor === 1 ? 'bg-green-500 scale-125' : 'bg-gray-300'
            }`}
          />
          <div 
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeGuarantor === 2 ? 'bg-green-500 scale-125' : 'bg-gray-300'
            }`}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-green-500" />
            </div>
            <input
              type="text"
              required
              value={activeGuarantor === 1 ? guarantor1.fullName : guarantor2.fullName}
              onChange={(e) => updateGuarantorData(activeGuarantor, 'fullName', e.target.value)}
              className="pl-10 w-full px-4 py-3 bg-white bg-opacity-90 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              placeholder="Full Name"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaPhone className="text-green-500" />
            </div>
            <input
              type="tel"
              required
              value={activeGuarantor === 1 ? guarantor1.mobileNumber : guarantor2.mobileNumber}
              onChange={(e) => updateGuarantorData(activeGuarantor, 'mobileNumber', e.target.value)}
              className="pl-10 w-full px-4 py-3 bg-white bg-opacity-90 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              placeholder="Mobile Number"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUserFriends className="text-green-500" />
            </div>
            <select
              required
              value={activeGuarantor === 1 ? guarantor1.relationship : guarantor2.relationship}
              onChange={(e) => updateGuarantorData(activeGuarantor, 'relationship', e.target.value)}
              className="pl-10 w-full px-4 py-3 bg-white bg-opacity-90 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">Select Relationship</option>
              <option value="family">Family Member</option>
              <option value="friend">Friend</option>
              <option value="colleague">Colleague</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={activeGuarantor === 1 ? onBack : () => setActiveGuarantor(1)}
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
          >
            <FaChevronLeft className="mr-2" />
            {activeGuarantor === 1 ? 'Back' : 'Previous Guarantor'}
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 shadow-lg"
          >
            {activeGuarantor === 1 ? 'Next Guarantor' : 'Continue to Loan Amount'}
            <FaChevronRight className="ml-2" />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default GuarantorForm;
