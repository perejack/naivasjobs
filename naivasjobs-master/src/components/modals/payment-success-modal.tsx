import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Phone } from 'lucide-react';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentSuccessModal({ isOpen, onClose }: PaymentSuccessModalProps) {
  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md mx-auto bg-white rounded-2xl shadow-2xl border-0 p-0 overflow-hidden">
        <div className="relative">
          {/* Success Header with Gradient */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
            <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Payment Successful!
            </h2>
            <p className="text-green-100 text-sm">
              Your application has been processed
            </p>
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Application Completed Successfully
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Thank you for your application! You will be contacted within 
                <span className="font-semibold text-green-600"> 48 hours </span>
                for the next step in the process.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium text-blue-800">Response Time</p>
                  <p className="text-xs text-blue-600">Within 48 hours</p>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium text-green-800">Contact Method</p>
                  <p className="text-xs text-green-600">Phone call or SMS</p>
                </div>
              </div>
            </div>


            {/* Action Button */}
            <Button 
              onClick={onClose}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Continue
            </Button>

            {/* Footer Note */}
            <p className="text-xs text-gray-500 mt-4">
              Keep your phone accessible for our call
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
