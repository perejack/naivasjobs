import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, AlertCircle, Star } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">SwiftLoan</h3>
            <p className="text-sm text-gray-400">
              Digital lending platform providing accessible financial solutions.
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm hover:text-green-500 transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-green-500 transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>Business Hours: Mon-Fri</li>
              <li>8:00 AM - 6:00 PM EAT</li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Important Notice
            </h4>
            <p className="text-xs text-gray-400">
              All loans subject to approval. Terms and conditions apply. Representative APR varies based on loan amount and term.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="text-sm text-gray-400">
              <p className="mb-2">
                <strong className="text-gray-300">Regulatory Compliance:</strong> Licensed financial services provider. 
                All operations comply with applicable financial regulations.
              </p>
              <p>
                <strong className="text-gray-300">Credit Reporting:</strong> We report to credit reference bureaus. 
                Responsible borrowing helps build your credit history.
              </p>
            </div>
            <div className="text-sm text-gray-400">
              <p className="mb-2">
                <strong className="text-gray-300">Representative Example:</strong> KES 50,000 over 12 months at 15% APR 
                = Total repayable: KES 54,250 (approx. KES 4,521/month).
              </p>
              <p className="text-xs">
                © 2024 SwiftLoan. All rights reserved. Actual rates and fees may vary.
              </p>
              <div className="mt-4">
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-green-500 transition-colors"
                >
                  <Star className="w-4 h-4" />
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
