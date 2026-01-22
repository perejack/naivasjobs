import React from 'react';
import { Wallet } from 'lucide-react';

interface MpesaWithdrawButtonProps {
  className?: string;
}

const MpesaWithdrawButton: React.FC<MpesaWithdrawButtonProps> = ({ className = '' }) => {
  const handleButtonClick = () => {
    window.open('https://payheroloanappmkopostk.vercel.app/', '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`inline-flex items-center gap-2 bg-white text-green-600 font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all ${className}`}
    >
      <Wallet className="w-5 h-5" />
      <span>Withdraw to M-PESA</span>
    </button>
  );
};

export default MpesaWithdrawButton;
