import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertCircle } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          </div>
          
          <p className="text-sm text-gray-500 mb-8">Last Updated: October 2024</p>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Loan Eligibility</h2>
              <p className="mb-2">
                Loan approval is subject to our credit assessment and eligibility criteria. Meeting minimum requirements 
                does not guarantee loan approval. We reserve the right to approve or decline any loan application at our discretion.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                <div className="flex">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Important Notice</p>
                    <p className="text-sm text-yellow-700">
                      All loan applications are subject to verification and approval. We consider multiple factors including 
                      but not limited to credit history, income verification, and debt-to-income ratio.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Interest Rates and Fees</h2>
              <p className="mb-2">
                <strong>Representative APR:</strong> Varies from 10% to 35% depending on loan amount, term, and individual creditworthiness.
              </p>
              <p className="mb-2">
                <strong>Example:</strong> For a loan of KES 50,000 over 12 months at 15% APR, the total amount repayable 
                would be approximately KES 54,250, with monthly payments of approximately KES 4,521.
              </p>
              <p className="mb-2">
                Additional fees may apply including:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Processing fee: Up to 3% of loan amount</li>
                <li>Late payment fee: 5% of missed payment amount</li>
                <li>Early repayment: No penalty</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Disbursement Timeline</h2>
              <p>
                Upon loan approval, funds are typically disbursed within 1-3 business days. Disbursement time may vary 
                based on bank processing times, M-PESA availability, and verification requirements. Same-day disbursement 
                is not guaranteed.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Repayment Terms</h2>
              <p className="mb-2">
                Loans must be repaid according to the agreed schedule. Failure to make timely payments may result in:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Late payment fees</li>
                <li>Negative impact on credit score</li>
                <li>Collection activities</li>
                <li>Legal action</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Credit Reporting</h2>
              <p>
                We may report your loan activity to credit reference bureaus (CRBs). This includes payment history, 
                defaults, and outstanding balances. This information may affect your ability to obtain credit in the future.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Responsible Borrowing</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-blue-800">
                  <strong>Borrowing Responsibly:</strong> Only borrow what you can afford to repay. Consider your monthly 
                  income, expenses, and existing financial obligations before applying for a loan. If you are experiencing 
                  financial difficulties, please contact our support team to discuss repayment options.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data Protection</h2>
              <p>
                Your personal and financial information is protected in accordance with our Privacy Policy and applicable 
                data protection laws. We do not share your information with third parties except as required for loan 
                processing and as permitted by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Customer Support</h2>
              <p>
                For questions or concerns regarding your loan, please contact our customer support team during business 
                hours (Monday-Friday, 8:00 AM - 6:00 PM EAT).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be posted on this page with an 
                updated "Last Updated" date. Continued use of our services after changes constitutes acceptance of 
                the modified terms.
              </p>
            </section>

            <div className="bg-gray-100 rounded-lg p-6 mt-8">
              <p className="text-sm text-gray-600">
                <strong>Disclaimer:</strong> This is a financial services product. Borrowing money costs money. 
                Ensure you understand all terms and conditions before accepting a loan offer. If you have questions, 
                please contact us before proceeding with your application.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
