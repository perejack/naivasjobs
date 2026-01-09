import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Award, 
  Heart, 
  TrendingUp, 
  MapPin, 
  Calendar,
  Shield,
  Handshake
} from "lucide-react";

export function AboutNaivas() {
  const benefits = [
    {
      icon: Shield,
      title: "Medical Coverage",
      description: "Comprehensive medical allowances for all employees"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Clear promotion paths and skill development programs"
    },
    {
      icon: Handshake,
      title: "Job Security",
      description: "Stable employment with Kenya's leading retail chain"
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible schedules and employee wellness programs"
    }
  ];

  const stats = [
    { number: "35+", label: "Years of Excellence", icon: Calendar },
    { number: "100+", label: "Store Locations", icon: MapPin },
    { number: "1000+", label: "Team Members", icon: Users },
    { number: "#1", label: "Retail Chain in Kenya", icon: Award }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-4">
            <Award className="h-4 w-4 mr-2" />
            Why Choose Naivas
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Kenya's Most{" "}
            <span className="text-gradient-secondary">Trusted Employer</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            For over three decades, Naivas has been committed to providing exceptional 
            career opportunities while building Kenya's retail excellence.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="card-elegant text-center interactive-scale">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="card-elegant group interactive-lift">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Story */}
        <div className="max-w-4xl mx-auto">
          <Card className="card-elegant">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold">
                  Building Careers, Serving Communities
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Since 1987, Naivas has grown from a single store to become Kenya's 
                  largest indigenous supermarket chain. We've built our success on the 
                  dedication of our team members who share our commitment to excellence, 
                  customer service, and community development.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Equal Opportunity Employer
                  </span>
                  <span className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Employee-Focused Culture
                  </span>
                  <span className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Secure & Stable Employment
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}