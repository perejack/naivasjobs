import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface JobCardProps {
  title: string;
  salary: number;
  medicalAllowance: number;
  department?: string;
  isPopular?: boolean;
  image?: string;
  onApply: () => void;
}

export function JobCard({ 
  title, 
  salary, 
  medicalAllowance, 
  department = "Retail Operations",
  isPopular = false,
  image,
  onApply 
}: JobCardProps) {
  const totalPackage = salary + medicalAllowance;

  return (
    <Card className={cn(
      "card-elegant interactive-lift transition-smooth group relative overflow-hidden",
      isPopular && "ring-2 ring-primary"
    )}>
      {isPopular && (
        <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg z-10">
          Popular
        </div>
      )}
      
      {/* Job Image */}
      {image && (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={`${title} position at Naivas`}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>
      )}
      
      <CardHeader className={cn("pb-3", image ? "pt-4" : "")}>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span>Naivas Supermarket</span>
            </div>
          </div>
          <Badge variant="secondary" className="bg-secondary/20 text-secondary">
            {department}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="font-semibold">Base Salary</span>
            </div>
            <span className="text-lg font-bold text-primary">
              KSh {salary.toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-secondary" />
              <span className="text-sm text-muted-foreground">Medical Allowance</span>
            </div>
            <span className="text-sm font-medium text-secondary">
              +KSh {medicalAllowance.toLocaleString()}
            </span>
          </div>
          
          <div className="border-t pt-2 mt-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total Package</span>
              <span className="text-xl font-bold text-gradient-primary">
                KSh {totalPackage.toLocaleString()}/month
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Full-time • Immediate Start</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          onClick={onApply}
          className="w-full glow-effect transition-bounce group-hover:scale-105"
          size="lg"
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}