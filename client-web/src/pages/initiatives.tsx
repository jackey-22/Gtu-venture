import PageShell from "./page-shell";
import { getAll } from "@/lib/contentStore";
import { motion } from "framer-motion";

export default function Initiatives() {
  const items = getAll<any>("initiatives");

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

  return (
  <PageShell title="Our Initiatives" subtitle="Programs and projects led by GTU Ventures, including IPR, Design Innovation Centre (DIC), and community outreach.">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((it: any, i: number) => (
          <motion.article variants={itemVariants} key={i} className="overflow-hidden rounded-2xl shadow-lg bg-card border border-transparent hover:shadow-2xl transform hover:-translate-y-1 transition">
            <div className="h-2 bg-accent/90" />
            <div className="p-6">
              <div className="font-semibold text-lg mb-2">{it.title}</div>
              <div className="text-muted-foreground mb-4">{it.body}</div>
              
              {it.outcomes && (
                <div className="mb-4">
                  <h4 className="font-medium text-sm text-foreground mb-1">Key Outcomes:</h4>
                  <p className="text-sm text-muted-foreground">{it.outcomes}</p>
                </div>
              )}
              
              {it.caseStudy && (
                <div>
                  <h4 className="font-medium text-sm text-foreground mb-1">Case Study:</h4>
                  <p className="text-sm text-muted-foreground italic">{it.caseStudy}</p>
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </PageShell>
  );
}
