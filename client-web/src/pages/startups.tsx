import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import LogoWall from "@/components/startups/logo-wall";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink } from "lucide-react";

const industries = ["All", "EdTech", "AgriTech", "HealthTech", "FinTech", "CleanTech", "Logistics"];
const stages = ["All", "Early", "Growth", "Scaling"];

export default function Startups() {
  const baseURL = import.meta.env.VITE_URL;
  const [startups, setStartups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        let apiBase = baseURL || "";
        if (!apiBase.endsWith("/")) apiBase += "/";
        const url = `${apiBase}admin/get-startups`;
        console.log("baseURL:", baseURL, "Final API URL:", url);
        const res = await fetch(url);
        if (!res.ok) {
          console.error("API response not OK:", res.status, res.statusText);
          throw new Error("Failed to fetch startups");
        }
        const data = await res.json();
        console.log("Fetched startups:", data);
        setStartups(data);
      } catch (err: any) {
        console.error("Error fetching startups:", err);
        setError(err.message || "Error fetching startups");
      } finally {
        setLoading(false);
      }
    };
    fetchStartups();
  }, [baseURL]);

  const filteredStartups = startups.filter((startup) => {
    const matchesSearch =
      (startup.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (startup.description?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "All" || startup.industry === selectedIndustry;
    const matchesStage = selectedStage === "All" || startup.stage === selectedStage;
    return matchesSearch && matchesIndustry && matchesStage;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-3 text-primary">Loading Startups...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

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
              Discover the innovative companies that have emerged from GTU
              Ventures, transforming ideas into market-ready solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Logo wall inserted directly after hero */}
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
                key={startup.id ?? index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`startup-card-${startup.id ?? index}`}
              >
                <Card className="h-full hover-lift cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      {startup.logo && typeof startup.logo === "string" ? (
                        <img
                          src={startup.logo}
                          alt={`${startup.name} logo`}
                          className="w-12 h-12 rounded-lg object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : null}
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
                          {Array.isArray(startup.founders)
                            ? startup.founders.join(", ")
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      asChild
                      data-testid={`startup-visit-${startup.id ?? index}`}
                    >
                      <a
                        href={startup.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
