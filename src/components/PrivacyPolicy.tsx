import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          
          <p className="text-sm text-gray-500 mb-8">Last Updated: October 2024</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
              <p className="mb-2">We collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, date of birth, email address, phone number, national ID number</li>
                <li><strong>Financial Information:</strong> Employment status, monthly income, bank account details, M-PESA number</li>
                <li><strong>Credit Information:</strong> Credit history, existing loans, repayment history</li>
                <li><strong>Technical Information:</strong> IP address, device information, browser type, usage data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <p className="mb-2">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and evaluate loan applications</li>
                <li>Verify your identity and prevent fraud</li>
                <li>Assess creditworthiness and determine loan eligibility</li>
                <li>Disburse approved loan funds</li>
                <li>Communicate with you about your loan and account</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Improve our services and user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Information Sharing</h2>
              <p className="mb-2">We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Credit Reference Bureaus:</strong> To assess creditworthiness and report loan performance</li>
                <li><strong>Payment Processors:</strong> To facilitate loan disbursement and repayment (e.g., Paystack, M-PESA)</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                <li><strong>Service Providers:</strong> Third-party vendors who assist in our operations (under strict confidentiality agreements)</li>
              </ul>
              <p className="mt-2">We do not sell your personal information to third parties for marketing purposes.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your information, including encryption, 
                secure servers, and access controls. However, no method of transmission over the internet is 100% secure, 
                and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services, comply with legal 
                obligations, resolve disputes, and enforce our agreements. Loan records are typically retained for 7 years 
                after loan closure as required by financial regulations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights</h2>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (subject to legal retention requirements)</li>
                <li>Withdraw consent for certain data processing activities</li>
                <li>Lodge a complaint with the relevant data protection authority</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to improve your experience, analyze usage patterns, and provide 
                personalized content. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Contact Us</h2>
              <p>
                For privacy-related questions or to exercise your rights, please contact our Data Protection Officer at 
                the contact information provided on our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by 
                posting the new policy on this page with an updated "Last Updated" date.
              </p>
            </section>

            <div className="bg-gray-100 rounded-lg p-6 mt-8">
              <p className="text-sm text-gray-600">
                By using our services, you consent to the collection and use of your information as described in this 
                Privacy Policy. If you do not agree with this policy, please do not use our services.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
