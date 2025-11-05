import { getAll } from "@/lib/contentStore";
import { motion } from "framer-motion";
import { useMemo } from "react";

export default function CoI() {
  const items = getAll<any>("coi");

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const itemVariants = { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.45 } } };

  const demo = [
    { id: 'c1', title: 'CoE - AI & Data', body: 'Applied AI research for smart manufacturing and analytics.', collaborators: ['Industry X', 'GTU'], outcomes: '5 patents filed', url: '#' },
    { id: 'c2', title: 'CoE - Clean Energy', body: 'Research on decentralized energy storage and efficiency.', collaborators: ['Energy Lab', 'AIC-GISC'], outcomes: '3 pilot projects', url: '#' }
  ];

  const list = items.length ? items : demo;
  const focusAreas = useMemo(() => [
    'AI & Data',
    'IoT',
    'Clean Energy',
    'Healthcare'
  ], []);

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
              Centres of Excellence (CoE)
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
              Dedicated spaces for applied research, innovation, and industry collaboration in emerging domains.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
      {/* Brief Introduction */}
      <div className="mb-10 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-3 text-foreground">About GTU Ventures CoEs</h2>
        <p className="text-lg text-muted-foreground mb-4">
          GTU Ventures hosts multiple Centres of Excellence (CoEs) to drive innovation, foster industry-academia collaboration, and accelerate commercialization in high-impact domains.
        </p>
      </div>

      {/* Objectives Section */}
      <div className="mb-10 max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-3 text-foreground">Objectives</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground text-base">
          <li className="flex items-start gap-2"><span className="text-primary">•</span> Advance domain-specific research and innovation</li>
          <li className="flex items-start gap-2"><span className="text-primary">•</span> Enable technology transfer and commercialization</li>
          <li className="flex items-start gap-2"><span className="text-primary">•</span> Build strong industry-academia partnerships</li>
          <li className="flex items-start gap-2"><span className="text-primary">•</span> Support startups and talent development</li>
        </ul>
      </div>

      {/* Focus Areas */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-3 text-foreground">Focus Areas</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {focusAreas.map((f) => (
            <span
              key={f}
              className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-base shadow-sm border border-primary/20"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* CoE Cards: Collaborations & Outcomes */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {list.map((it: any, i: number) => (
          <motion.article variants={itemVariants} key={it.id ?? i} className="overflow-hidden rounded-3xl shadow-lg bg-card border border-primary/10 hover:shadow-2xl transform hover:-translate-y-1 transition">
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-xl text-foreground">{it.title}</div>
                <div className="text-sm text-success font-semibold">{it.outcomes}</div>
              </div>
              <div className="text-muted-foreground mb-4">{it.body}</div>
              <div className="flex flex-wrap gap-2 items-center mb-2">
                <span className="text-sm text-muted-foreground font-medium">Collaborators:</span>
                {it.collaborators?.map((c: string) => (
                  <span key={c} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">{c}</span>
                ))}
              </div>
              <a href={it.url ?? '#'} className="inline-block mt-2 text-primary font-medium hover:underline">Resources</a>
            </div>
          </motion.article>
        ))}
      </motion.div>
        </div>
      </section>
    </div>
  );
}
