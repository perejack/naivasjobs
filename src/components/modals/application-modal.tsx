import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { CheckCircle, DollarSign, FileText, Phone, Mail, User, MapPin, GraduationCap, CreditCard, Copy, Shield, ArrowLeft, ArrowRight, Smartphone, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { PaymentSuccessModal } from "./payment-success-modal";
import { ApplicationProcessingModal } from './application-processing-modal';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    title: string;
    salary: number;
    medicalAllowance: number;
  } | null;
}

export function ApplicationModal({ isOpen, onClose, job }: ApplicationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    education: ""
  });
  const [paymentData, setPaymentData] = useState({
    phoneNumber: "",
    refundCode: "",
    checkoutRequestId: "",
    paymentStatus: "PENDING"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStatusInterval, setPaymentStatusInterval] = useState<NodeJS.Timeout | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);

  // Generate refund code
  const generateRefundCode = () => {
    const code = `REF${Date.now().toString().slice(-6)}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    setPaymentData(prev => ({ ...prev, refundCode: code }));
    return code;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      // Validate form data
      if (!formData.fullName || !formData.email || !formData.phone || !formData.location || !formData.education) {
        toast.error("Please fill in all required fields");
        return;
      }
      // Show processing modal instead of going directly to step 2
      console.log("Setting processing modal to true");
      setShowProcessingModal(true);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleProcessingComplete = async () => {
    setShowProcessingModal(false);
    const refCode = generateRefundCode();
    
    // Save application data to database
    try {
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          education: formData.education,
          jobTitle: job?.title || '',
          salary: job?.salary || 0,
          medicalAllowance: job?.medicalAllowance || 0,
          paymentReference: refCode
        })
      });
      
      const result = await response.json();
      if (result.success) {
        console.log('Application saved with ID:', result.data.applicationId);
      }
    } catch (error) {
      console.error('Failed to save application:', error);
      // Continue anyway - don't block user flow
    }
    
    setCurrentStep(2);
  };

  const handlePayment = async () => {
    if (!paymentData.phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }
    
    setIsProcessingPayment(true);
    
    try {
      // Call the real STK push API
      const response = await fetch('/api/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: paymentData.phoneNumber,
          description: 'Job Application Processing Fee'
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        const checkoutRequestId = result.data.checkoutRequestId || result.data.externalReference;
        setPaymentData(prev => ({ 
          ...prev, 
          checkoutRequestId,
          paymentStatus: "PENDING"
        }));
        
        toast.success("STK push sent! Please check your phone and enter your M-Pesa PIN.");
        
        // Start polling for payment status
        startPaymentStatusPolling(checkoutRequestId);
      } else {
        throw new Error(result.message || 'Failed to initiate payment');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Failed to initiate payment. Please try again.");
      setIsProcessingPayment(false);
    }
  };

  const startPaymentStatusPolling = (checkoutRequestId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/payment-status?reference=${checkoutRequestId}`);
        const result = await response.json();
        
        if (result.success && result.payment) {
          const status = result.payment.status;
          setPaymentData(prev => ({ ...prev, paymentStatus: status }));
          
          if (status === 'SUCCESS') {
            clearInterval(interval);
            setPaymentStatusInterval(null);
            setIsProcessingPayment(false);
            setShowSuccessModal(true);
            resetForm();
          } else if (status === 'FAILED') {
            clearInterval(interval);
            setPaymentStatusInterval(null);
            setIsProcessingPayment(false);
            // Payment failed - no ads
            toast.error("Payment failed. Please try again.");
          } else if (status === 'CANCELLED') {
            clearInterval(interval);
            setPaymentStatusInterval(null);
            setIsProcessingPayment(false);
            // Payment cancelled - no ads
            toast.error("Payment was cancelled. Please try again.");
          }
        }
      } catch (error) {
        console.error('Status check error:', error);
      }
    }, 3000); // Check every 3 seconds
    
    setPaymentStatusInterval(interval);
    
    // Stop polling after 2 minutes
    setTimeout(() => {
      if (interval) {
        clearInterval(interval);
        setPaymentStatusInterval(null);
        if (paymentData.paymentStatus === 'PENDING') {
          setIsProcessingPayment(false);
          // Payment timeout - no ads
          toast.error("Payment timeout. Please try again.");
        }
      }
    }, 120000);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      location: "",
      education: ""
    });
    setPaymentData({
      phoneNumber: "",
      refundCode: "",
      checkoutRequestId: "",
      paymentStatus: "PENDING"
    });
    
    // Clear any existing payment status polling
    if (paymentStatusInterval) {
      clearInterval(paymentStatusInterval);
      setPaymentStatusInterval(null);
    }
  };

  const copyRefundCode = () => {
    navigator.clipboard.writeText(paymentData.refundCode);
    toast.success("Refund code copied to clipboard!");
  };

  const handleModalClose = () => {
    onClose();
  };

  if (!job) return null;

  const totalPackage = job.salary + job.medicalAllowance;

  return (
    <>
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Apply for {job.title}
          </DialogTitle>
          
          {/* Job Summary */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge className="bg-primary/10 text-primary">
                Full-time Position
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Multiple Locations Available</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <div>
                  <div className="font-semibold">KSh {job.salary.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Base Salary</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-secondary" />
                <div>
                  <div className="font-semibold">KSh {job.medicalAllowance.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Medical Allowance</div>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > 1 ? <CheckCircle className="w-4 h-4" /> : '1'}
              </div>
              <div className={`h-0.5 w-12 ${currentStep >= 2 ? 'bg-green-500' : 'bg-gray-200'}`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > 2 ? <CheckCircle className="w-4 h-4" /> : '2'}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep} of 2
            </div>
          </div>

          {/* Step 1: Application Form */}
          {currentStep === 1 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+254 700 000 000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Preferred Location *
                  </Label>
                  <Input
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Nairobi, Mombasa, Kisumu"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="education" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Level of Education *
                </Label>
                <Select
                  value={formData.education}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, education: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                    <SelectItem value="university">University</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Qualifications Reminder */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Key Requirements:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Must be Kenyan citizen, 18 years and above</li>
                  <li>• Reliability and trustworthiness</li>
                  <li>• Strong communication and customer service skills</li>
                  <li>• Punctuality and time management</li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          )}

          {/* Step 2: Payment Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Application Processing Fee</h3>
                <p className="text-muted-foreground">
                  A refundable application processing fee is required to complete your application
                </p>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">KSh 130</div>
                  <div className="text-sm text-muted-foreground">Refundable Processing Fee</div>
                </div>
                
                <div className="bg-white/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Your Refund Code:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                      {paymentData.refundCode}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyRefundCode}
                      className="shrink-0"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-yellow-800 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Important Instructions
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• <strong>Keep your refund code safe</strong> - You'll need it to process your refund</li>
                  <li>• <strong>Save your M-Pesa transaction message</strong> - Required for refund processing</li>
                  <li>• <strong>Applicants who complete this process will be highly considered</strong></li>
                  <li>• Refunds are processed within 7-14 business days after hiring decisions</li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Payment Processing */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Smartphone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Complete Payment</h3>
                <p className="text-muted-foreground">
                  Enter your phone number to receive an STK push for payment
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">KSh 130</div>
                  <div className="text-sm text-muted-foreground">Processing Fee</div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="paymentPhone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    M-Pesa Phone Number *
                  </Label>
                  <Input
                    id="paymentPhone"
                    type="tel"
                    required
                    value={paymentData.phoneNumber}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    placeholder="+254 700 000 000"
                    className="text-center text-lg"
                  />
                </div>

                {!isProcessingPayment && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-700 text-center">
                    You will receive an STK push notification on your phone to complete the payment
                  </p>
                </div>
              )}

              {isProcessingPayment && (
                <div className="space-y-3">
                  <div className={`border rounded-lg p-4 ${
                    paymentData.paymentStatus === 'SUCCESS' ? 'bg-green-50 border-green-200' :
                    paymentData.paymentStatus === 'FAILED' ? 'bg-red-50 border-red-200' :
                    'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      {paymentData.paymentStatus === 'SUCCESS' && (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium text-green-800">Payment Successful!</p>
                            <p className="text-sm text-green-600">Your application has been completed.</p>
                          </div>
                        </>
                      )}
                      {paymentData.paymentStatus === 'FAILED' && (
                        <>
                          <AlertCircle className="h-5 w-5 text-red-600" />
                          <div>
                            <p className="font-medium text-red-800">Payment Failed</p>
                            <p className="text-sm text-red-600">Please try again or contact support.</p>
                          </div>
                        </>
                      )}
                      {paymentData.paymentStatus === 'PENDING' && (
                        <>
                          <Clock className="h-5 w-5 text-blue-600 animate-spin" />
                          <div>
                            <p className="font-medium text-blue-800">Processing Payment...</p>
                            <p className="text-sm text-blue-600">Please check your phone and enter your M-Pesa PIN.</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Remember:</h4>
              <p className="text-sm text-green-700">
                Your refund code: <code className="bg-white px-2 py-1 rounded font-mono">{paymentData.refundCode}</code>
              </p>
            </div>


              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                  className="flex-1"
                  disabled={isProcessingPayment}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={isProcessingPayment}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  {isProcessingPayment ? (
                    <>Processing...</>
                  ) : (
                    <>Finish Application <CreditCard className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
    
    <PaymentSuccessModal 
      isOpen={showSuccessModal} 
      onClose={() => setShowSuccessModal(false)} 
    />
    
    <ApplicationProcessingModal
      isOpen={showProcessingModal}
      onComplete={handleProcessingComplete}
      applicantName={formData.fullName}
      jobTitle={job?.title || "Position"}
    />
  </>
  );
}