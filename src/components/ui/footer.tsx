import { Link } from "react-router-dom";
import { Mail, MapPin, Shield, FileText, HelpCircle, MessageSquare, Globe, Info } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kenya Applications Portal</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted partner in career opportunities across Kenya.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>P.O. Box 34567-00100, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>emmanuelkiprotich.dr@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                <a href="https://applicationskenya.site/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  applicationskenya.site
                </a>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Shield className="h-3 w-3" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms-of-service" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <FileText className="h-3 w-3" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/refund-policy" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <HelpCircle className="h-3 w-3" />
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about-us" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Info className="h-3 w-3" />
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact-us" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="h-3 w-3" />
                  Contact Us
                </Link>
              </li>
              <li>
                <a 
                  href="#job-listings" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Browse Jobs
                </a>
              </li>
            </ul>
          </div>

          {/* Important Notice */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Important Notice</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-800">
                <strong>Beware of Scams:</strong> Naivas recruitment is done only through this official website. 
                We never ask for payments through agents or unofficial channels.
              </p>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              <p>All application fees are processed securely through M-Pesa STK push only.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} Kenya Applications Portal. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <span>Registered in Kenya</span>
              <span>•</span>
              <span>P.O. Box 34567-00100</span>
            </div>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            This website uses cookies to improve your experience. By continuing to browse, you agree to our use of cookies as outlined in our Privacy Policy.
            For any concerns or complaints, please contact our support team at emmanuelkiprotich.dr@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}
