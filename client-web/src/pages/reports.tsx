import PageShell from "./page-shell";
import { getAll } from "@/lib/contentStore";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export default function Reports() {
  const items = getAll<any>("reports");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { y: 12, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const demo = [
    { id: 'r1', title: 'GTU Ventures - 2024 Impact Report', body: 'Summary of achievements and impact metrics including startups supported and funding disbursed.', url: '#', tag: 'Impact', thumb: 'https://images.unsplash.com/photo-1532635243-1b31d6b29d3b?auto=format&fit=crop&w=800&q=60' },
    { id: 'r2', title: 'Annual Report 2023', body: 'Highlights from 2023 including program expansion and partnerships.', url: '#', tag: 'Annual', thumb: 'https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea?auto=format&fit=crop&w=800&q=60' }
  ];

  const [filter, setFilter] = useState<string>('All');
  const tags = useMemo(() => ['All', ...Array.from(new Set(demo.map((d) => d.tag)))], []);
  const list = items.length ? items : demo;
  const visible = list.filter((l: any) => filter === 'All' || l.tag === filter);

  return (
    <PageShell
      title="Annual & Impact Reports"
      subtitle="Download our annual and impact reports to review GTU Ventures' performance and outcomes."
      heroActions={<a href="/reports" className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded">Download Latest</a>}
    >
      {/* Category Filter Bar */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-full font-medium transition-colors border text-sm
                ${filter === t
                  ? 'bg-primary text-primary-foreground border-primary shadow'
                  : 'bg-background text-muted-foreground border-muted hover:bg-muted'}
              `}
              aria-pressed={filter === t}
              data-testid={`reports-filter-${t.toLowerCase().replace(/\W+/g, '-')}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="text-sm text-muted-foreground text-center md:text-right">{visible.length} reports</div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((it: any, i: number) => (
          <motion.article
            variants={itemVariants}
            key={it.id ?? i}
            className="bg-card rounded-3xl overflow-hidden border shadow-sm hover-lift cursor-pointer"
          >
            <img src={it.thumb} alt={it.title} className="w-full h-48 object-cover" />

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-lg">{it.title}</div>
                <div className="text-xs px-2 py-1 bg-accent/10 text-accent rounded">{it.tag}</div>
              </div>

              <div className="text-muted-foreground text-sm leading-relaxed mb-4">{it.body}</div>

              <div className="mt-2">
                <a href={it.url ?? '#'} className="text-primary font-medium">Download PDF</a>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </PageShell>
  );
}
