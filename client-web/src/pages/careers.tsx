import PageShell from "./page-shell";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Briefcase, Users, GraduationCap, Heart, DollarSign, Code, Filter } from "lucide-react";
import { fetchGet } from "@/utils/fetch.utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Careers() {
  const [openings, setOpenings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOpening, setSelectedOpening] = useState<any | null>(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const data = await fetchGet({ pathName: 'user/get-careers' });
        const careers = data?.data || [];
        // Map backend fields to UI structure
        const mappedCareers = careers.map((c: any) => ({
          title: c.title,
          body: c.body || `${c.type}, ${c.location || ''}`,
          type: c.type,
          category: c.category || "General",
          icon: Briefcase,
          startup: c.startup || "GTU Ventures",
          details: c.details || c.body || "",
          requirements: c.requirements || [],
          benefits: c.benefits || [],
          location: c.location || "",
        }));
        setOpenings(mappedCareers);
      } catch (error) {
        console.error('Error fetching careers:', error);
        setOpenings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  const demo = [
    {
      title: "Program Coordinator",
      body: "Full-time, Ahmedabad",
      type: "Full-time",
      category: "Operations",
      icon: Briefcase,
      startup: "GTU Ventures",
      details: "Lead program coordination for startup incubation initiatives, manage cohort activities, and support entrepreneurs through their journey.",
      requirements: ["Bachelor's degree", "2+ years experience", "Project management skills"],
      benefits: ["Competitive salary", "Health insurance", "Professional development"],
      location: "Ahmedabad, Gujarat"
    },
    {
      title: "Intern - Community Engagement",
      body: "3 months internship",
      type: "Internship",
      category: "Marketing",
      icon: Users,
      startup: "EduTech Solutions",
      details: "Support community outreach programs, organize startup events, and engage with student entrepreneurs across Gujarat.",
      requirements: ["Currently pursuing degree", "Communication skills", "Social media experience"],
      benefits: ["Stipend", "Certificate", "Networking opportunities"],
      location: "Remote/Hybrid"
    },
    {
      title: "Technical Mentor (Part-time)",
      body: "Mentor startups on product development",
      type: "Part-time",
      category: "Tech",
      icon: Code,
      startup: "AgriTech Innovations",
      details: "Provide technical guidance to early-stage startups in product development, coding best practices, and technology stack selection.",
      requirements: ["5+ years experience", "Tech background", "Mentoring experience"],
      benefits: ["Flexible hours", "Equity options", "Professional network"],
      location: "Virtual/On-site"
    },
    {
      title: "Innovation Fellowship",
      body: "6-month fellowship for student innovators",
      type: "Fellowship",
      category: "Education",
      icon: GraduationCap,
      startup: "GTU Ventures",
      details: "Work on innovative projects, collaborate with startups, and develop entrepreneurial skills through hands-on experience.",
      requirements: ["Current student", "Innovation mindset", "Basic tech skills"],
      benefits: ["Full stipend", "Mentorship", "Project funding"],
      location: "GTU Campus"
    },
    {
      title: "Healthcare Startup Advisor",
      body: "Part-time advisory role for health tech startups",
      type: "Part-time",
      category: "Healthcare",
      icon: Heart,
      startup: "MediCare Solutions",
      details: "Advise healthcare startups on regulatory compliance, market strategy, and scaling healthcare technology solutions.",
      requirements: ["Healthcare background", "Business experience", "Regulatory knowledge"],
      benefits: ["Flexible schedule", "Industry insights", "Potential equity"],
      location: "Ahmedabad"
    },
    {
      title: "Finance Analyst Intern",
      body: "Summer internship in startup finance",
      type: "Internship",
      category: "Finance",
      icon: DollarSign,
      startup: "FinTech Hub",
      details: "Analyze financial data, support fundraising efforts, and learn about startup financial management and investment strategies.",
      requirements: ["Finance/Commerce student", "Excel skills", "Analytical mindset"],
      benefits: ["Learning experience", "Stipend", "Industry exposure"],
      location: "Ahmedabad Office"
    },
  ];

  const displayOpenings = openings.length ? openings : demo;

  const categories = ["All", ...Array.from(new Set(displayOpenings.map(o => o.category || "General")))];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredOpenings = selectedCategory === "All" ? displayOpenings : displayOpenings.filter(o => o.category === selectedCategory);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const itemVariants = { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.45 } } };

  if (loading) {
    return (
      <PageShell
        title="Careers"
        subtitle="Join GTU Ventures — current openings, internships, and fellowship opportunities across various startup categories."
      >
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-3 text-primary">Loading Careers...</p>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Careers"
      subtitle="Join GTU Ventures — current openings, internships, and fellowship opportunities across various startup categories."
    >
      {/* Category Filter */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Filter by Category</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((category, i) => (
            <motion.button
              variants={itemVariants}
              key={i}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Job Openings Grid */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredOpenings.map((o: any, i: number) => {
          const Icon = o.icon || Briefcase;
          return (
            <motion.article
              variants={itemVariants}
              key={i}
              className="group overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-2xl hover:border-primary/20 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedOpening(o)}
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-4 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xl text-foreground mb-1 line-clamp-2">{o.title}</div>
                    <div className="text-primary font-medium mb-2 truncate">{o.startup}</div>
                    <div className="text-muted-foreground leading-relaxed mb-4 line-clamp-2">{o.details}</div>
                    <div className="flex items-center gap-3 flex-wrap mb-4">
                      <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium whitespace-nowrap">{o.type}</span>
                      <span className="text-xs px-3 py-1 bg-secondary/10 text-secondary rounded-full font-medium whitespace-nowrap">{o.category || "General"}</span>
                      <span className="text-xs px-3 py-1 bg-accent/10 text-accent-foreground rounded-full font-medium truncate max-w-[120px]">{o.location}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-2">Requirements</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {o.requirements.map((req: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-2">Benefits</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {o.benefits.map((benefit: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium w-full justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      {/* Call to Action */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-16 text-center">
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12">
          <h3 className="text-2xl font-bold mb-4">Don't see the perfect role?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our mission. Send us your resume and let's discuss opportunities.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
          >
            Send Resume
          </a>
        </div>
      </motion.div>

      {/* Career Detail Modal */}
      <Dialog open={!!selectedOpening} onOpenChange={() => setSelectedOpening(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedOpening && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-4 bg-primary/10 rounded-xl text-primary">
                    {(() => {
                      const Icon = selectedOpening.icon || Briefcase;
                      return <Icon className="w-8 h-8" />;
                    })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <DialogTitle className="text-2xl font-bold text-foreground mb-2">
                      {selectedOpening.title}
                    </DialogTitle>
                    <DialogDescription className="text-primary font-medium mb-2">
                      {selectedOpening.startup}
                    </DialogDescription>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge variant="secondary">{selectedOpening.type}</Badge>
                      <Badge variant="outline">{selectedOpening.category || "General"}</Badge>
                      <Badge variant="outline">{selectedOpening.location}</Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {selectedOpening.details && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Job Description</h4>
                    <p className="text-muted-foreground leading-relaxed">{selectedOpening.details}</p>
                  </div>
                )}

                {selectedOpening.requirements && selectedOpening.requirements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Requirements</h4>
                    <ul className="space-y-2 text-sm">
                      {selectedOpening.requirements.map((req: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedOpening.benefits && selectedOpening.benefits.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Benefits</h4>
                    <ul className="space-y-2 text-sm">
                      {selectedOpening.benefits.map((benefit: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4">
                  <Button asChild className="w-full">
                    <a href="#" onClick={(e) => e.stopPropagation()}>
                      Apply Now
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
