import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">Effective Date: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using this website, you accept and agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Use of Service</h2>
              <p className="text-muted-foreground mb-3">
                Our service allows you to apply for employment opportunities at Naivas Supermarket. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update any information to keep it accurate</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Use the service only for lawful purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Application Process</h2>
              <p className="text-muted-foreground mb-3">
                When applying for positions:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>All information provided must be truthful and accurate</li>
                <li>False information may result in disqualification</li>
                <li>Application does not guarantee employment</li>
                <li>We reserve the right to verify all information provided</li>
                <li>Selection is based on merit and company requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Application Fees</h2>
              <p className="text-muted-foreground mb-3">
                Regarding application processing fees:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>A processing fee may be required to complete your application</li>
                <li>Fees are clearly stated before payment is required</li>
                <li>Refund policies are outlined in our separate Refund Policy</li>
                <li>Payment processing is handled through secure third-party services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content on this website, including text, graphics, logos, and images, is the property of 
                Naivas Limited and is protected by intellectual property laws. You may not reproduce, distribute, 
                or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Privacy</h2>
              <p className="text-muted-foreground">
                Your use of our service is also governed by our Privacy Policy. Please review our Privacy Policy 
                to understand our practices regarding your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Disclaimers</h2>
              <p className="text-muted-foreground mb-3">
                The service is provided "as is" without warranties of any kind. We disclaim all warranties, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Merchantability and fitness for a particular purpose</li>
                <li>Accuracy, reliability, or completeness of content</li>
                <li>Uninterrupted or error-free service</li>
                <li>Security of transmitted information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                To the maximum extent permitted by law, Naivas Limited shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages resulting from your use or inability 
                to use the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify and hold harmless Naivas Limited, its affiliates, and their respective 
                officers, directors, employees, and agents from any claims, damages, or expenses arising from 
                your violation of these terms or your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Termination</h2>
              <p className="text-muted-foreground">
                We reserve the right to terminate or suspend your access to the service immediately, without 
                prior notice, for any reason, including breach of these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of Kenya, without 
                regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">12. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Changes will be effective immediately 
                upon posting. Your continued use of the service constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">13. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-3 text-muted-foreground">
                <p>Email: careers@naivas.co.ke</p>
                <p>Phone: +254 709 700 000</p>
                <p>Address: Naivas Limited, Nairobi, Kenya</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
