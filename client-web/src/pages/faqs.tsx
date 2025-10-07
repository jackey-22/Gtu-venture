import React, { useMemo, useState } from "react";
import PageShell from "./page-shell";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { getAll } from "@/lib/contentStore";
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

const DEMO: FAQ[] = [
  {
    id: "f1",
    question: "Who can apply to GTU Ventures?",
    answer: "GTU Ventures welcomes applications from students, alumni, and faculty members who have a startup idea or an early-stage business. Applicants should be affiliated with Gujarat Technological University or its partner institutions. Teams with innovative solutions, a clear business model, and a commitment to building their venture are encouraged to apply.",
    category: "Eligibility"
  },
  {
    id: "f2",
    question: "What support do you provide?",
    answer: "We offer a comprehensive support package including hands-on mentorship from industry experts, access to co-working space, seed funding introductions, business development workshops, networking events, and pilot opportunities with corporate and government partners. Our goal is to help startups validate their ideas, build scalable products, and connect with investors.",
    category: "Program"
  },
  {
    id: "f3",
    question: "How long is the incubation program?",
    answer: "The incubation program typically runs for 6 months, structured around key milestones such as product development, market validation, and fundraising. Startups participate in regular check-ins, workshops, and a final Demo Day to showcase their progress to investors and partners. Alumni support continues even after graduation.",
    category: "Program"
  },
  {
    id: "f4",
    question: "Are there fees for participants?",
    answer: "There are no direct program fees for selected startups. In some cases, startups may be asked to contribute a small equity stake in exchange for incubation services and funding support. All terms are clearly communicated during the selection process.",
    category: "Finance"
  },
  {
    id: "f5",
    question: "How do I become a mentor?",
    answer: "Experienced founders, industry professionals, and domain experts can apply to join our mentor network by filling out the mentor application form on our website. Our team reviews applications based on expertise, availability, and fit with our startups. Selected mentors are invited to participate in workshops, one-on-one sessions, and Demo Day panels.",
    category: "Mentorship"
  },
  {
    id: "f6",
    question: "Can I apply outside the listed cycles?",
    answer: "While we have regular application cycles, we also accept rolling applications from exceptional teams. If you have a strong business case and are ready to join the program, submit your application at any time. Our team will review and get in touch if there is a fit.",
    category: "Eligibility"
  },
  {
    id: "f7",
    question: "How do I contact support?",
    answer: "For any queries or assistance, you can reach our support team by emailing <a href='mailto:support@gtuventures.com' class='text-primary underline'>support@gtuventures.com</a> or by using the contact form on our website. Our team is available Monday to Friday, 10am–6pm IST, and will respond within 1–2 business days.",
    category: "Support"
  }
];

export default function FAQs() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  // Try to read from content store; fall back to demo data
  const items = getAll<any>("faqs") || [];

  const faqs: FAQ[] = useMemo(() => {
    if (!items || items.length === 0) return DEMO;
    return items.map((it: any, i: number) => ({
      id: it.id || `f_${i}`,
      question: it.title || it.question || `Question ${i + 1}`,
      answer: it.body || it.answer || "",
      category: it.category || "General",
    }));
  }, [items]);

  const categories = useMemo(() => Array.from(new Set(faqs.map((f) => f.category))), [faqs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const matchQ = !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
      const matchCat = !activeCategory || f.category === activeCategory;
      return matchQ && matchCat;
    });
  }, [faqs, query, activeCategory]);

  return (
    <PageShell title="FAQs" subtitle="Frequently asked questions about GTU Ventures & the incubation program.">
      <div className="mb-8">
        <div className="flex items-center gap-3 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions, keywords..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border bg-card"
              aria-label="Search FAQs"
            />
          </div>

          <div className="flex gap-2">
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
                  <CardDescription className="mt-1">Category: {f.category}</CardDescription>
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
