import PageShell from "./page-shell";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Reports() {
  const baseURL = import.meta.env.VITE_URL;
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [selectedReport, setSelectedReport] = useState<any | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`${baseURL}user/get-reports`);
        if (!res.ok) throw new Error('Failed to fetch reports');
        const json = await res.json();
        const data = json.data || [];
        setReports(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching reports');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [baseURL]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { y: 12, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const tags = useMemo(() => {
    const categories = reports.map((r) => r.category || 'Uncategorized').filter(Boolean);
    return ['All', ...Array.from(new Set(categories))];
  }, [reports]);

  const visible = useMemo(() => {
    return reports.filter((r: any) => filter === 'All' || (r.category || 'Uncategorized') === filter);
  }, [reports, filter]);

  if (loading) {
    return (
      <PageShell
        title="Annual & Impact Reports"
        subtitle="Download our annual and impact reports to review GTU Ventures' performance and outcomes."
      >
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-3 text-primary">Loading Reports...</p>
          </div>
        </div>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell
        title="Annual & Impact Reports"
        subtitle="Download our annual and impact reports to review GTU Ventures' performance and outcomes."
      >
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      </PageShell>
    );
  }

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

      {visible.length === 0 ? (
        <div className="text-center text-muted-foreground py-10">
          No reports found.
        </div>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((it: any, i: number) => (
            <motion.article
              variants={itemVariants}
              key={it._id ?? i}
              className="bg-card rounded-3xl overflow-hidden border shadow-sm hover-lift cursor-pointer"
              onClick={() => setSelectedReport(it)}
            >
              <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <svg className="w-16 h-16 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="font-semibold text-lg line-clamp-2 flex-1 min-w-0">{it.title}</div>
                  {it.category && (
                    <div className="text-xs px-2 py-1 bg-accent/10 text-accent rounded flex-shrink-0">{it.category}</div>
                  )}
                </div>

                {it.description && (
                  <div className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{it.description}</div>
                )}

                <div className="mt-2">
                  <a 
                    href={it.fileUrl ? `${baseURL}${it.fileUrl.replace(/\\/g, '/')}` : '#'} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}

      {/* Report Detail Modal */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedReport && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <DialogTitle className="text-2xl font-bold text-foreground flex-1 min-w-0">
                    {selectedReport.title}
                  </DialogTitle>
                  {selectedReport.category && (
                    <div className="text-xs px-2 py-1 bg-accent/10 text-accent rounded flex-shrink-0">
                      {selectedReport.category}
                    </div>
                  )}
                </div>
                {selectedReport.description && (
                  <DialogDescription className="text-base">
                    {selectedReport.description}
                  </DialogDescription>
                )}
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center justify-center p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                  <svg className="w-20 h-20 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>

                {selectedReport.date && (
                  <div className="text-sm text-muted-foreground">
                    <strong>Date:</strong> {new Date(selectedReport.date).toLocaleDateString()}
                  </div>
                )}

                {selectedReport.created_at && (
                  <div className="text-sm text-muted-foreground">
                    <strong>Published:</strong> {new Date(selectedReport.created_at).toLocaleDateString()}
                  </div>
                )}

                <div className="pt-4">
                  <Button asChild className="w-full">
                    <a 
                      href={selectedReport.fileUrl ? `${baseURL}${selectedReport.fileUrl.replace(/\\/g, '/')}` : '#'} 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
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
