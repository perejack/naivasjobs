import { useState } from "react";
import { JobCard } from "@/components/ui/job-card";
import { ApplicationModal } from "@/components/modals/application-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Import job images
import salesAttendantImg from "@/assets/jobs/sales-attendant.jpg";
import securityGuardImg from "@/assets/jobs/security-guard.jpg";
import receptionistImg from "@/assets/jobs/receptionist.jpg";
import accountantCashierImg from "@/assets/jobs/accountant-cashier.jpg";
import warehouseSupervisorImg from "@/assets/jobs/warehouse-supervisor.jpg";
import distributorMarketerImg from "@/assets/jobs/distributor-marketer.jpg";
import driverImg from "@/assets/jobs/driver.jpg";
import chefImg from "@/assets/jobs/chef.jpg";
import cleanerImg from "@/assets/jobs/cleaner.jpg";
import storeKeeperImg from "@/assets/jobs/store-keeper.jpg";
import loaderOffloaderImg from "@/assets/jobs/loader-offloader.jpg";

const jobData = [
  { title: "Sales Attendant", salary: 25000, medicalAllowance: 500, isPopular: true, image: salesAttendantImg },
  { title: "Security Guard", salary: 27000, medicalAllowance: 700, isPopular: true, image: securityGuardImg },
  { title: "Receptionist", salary: 34000, medicalAllowance: 3000, isPopular: true, image: receptionistImg },
  { title: "Accountant & Cashier", salary: 32000, medicalAllowance: 3000, image: accountantCashierImg },
  { title: "Warehouse Supervisor", salary: 31000, medicalAllowance: 2000, image: warehouseSupervisorImg },
  { title: "Distributor & Marketer", salary: 29000, medicalAllowance: 1500, image: distributorMarketerImg },
  { title: "Driver", salary: 27400, medicalAllowance: 2500, image: driverImg },
  { title: "Chef", salary: 23750, medicalAllowance: 1500, image: chefImg },
  { title: "Cleaner", salary: 22400, medicalAllowance: 500, image: cleanerImg },
  { title: "Store Keeper", salary: 22000, medicalAllowance: 500, image: storeKeeperImg },
  { title: "Loader & Off-loader", salary: 17000, medicalAllowance: 500, image: loaderOffloaderImg }
];

export function JobListings() {
  const [selectedJob, setSelectedJob] = useState<typeof jobData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [salaryFilter, setSalaryFilter] = useState<"all" | "under25k" | "25k-30k" | "above30k">("all");

  const handleApply = (job: typeof jobData[0]) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const filteredJobs = jobData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesSalary = true;
    if (salaryFilter === "under25k") matchesSalary = job.salary < 25000;
    else if (salaryFilter === "25k-30k") matchesSalary = job.salary >= 25000 && job.salary <= 30000;
    else if (salaryFilter === "above30k") matchesSalary = job.salary > 30000;
    
    return matchesSearch && matchesSalary;
  });

  return (
    <section id="job-listings" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            <Users className="h-4 w-4 mr-2" />
            Current Openings
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your{" "}
            <span className="text-gradient-primary">Dream Career</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Competitive salaries, comprehensive medical benefits, and growth opportunities 
            await you at Kenya's most trusted supermarket chain.
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={salaryFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSalaryFilter("all")}
              >
                All Salaries
              </Button>
              <Button
                variant={salaryFilter === "under25k" ? "default" : "outline"}
                size="sm"
                onClick={() => setSalaryFilter("under25k")}
              >
                Under 25K
              </Button>
              <Button
                variant={salaryFilter === "25k-30k" ? "default" : "outline"}
                size="sm"
                onClick={() => setSalaryFilter("25k-30k")}
              >
                25K-30K
              </Button>
              <Button
                variant={salaryFilter === "above30k" ? "default" : "outline"}
                size="sm"
                onClick={() => setSalaryFilter("above30k")}
              >
                Above 30K
              </Button>
            </div>
          </div>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredJobs.map((job, index) => (
            <JobCard
              key={job.title}
              title={job.title}
              salary={job.salary}
              medicalAllowance={job.medicalAllowance}
              isPopular={job.isPopular}
              image={job.image}
              onApply={() => handleApply(job)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Application Modal */}
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          job={selectedJob}
        />
      </div>
    </section>
  );
}