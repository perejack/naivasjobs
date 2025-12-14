import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RefundPolicy = () => {
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
          <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Application Processing Fee</h2>
              <p className="text-muted-foreground">
                The application processing fee of KSh 130 is required to process your job application. 
                This fee covers administrative costs associated with reviewing and processing applications.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Refund Eligibility</h2>
              <p className="text-muted-foreground mb-3">
                You may be eligible for a refund of the application processing fee under the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Technical errors that prevented successful application submission after payment</li>
                <li>Duplicate payments made in error</li>
                <li>System errors resulting in overcharging</li>
                <li>Cancellation of the recruitment process by the company</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Non-Refundable Circumstances</h2>
              <p className="text-muted-foreground mb-3">
                The application processing fee is non-refundable in the following cases:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Successful submission and processing of your application</li>
                <li>Unsuccessful application outcome</li>
                <li>Withdrawal of application after submission</li>
                <li>Failure to meet job requirements</li>
                <li>Providing false or misleading information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Refund Request Process</h2>
              <p className="text-muted-foreground mb-3">
                To request a refund:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>Contact our support team within 14 days of payment</li>
                <li>Provide your refund code and M-Pesa transaction ID</li>
                <li>Explain the reason for your refund request</li>
                <li>Include any supporting documentation</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Refund Processing Time</h2>
              <p className="text-muted-foreground">
                Once a refund request is approved:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Processing takes 7-14 business days</li>
                <li>Refunds are issued to the original M-Pesa number used for payment</li>
                <li>You will receive an SMS confirmation once the refund is processed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Important Information</h2>
              <p className="text-muted-foreground mb-3">
                Please note:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Keep your refund code and transaction details safe</li>
                <li>Refund requests without proper documentation may be denied</li>
                <li>We reserve the right to investigate suspicious refund requests</li>
                <li>Fraudulent refund claims may result in legal action</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Dispute Resolution</h2>
              <p className="text-muted-foreground">
                If you disagree with our refund decision, you may:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Request a review of your case within 7 days</li>
                <li>Provide additional documentation to support your claim</li>
                <li>Escalate the matter through our formal complaints procedure</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contact Support</h2>
              <p className="text-muted-foreground">
                For refund requests and inquiries:
              </p>
              <div className="mt-3 text-muted-foreground">
                <p>Email: refunds@naivas.co.ke</p>
                <p>Phone: +254 709 700 000</p>
                <p>Support Hours: Monday - Friday, 8:00 AM - 5:00 PM EAT</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Policy Changes</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify this refund policy at any time. Changes will be posted on this 
                page with an updated revision date. It is your responsibility to review this policy periodically.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
