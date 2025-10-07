import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import LogoWall from "@/components/startups/logo-wall";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, Calendar, MapPin } from "lucide-react";

// Mock startup data - in a real app this would come from an API
const startups = [
  {
    id: 1,
    name: "EduTech Innovations",
    description: "AI-powered personalized learning platform for K-12 students",
    industry: "EdTech",
    stage: "Growth",
    cohort: "2023",
    logo: "/startups/1.jpg",
    founders: ["Priya Sharma", "Rohit Patel"],
    website: "#",
    fundingRaised: "₹5cr",
    year: 2023,
  },
  {
    id: 2,
    name: "AgriTech Solutions", 
    description: "IoT-based crop monitoring and precision farming solutions",
    industry: "AgriTech",
    stage: "Scaling",
    cohort: "2022",
    logo: "/startups/3.png",
    founders: ["Amit Singh", "Kavya Joshi"],
    website: "#",
    fundingRaised: "₹3cr",
    year: 2022,
  },
  {
    id: 3,
    name: "HealthCare Analytics",
    description: "Data analytics platform for healthcare providers and hospitals",
    industry: "HealthTech",
    stage: "Early",
    cohort: "2024",
    logo: "/startups/7.png",
    founders: ["Dr. Meera Shah", "Arun Kumar"],
    website: "#",
    fundingRaised: "₹1.5cr",
    year: 2024,
  },
  {
    id: 4,
    name: "FinTech Pro",
    description: "Digital banking solutions for rural and semi-urban markets",
    industry: "FinTech",
    stage: "Growth",
    cohort: "2023",
    logo: "/startups/7.png",
    founders: ["Rajesh Modi", "Neha Gupta"],
    website: "#",
    fundingRaised: "₹8cr",
    year: 2023,
  },
  {
    id: 5,
    name: "CleanEnergy Systems",
    description: "Solar panel efficiency optimization using AI and IoT",
    industry: "CleanTech",
    stage: "Early",
    cohort: "2024",
    logo: "/startups/8.png",
    founders: ["Vikram Patel", "Sanjana Desai"],
    website: "#",
    fundingRaised: "₹2cr",
    year: 2024,
  },
  {
    id: 6,
    name: "LogiFlow",
    description: "Last-mile delivery optimization for e-commerce platforms",
    industry: "Logistics",
    stage: "Scaling",
    cohort: "2022",
    logo: "/startups/9.jpg",
    founders: ["Kiran Shah", "Mitul Jain"],
    website: "#",
    fundingRaised: "₹6cr",
    year: 2022,
  },
];

const industries = ["All", "EdTech", "AgriTech", "HealthTech", "FinTech", "CleanTech", "Logistics"];
const stages = ["All", "Early", "Growth", "Scaling"];

export default function Startups() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");

  const filteredStartups = startups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "All" || startup.industry === selectedIndustry;
    const matchesStage = selectedStage === "All" || startup.stage === selectedStage;
    
    return matchesSearch && matchesIndustry && matchesStage;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gtu-base to-gtu-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-hero font-extrabold text-foreground mb-6">
              Our Startups
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the innovative companies that have emerged from GTU Ventures, 
              transforming ideas into market-ready solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Logo wall inserted directly after hero (per request) */}
      <LogoWall />

      {/* Filters and Search */}
      <section className="py-12 bg-background border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="space-y-6">
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search startups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="search-input"
              />
            </div>

            {/* Filter buttons */}
            <div className="space-y-4">
              {/* Sector filters */}
              <div className="text-center">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  Sector
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {industries.map((industry) => (
                    <Button
                      key={industry}
                      variant={selectedIndustry === industry ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedIndustry(industry)}
                      data-testid={`filter-industry-${industry.toLowerCase()}`}
                    >
                      {industry}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Stage filters */}
              <div className="text-center">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  Stage
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {stages.map((stage) => (
                    <Button
                      key={stage}
                      variant={selectedStage === stage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStage(stage)}
                      data-testid={`filter-stage-${stage.toLowerCase()}`}
                    >
                      {stage}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results count */}
      <section className="py-6 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <p className="text-muted-foreground text-center" data-testid="results-count">
            Showing {filteredStartups.length} of {startups.length} startups
          </p>
        </div>
      </section>

      {/* Startup Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStartups.map((startup, index) => (
              <motion.div
                key={startup.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`startup-card-${startup.id}`}
              >
                <Card className="h-full hover-lift cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={startup.logo}
                        alt={`${startup.name} logo`}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-foreground mb-1 truncate">
                          {startup.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                      {startup.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">{startup.industry}</Badge>
                      <Badge variant="outline">{startup.stage}</Badge>
                    </div>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Founders:</span>
                        <span className="text-muted-foreground">
                          {startup.founders.join(", ")}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      asChild
                      data-testid={`startup-visit-${startup.id}`}
                    >
                      <a href={startup.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredStartups.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
              data-testid="no-results"
            >
              <p className="text-muted-foreground text-lg">
                No startups found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedIndustry("All");
                  setSelectedStage("All");
                }}
                className="mt-4"
                data-testid="clear-filters"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display font-bold text-foreground mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Read about the journeys of our most successful startups
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <img
                    src="/startups/1.jpg"
                    alt="EduTech Innovations"
                    className="w-16 h-16 rounded-lg object-cover mb-4"
                  />
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    EduTech Innovations
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    "GTU Ventures provided us with the perfect foundation to build our 
                    AI-powered learning platform. The mentorship and funding helped us 
                    scale from a prototype to serving 50,000+ students across India."
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <strong>Priya Sharma</strong>, Co-founder
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <img
                    src="/startups/3.png"
                    alt="AgriTech Solutions"
                    className="w-16 h-16 rounded-lg object-cover mb-4"
                  />
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    AgriTech Solutions
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    "The resources and network at GTU Ventures were instrumental in 
                    developing our IoT solutions for farmers. We've now helped over 
                    10,000 farmers increase their crop yields by 30%."
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <strong>Amit Singh</strong>, Founder
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
