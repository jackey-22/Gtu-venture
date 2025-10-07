import React, { useMemo, useState } from "react";
import PageShell from "./page-shell";
import { Download } from "lucide-react";
import { getAll } from "@/lib/contentStore";

type Circular = {
  id: string;
  title: string;
  summary?: string;
  tags?: string[];
  url?: string; // PDF download
  date?: string;
};

const DEMO: Circular[] = [
  { id: "c1", title: "Circular: Startup Intake 2025-1", summary: "Open call for startups for the 2025 cohort.", tags: ["intake", "program"], url: "#", date: "2025-07-01" },
  { id: "c2", title: "Circular: Lab Access Policy", summary: "Updated safety and access policy for campus labs.", tags: ["policy", "facilities"], url: "#", date: "2025-06-12" },
  { id: "c3", title: "Circular: Funding Opportunity - Seed Grants", summary: "Information on seed grants for incubated startups.", tags: ["funding"], url: "#", date: "2025-05-20" },
  { id: "t1", title: "Tender: IT Infrastructure Upgrade", summary: "Procurement notice for campus IT infrastructure modernization.", tags: ["tender", "procurement", "IT"], url: "#", date: "2025-06-25" },
  { id: "t2", title: "Tender: Lab Equipment Procurement", summary: "Public tender for advanced prototyping equipment and tools.", tags: ["tender", "procurement", "equipment"], url: "#", date: "2025-06-18" },
  { id: "t3", title: "Tender: Event Management Services", summary: "Procurement for startup demo day and networking event services.", tags: ["tender", "procurement", "events"], url: "#", date: "2025-06-10" },
];

export default function Circulars() {
  const items = getAll<any>("circulars") || [];
  const circulars: Circular[] = useMemo(() => (items.length ? items.map((it: any, i: number) => ({ id: it.id || `c_${i}`, title: it.title || it.name, summary: it.summary || it.body, tags: it.tags || [], url: it.url || '#', date: it.date })) : DEMO), [items]);

  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(() => Array.from(new Set(circulars.flatMap((c) => c.tags || []))), [circulars]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return circulars.filter((c) => {
      const matchesQ = !q || c.title.toLowerCase().includes(q) || (c.summary || "").toLowerCase().includes(q);
      const matchesTag = !tag || (c.tags || []).includes(tag);
      return matchesQ && matchesTag;
    });
  }, [circulars, query, tag]);

  return (
    <PageShell title="Circulars" subtitle="Official notices, policies, and program circulars from GTU Ventures.">
      <div className="mb-8 flex items-center gap-4">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search circulars..." className="flex-1 rounded-lg border px-4 py-2 bg-card" />
        <div className="flex gap-2">
          <button
            onClick={() => setTag(null)}
            className={`px-3 py-2 rounded ${tag === null ? 'bg-[#7247bd] text-white' : 'bg-card text-muted-foreground'}`}
          >
            All
          </button>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-3 py-2 rounded ${tag === t ? 'bg-[#7247bd] text-white' : 'bg-card text-muted-foreground'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Initiatives Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Initiatives & Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Design Innovation Centre (DIC)", description: "District Innovation Cell support programs", href: "/initiatives#dic" },
            { name: "IPR Support", description: "Intellectual Property rights and protection services", href: "/initiatives#ipr" },
            { name: "GISC", description: "Gujarat Innovation Startup Cell programs", href: "/initiatives#gisc" },
            { name: "AIC-GISC Foundation", description: "Atal Incubation Centre - Gujarat Innovation Startup Cell", href: "/initiatives#aic-gisc" }
          ].map((initiative, i) => (
            <a
              key={i}
              href={initiative.href}
              className="block p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-lg transition-all"
            >
              <h3 className="font-semibold text-lg mb-2">{initiative.name}</h3>
              <p className="text-sm text-muted-foreground">{initiative.description}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((c) => (
          <article key={c.id} className="rounded-2xl bg-card p-6 shadow border border-transparent">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{c.title}</h3>
                <div className="text-sm text-muted-foreground mt-1">{c.date}</div>
              </div>
              <a href={c.url} className="text-muted-foreground hover:text-primary flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span className="text-sm">Download</span>
              </a>
            </div>
            {c.summary ? <p className="mt-4 text-sm text-muted-foreground">{c.summary}</p> : null}
            {c.tags?.length ? <div className="mt-4 flex flex-wrap gap-2">{c.tags.map((t) => <span key={t} className="text-xs px-2 py-1 bg-muted rounded">{t}</span>)}</div> : null}
          </article>
        ))}
      </div>
    </PageShell>
  );
}

