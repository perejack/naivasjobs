import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PersonalDetails from './PersonalDetails';
import EmploymentForm from './EmploymentForm';
import GuarantorForm from './GuarantorForm';
import LoanOffer from './LoanOffer';
import { LoanProcessingModal } from './LoanProcessingModal';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface LoanApplicationProps {
}

type BusinessDocuments = {
  businessRegistrationCertificate?: File;
  idFront?: File;
  idBack?: File;
};

const LoanApplication: React.FC<LoanApplicationProps> = () => {
  const [step, setStep] = useState(1);
  const [showProcessing, setShowProcessing] = useState(false);
  const navigate = useNavigate();
  const [loanApplication, setLoanApplication] = useState({
    amount: 0,
    purpose: '',
    period: 1,
    savings_fee: 0
  });

  const handlePersonalDetailsComplete = () => {
    setStep(2);
  };

  const handleEmploymentComplete = () => {
    setStep(3);
  };

  const handleGuarantorComplete = () => {
    setStep(4);
  };

  const handleLoanOfferComplete = async (
    amount: number,
    purpose: string,
    period: number,
    fee: number,
    documents?: BusinessDocuments
  ) => {
    setLoanApplication({
      amount,
      purpose,
      period,
      savings_fee: fee
    });

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const bucketName = 'loan-documents';
      const sanitizeFileName = (name: string) => name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const createStoragePath = (prefix: string, file: File) =>
        `${user.id}/${crypto.randomUUID()}/${prefix}_${Date.now()}_${sanitizeFileName(file.name)}`;

      let businessRegistrationPath: string | null = null;
      let idFrontPath: string | null = null;
      let idBackPath: string | null = null;

      if (purpose === 'Business') {
        const certificate = documents?.businessRegistrationCertificate;
        const idFront = documents?.idFront;
        const idBack = documents?.idBack;

        if (!certificate || !idFront || !idBack) {
          toast.error('Business loans require all documents (certificate, ID front, ID back).');
          return;
        }

        const certificatePath = createStoragePath('business_registration', certificate);
        const idFrontStoragePath = createStoragePath('id_front', idFront);
        const idBackStoragePath = createStoragePath('id_back', idBack);

        const { error: certUploadError } = await supabase.storage
          .from(bucketName)
          .upload(certificatePath, certificate, { contentType: certificate.type || undefined, upsert: false });

        if (certUploadError) throw certUploadError;

        const { error: idFrontUploadError } = await supabase.storage
          .from(bucketName)
          .upload(idFrontStoragePath, idFront, { contentType: idFront.type || undefined, upsert: false });

        if (idFrontUploadError) throw idFrontUploadError;

        const { error: idBackUploadError } = await supabase.storage
          .from(bucketName)
          .upload(idBackStoragePath, idBack, { contentType: idBack.type || undefined, upsert: false });

        if (idBackUploadError) throw idBackUploadError;

        businessRegistrationPath = certificatePath;
        idFrontPath = idFrontStoragePath;
        idBackPath = idBackStoragePath;
      }

      // First, ensure user profile exists and get current balance
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('account_balance')
        .eq('auth_id', user.id)
        .single();

      if (profileError) throw profileError;

      // Save loan application
      const { error: loanError } = await supabase
        .from('loan_applications')
        .insert([
          {
            user_id: user.id,
            loan_amount: amount,
            loan_purpose: purpose,
            repayment_period: period,
            savings_fee: fee,
            business_registration_path: businessRegistrationPath,
            id_front_path: idFrontPath,
            id_back_path: idBackPath,
            status: 'approved', // Auto-approve for demo
            created_at: new Date().toISOString()
          }
        ]);

      if (loanError) throw loanError;

      // Update user's account balance
      const newBalance = (profile?.account_balance || 0) + amount;
      const { error: balanceError } = await supabase
        .from('user_profiles')
        .update({ account_balance: newBalance })
        .eq('auth_id', user.id);

      if (balanceError) throw balanceError;

      setShowProcessing(true);
    } catch (error) {
      console.error('Error saving loan application:', error);
      toast.error('Failed to process loan application. Please try again.');
    }
  };

  const handleProcessingComplete = () => {
    setShowProcessing(false);
    navigate('/loan-approved', { 
      state: { 
        amount: loanApplication.amount,
        period: loanApplication.period
      } 
    });
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="personal-details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <PersonalDetails onNext={handlePersonalDetailsComplete} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="employment-details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <EmploymentForm onNext={handleEmploymentComplete} onBack={handleBack} />
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="guarantor-details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <GuarantorForm onNext={handleGuarantorComplete} onBack={handleBack} />
          </motion.div>
        )}
        {step === 4 && (
          <motion.div
            key="loan-offer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <LoanOffer onNext={handleLoanOfferComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {showProcessing && (
        <LoanProcessingModal
          loanAmount={loanApplication.amount}
          repaymentPeriod={loanApplication.period}
          onComplete={handleProcessingComplete}
        />
      )}
    </div>
  );
};

export default LoanApplication;