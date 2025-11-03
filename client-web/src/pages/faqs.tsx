import React, { useMemo, useState, useEffect } from "react";
import PageShell from "./page-shell";
import { Search } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export default function FAQs() {
  const baseURL = import.meta.env.VITE_URL;
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await fetch(`${baseURL}user/get-faqs`);
        if (!res.ok) throw new Error('Failed to fetch FAQs');
        const json = await res.json();
        const data = json.data || [];
        const mappedFAQs: FAQ[] = data.map((it: any, i: number) => ({
          id: it._id || `f_${i}`,
          question: it.question || `Question ${i + 1}`,
          answer: it.answer || "",
          category: "General", // FAQ model doesn't have category field, using default
        }));
        setFaqs(mappedFAQs);
      } catch (err: any) {
        setError(err.message || 'Error fetching FAQs');
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, [baseURL]);

  const categories = useMemo(() => Array.from(new Set(faqs.map((f) => f.category))), [faqs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const matchQ = !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
      const matchCat = !activeCategory || f.category === activeCategory;
      return matchQ && matchCat;
    });
  }, [faqs, query, activeCategory]);

  if (loading) {
    return (
      <PageShell title="FAQs" subtitle="Frequently asked questions about GTU Ventures & the incubation program.">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-3 text-primary">Loading FAQs...</p>
          </div>
        </div>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell title="FAQs" subtitle="Frequently asked questions about GTU Ventures & the incubation program.">
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title="FAQs" subtitle="Frequently asked questions about GTU Ventures & the incubation program.">
      <div className="mb-8">
        <div className="flex items-center gap-3 max-w-2xl flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-3 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions, keywords..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border bg-card"
              aria-label="Search FAQs"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => {
                setActiveCategory(null);
                setQuery("");
              }}
              className={`px-3 py-2 rounded-lg ${activeCategory === null ? "bg-[#7247bd] text-white" : "bg-card text-muted-foreground"}`}
            >
              All
            </button>

            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3 py-2 rounded-lg ${activeCategory === c ? "bg-[#7247bd] text-white" : "bg-card text-muted-foreground"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        {filtered.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">No results — try a different keyword or category.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((f) => (
              <Card key={f.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle>{f.question}</CardTitle>
                  {f.category !== "General" && (
                    <CardDescription className="mt-1">Category: {f.category}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pb-6 pt-2">
                  <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: f.answer }} />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
