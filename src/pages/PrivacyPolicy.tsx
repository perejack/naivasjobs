import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
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
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-3">
                We collect information you provide directly to us when applying for positions, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Full name and contact information (email address, phone number)</li>
                <li>Educational background and qualifications</li>
                <li>Preferred work location</li>
                <li>Payment information for application processing fees</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Process your job applications</li>
                <li>Contact you about employment opportunities</li>
                <li>Verify your eligibility for positions</li>
                <li>Process application fees and refunds where applicable</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Information Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                except as necessary to process your application, comply with legal requirements, or protect our rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Your Rights</h2>
              <p className="text-muted-foreground mb-3">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Cookies</h2>
              <p className="text-muted-foreground">
                Our website uses cookies to enhance user experience and analyze site traffic. You can control 
                cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Kenya Data Protection Act Compliance</h2>
              <p className="text-muted-foreground mb-3">
                We comply with the Kenya Data Protection Act, 2019. As a data controller and processor registered 
                in Kenya, we adhere to the following principles:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Lawfulness, Fairness, and Transparency:</strong> We process your data lawfully, fairly, and transparently.</li>
                <li><strong>Purpose Limitation:</strong> We collect data only for specified, explicit, and legitimate purposes.</li>
                <li><strong>Data Minimization:</strong> We only collect data that is adequate, relevant, and limited to what is necessary.</li>
                <li><strong>Accuracy:</strong> We ensure your personal data is accurate and kept up to date.</li>
                <li><strong>Storage Limitation:</strong> We keep your data only as long as necessary for the purposes stated.</li>
                <li><strong>Integrity and Confidentiality:</strong> We process your data securely with appropriate safeguards.</li>
                <li><strong>Accountability:</strong> We demonstrate compliance with data protection principles.</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                You have the right to lodge a complaint with the Office of the Data Protection Commissioner (ODPC) 
                if you believe your data protection rights have been violated.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect 
                personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy or wish to exercise your data protection rights, please contact us at:
              </p>
              <div className="mt-3 text-muted-foreground">
                <p><strong>Business Name:</strong> Kenya Applications Portal</p>
                <p><strong>Email:</strong> emmanuelkiprotich.dr@gmail.com</p>
                <p><strong>Address:</strong> P.O. Box 34567-00100, Nairobi, Kenya</p>
                <p><strong>Website:</strong> https://applicationskenya.site/</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
