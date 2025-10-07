import PageShell from "./page-shell";
import { getAll } from "@/lib/contentStore";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export default function News() {
  const items = getAll<any>("news");

  const demo = [
    // Announcements
    { id: 'n1', title: "GTU Ventures launches new cohort", body: "We welcome 40 startups to cohort 2025.", description: "GTU Ventures is excited to announce the launch of its latest cohort, welcoming 40 promising startups from across Gujarat. This new batch will benefit from intensive mentorship, access to funding, and a robust support ecosystem. The program will focus on product-market fit, go-to-market strategies, and investor readiness, ensuring each startup is equipped for sustainable growth.", date: "2025-07-01", category: 'Announcements', thumb: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=60' },
    { id: 'n2', title: "New funding round opens for student entrepreneurs", body: "₹2 crore seed fund now available for innovative student startups.", description: "A new funding round has been announced, making ₹2 crore available to support innovative student-led startups. The initiative aims to empower young entrepreneurs to turn their ideas into viable businesses, with a focus on technology, sustainability, and social impact.", date: "2025-06-25", category: 'Announcements', thumb: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=60' },
    { id: 'n3', title: "GTU Ventures achieves 85% startup survival rate", body: "Record-breaking success in supporting sustainable startup growth.", description: "GTU Ventures has achieved a record 85% survival rate among its incubated startups, reflecting the strength of its mentorship, funding, and community support. This milestone highlights the effectiveness of the GTU Ventures model in nurturing resilient, high-growth companies.", date: "2025-06-15", category: 'Announcements', thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=60' },

    // Media Coverage
    { id: 'n4', title: "GTU Ventures Featured in Economic Times", body: "Leading Gujarat's startup revolution with innovative incubation programs.", description: "Economic Times covers GTU Ventures' role in transforming Gujarat's startup landscape. The article highlights key success stories, partnerships, and the impact of GTU's unique incubation approach.", date: "2025-06-10", category: 'Media Coverage', thumb: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=60' },
    { id: 'n5', title: "Press Release: Partnership with Industry Leaders", body: "Strategic collaboration announced to accelerate startup growth in Gujarat.", description: "A new partnership with leading industry players has been formalized to provide startups with greater access to markets, technology, and mentorship. The collaboration is expected to accelerate the growth trajectory of Gujarat's most promising ventures.", date: "2025-05-28", category: 'Media Coverage', thumb: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60' },
    { id: 'n6', title: "GTU Ventures in Business Standard", body: "How GTU is transforming education through entrepreneurship.", description: "Business Standard explores how GTU Ventures is bridging the gap between academia and industry, fostering a culture of innovation and entrepreneurship among students and faculty alike.", date: "2025-05-15", category: 'Media Coverage', thumb: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=60' },

    // Blogs/Articles
    { id: 'n7', title: "The Future of Startup Ecosystem in Gujarat", body: "Insights into emerging trends and opportunities for entrepreneurs.", description: "This article delves into the evolving startup ecosystem in Gujarat, examining trends, challenges, and opportunities for new ventures. It features interviews with founders, investors, and policy makers.", date: "2025-06-20", category: 'Blogs/Articles', thumb: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=60' },
    { id: 'n8', title: "Building Resilient Startups: Lessons from GTU Ventures", body: "Key strategies for sustainable growth in competitive markets.", description: "Drawing from real-world examples, this blog post outlines the strategies that have helped GTU Ventures startups thrive in competitive markets, including adaptability, customer focus, and strong leadership.", date: "2025-06-05", category: 'Blogs/Articles', thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=60' },
    { id: 'n9', title: "Innovation in Education: Bridging Academia and Industry", body: "How GTU Ventures is revolutionizing entrepreneurship education.", description: "A deep dive into GTU Ventures' efforts to integrate entrepreneurship into the academic curriculum, featuring case studies and outcomes from recent programs.", date: "2025-05-30", category: 'Blogs/Articles', thumb: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60' },

    // Events
    { id: 'n10', title: "GTU Demo Day 2025", body: "Top startups pitched to investors and partners.", description: "Demo Day 2025 brought together top startups, investors, and partners for a day of pitches, networking, and collaboration. Highlights included major funding announcements and new partnership deals.", date: "2025-05-20", category: 'Events', thumb: 'https://images.unsplash.com/photo-1555182751-19a9b3a2b7b9?auto=format&fit=crop&w=800&q=60' },
    { id: 'n11', title: "Startup Gujarat Summit 2025", body: "Annual flagship event bringing together entrepreneurs and investors.", description: "The 2025 Summit featured keynote speakers, panel discussions, and a showcase of Gujarat's most innovative startups. The event fostered new connections and celebrated entrepreneurial achievements.", date: "2025-04-18", category: 'Events', thumb: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=60' },

    // Funding
    { id: 'n12', title: "Funding milestone achieved", body: "Startups raised combined ₹50cr in 2025.", description: "In 2025, startups supported by GTU Ventures collectively raised over ₹50 crore, marking a significant milestone for the ecosystem. The funding will be used to scale operations, hire talent, and expand into new markets.", date: "2025-04-15", category: 'Funding', thumb: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=60' },
    { id: 'n13', title: "Angel Investor Network Launch", body: "New platform connects startups with experienced investors.", description: "The launch of the Angel Investor Network provides startups with direct access to experienced investors, mentorship, and funding opportunities. The platform aims to streamline the fundraising process and foster long-term relationships.", date: "2025-04-01", category: 'Funding', thumb: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=60' },
  ];

  // prefer live items from contentStore; fallback to demo data
  const articles = items.length ? items : demo;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { y: 12, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const [filter, setFilter] = useState<string>('All');
  const [selected, setSelected] = useState<any | null>(null);

  // derive categories from the actual articles array so live data drives tabs
  const categories = useMemo(() => {
    const cats = Array.from(new Set(articles.map((d: any) => d.category || 'Uncategorized')));
    // ensure priority categories appear first
    const priority = ['Announcements', 'Media Coverage', 'Blogs/Articles', 'Events', 'Funding'];
    // sort to put priority first then alphabetical
    cats.sort((a: string, b: string) => {
      const ai = priority.indexOf(a);
      const bi = priority.indexOf(b);
      if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
      return a.localeCompare(b);
    });
    return ['All', ...cats];
  }, [articles]);

  const visible = articles.filter((a: any) => filter === 'All' || a.category === filter);

  return (
    <PageShell
      title="News, Media & Insights"
      subtitle="Stay updated with latest announcements, media coverage, thought leadership articles, and startup ecosystem insights from GTU Ventures."
    >

      {/* Category Filter Bar */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full font-medium transition-colors border text-sm
                ${filter === c
                  ? 'bg-primary text-primary-foreground border-primary shadow'
                  : 'bg-background text-muted-foreground border-muted hover:bg-muted'}
              `}
              aria-pressed={filter === c}
              data-testid={`news-filter-${c.toLowerCase().replace(/\W+/g, '-')}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="text-sm text-muted-foreground text-center md:text-right">Showing {visible.length} articles</div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visible.map((a: any, i: number) => (
          <motion.article
            variants={itemVariants}
            key={a.id ?? i}
            className="bg-card rounded-3xl overflow-hidden border shadow-sm hover-lift cursor-pointer"
            onClick={() => setSelected(a)}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${a.title}`}
          >
            <img src={a.thumb} alt={a.title} className="w-full h-48 object-cover" />

            <div className="p-6">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{a.category}</div>

              <h3 className="text-xl font-bold text-foreground mb-3">{a.title}</h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{a.body}</p>

              <div className="text-xs text-muted-foreground">{a.date}</div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* News Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-background rounded-3xl shadow-2xl max-w-lg w-full mx-4 relative animate-in fade-in zoom-in-95">
            <button
              className="absolute top-4 right-4 text-xl text-muted-foreground hover:text-foreground"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>
            <img src={selected.thumb} alt={selected.title} className="w-full h-56 object-cover rounded-t-3xl" />
            <div className="p-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{selected.category}</span>
                <span className="text-xs text-muted-foreground">{selected.date}</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">{selected.title}</h2>
              <div className="text-muted-foreground text-base leading-relaxed whitespace-pre-line mb-4">
                {selected.body}
              </div>
              {selected.description && (
                <div className="prose prose-neutral max-w-none text-foreground text-base leading-relaxed">
                  {selected.description}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
