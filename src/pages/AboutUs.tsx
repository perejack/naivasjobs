import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Shield, Award, Users, Globe, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
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
          <h1 className="text-3xl font-bold mb-6">About Us</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Kenya Applications Portal - Your trusted partner in career opportunities
          </p>

          <div className="space-y-8">
            {/* Company Overview */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Company Overview</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Kenya Applications Portal is a leading digital recruitment platform dedicated to connecting 
                qualified job seekers with reputable employers across Kenya. We specialize in streamlining 
                the application process for major retail chains and corporate organizations, ensuring a 
                fair and transparent hiring process.
              </p>
              <p className="text-muted-foreground">
                Founded with the mission to reduce unemployment and simplify job applications, we have 
                helped thousands of Kenyans secure meaningful employment opportunities. Our platform 
                provides a secure, efficient, and user-friendly interface for job applications.
              </p>
            </section>

            {/* Business Registration */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileCheck className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Business Registration & Compliance</h2>
              </div>
              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Business Name</p>
                    <p className="font-semibold">Kenya Applications Portal</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Registration Status</p>
                    <p className="font-semibold">Registered Business Entity</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Mailing Address</p>
                    <p className="font-semibold">P.O. Box 34567-00100, Nairobi, Kenya</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Contact Email</p>
                    <p className="font-semibold">emmanuelkiprotich.dr@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Website</p>
                    <p className="font-semibold">https://careeropportunitieskenya.space/</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Operating Since</p>
                    <p className="font-semibold">2024</p>
                  </div>
                </div>
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Compliance:</strong> We operate in full compliance with the Kenya Data Protection Act, 
                    2019 and adhere to all applicable labor laws and digital service regulations in Kenya.
                  </p>
                </div>
              </div>
            </section>

            {/* Our Values */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Our Values</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-2">Transparency</h3>
                  <p className="text-sm text-muted-foreground">
                    We believe in complete transparency in our operations, fees, and processes. 
                    No hidden charges, no surprises.
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-2">Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Your data security is our priority. We use industry-standard encryption 
                    and secure payment processing.
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-2">Fairness</h3>
                  <p className="text-sm text-muted-foreground">
                    We provide equal opportunities to all applicants, ensuring a fair and 
                    unbiased application process.
                  </p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-2">Efficiency</h3>
                  <p className="text-sm text-muted-foreground">
                    We streamline the application process, saving time for both applicants 
                    and employers.
                  </p>
                </div>
              </div>
            </section>

            {/* Why Choose Us */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Why Choose Us</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Official partnership with leading employers including Naivas Supermarket</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Secure M-Pesa payment integration for application fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Clear refund policy with guaranteed processing within 5-7 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>24-48 hour response time for all inquiries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Compliant with Kenya Data Protection Act, 2019</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Dedicated customer support team</span>
                </li>
              </ul>
            </section>

            {/* Contact Information */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Get In Touch</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Have questions about our services? We're here to help. Reach out to us through 
                any of the following channels:
              </p>
              <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Website: </span>
                  <a href="https://careeropportunitieskenya.space/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    https://careeropportunitieskenya.space/
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-muted-foreground">Email: </span>
                  <a href="mailto:emmanuelkiprotich.dr@gmail.com" className="text-primary hover:underline">
                    emmanuelkiprotich.dr@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-muted-foreground">Address: P.O. Box 34567-00100, Nairobi, Kenya</span>
                </div>
              </div>
            </section>

            {/* Anti-Scam Notice */}
            <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Beware of Scams</h3>
              <p className="text-sm text-yellow-700">
                Kenya Applications Portal will never ask for payment through unofficial channels, 
                WhatsApp, or personal bank accounts. All payments are processed securely through 
                our official website via M-Pesa STK push only. If someone claims to represent us 
                and asks for money through other means, please report immediately to{" "}
                <a href="mailto:emmanuelkiprotich.dr@gmail.com" className="underline">
                  emmanuelkiprotich.dr@gmail.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
