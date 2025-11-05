import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchGet } from "@/utils/fetch.utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function Initiatives() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInitiative, setSelectedInitiative] = useState<any | null>(null);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const data = await fetchGet({ pathName: 'user/get-initiatives' });
        const initiatives = data?.data || [];
        setItems(initiatives);
      } catch (error) {
        console.error('Error fetching initiatives:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchInitiatives();
  }, []);

  const demo = [
    { 
      title: "Design Innovation Centre (DIC)", 
      body: "District Innovation Cell support programs for rural innovation and entrepreneurship development.",
      outcomes: "Supported 500+ rural entrepreneurs, launched 50+ innovative products",
      caseStudy: "DIC helped develop a solar-powered irrigation system that increased farmer productivity by 40%"
    },
    { 
      title: "IPR Support Program", 
      body: "Comprehensive intellectual property rights education, filing assistance, and protection services.",
      outcomes: "Filed 200+ patents, conducted 150+ IPR workshops, protected 50+ innovations",
      caseStudy: "A student startup secured patent protection for their AI-based healthcare device"
    },
    { 
      title: "Entrepreneurship Awareness Campaigns", 
      body: "School and college outreach programs to inspire the next generation of entrepreneurs.",
      outcomes: "Reached 10,000+ students, organized 25+ entrepreneurship bootcamps",
      caseStudy: "School program inspired 200 students to start their own ventures"
    },
    { 
      title: "Women Entrepreneurship Initiative", 
      body: "Specialized programs supporting women-led startups and female entrepreneurs.",
      outcomes: "Supported 150+ women entrepreneurs, 70% success rate in business establishment",
      caseStudy: "Women-led tech startup raised $500K in seed funding after program completion"
    },
    { 
      title: "Industry-Academia Collaboration", 
      body: "Partnerships between GTU and industry leaders for research and innovation projects.",
      outcomes: "25+ joint research projects, 15+ technology transfers, 100+ student internships",
      caseStudy: "Collaboration led to development of industry-grade automation software"
    },
    { 
      title: "Startup Incubation Ecosystem", 
      body: "Comprehensive support system for early-stage startups from ideation to market launch.",
      outcomes: "Incubated 300+ startups, created 2000+ jobs, raised $5M+ in funding",
      caseStudy: "Incubated startup scaled to $2M revenue within 2 years of graduation"
    },
  ];

  const list = items.length ? items : demo;

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const itemVariants = { hidden: { y: 8, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.45 } } };

  if (loading) {
    return (
      <div className="min-h-screen pt-7">
        <section className="pt-20 pb-5">
          <div className="max-w-7xl px-6 lg:px-16 text-start">
            <div className="mx-auto flex flex-col items-start gap-4">
              <div className="h-10 w-64 bg-white/40 rounded animate-pulse"></div>
              <div className="h-4 w-96 bg-white/30 rounded animate-pulse"></div>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-6 border rounded-xl animate-pulse">
                  <div className="h-2 bg-gray-300 rounded mb-4"></div>
                  <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-7">
      <section className="pt-20 pb-5">
        <div className="max-w-7xl px-6 lg:px-16 text-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-start"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-2">
              Our Initiatives
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
              Programs and projects led by GTU Ventures, including IPR, Design Innovation Centre (DIC), and community outreach.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((it: any, i: number) => (
              <motion.article variants={itemVariants} key={i} className="overflow-hidden rounded-2xl shadow-lg bg-card border border-transparent hover:shadow-2xl transform hover:-translate-y-1 transition cursor-pointer" onClick={() => setSelectedInitiative(it)}>
                <div className="h-2 bg-accent/90" />
                <div className="p-6">
                  <div className="font-semibold text-lg mb-2 line-clamp-2">{it.title}</div>
                  <div className="text-muted-foreground mb-4 line-clamp-2">{it.body}</div>
                  
                  {it.outcomes && (
                    <div className="mb-4">
                      <h4 className="font-medium text-sm text-foreground mb-1">Key Outcomes:</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">{it.outcomes}</p>
                    </div>
                  )}
                  
                  {it.caseStudy && (
                    <div>
                      <h4 className="font-medium text-sm text-foreground mb-1">Case Study:</h4>
                      <p className="text-sm text-muted-foreground italic line-clamp-2">{it.caseStudy}</p>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>

      {/* Initiative Detail Modal */}
      <Dialog open={!!selectedInitiative} onOpenChange={() => setSelectedInitiative(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedInitiative && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-foreground mb-2">
                  {selectedInitiative.title}
                </DialogTitle>
                {selectedInitiative.body && (
                  <DialogDescription className="text-base">
                    {selectedInitiative.body}
                  </DialogDescription>
                )}
              </DialogHeader>

              <div className="space-y-4">
                {selectedInitiative.outcomes && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Key Outcomes</h4>
                    <p className="text-muted-foreground leading-relaxed">{selectedInitiative.outcomes}</p>
                  </div>
                )}

                {selectedInitiative.caseStudy && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Case Study</h4>
                    <p className="text-muted-foreground leading-relaxed italic">{selectedInitiative.caseStudy}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
        </div>
      </section>
    </div>
  );
}
