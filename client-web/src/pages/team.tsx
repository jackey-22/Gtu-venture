import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BoardSection from "@/components/team/board";
import { boardDirectors, boardAdvisors } from "@/lib/boardData";

export default function Team() {
  const baseURL = import.meta.env.VITE_URL;
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await fetch(`${baseURL}user/get-team-members`);
        if (!res.ok) throw new Error('Failed to fetch team members');
        const json = await res.json();
        const data = json.data || [];
        setTeamMembers(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching team members');
      } finally {
        setLoading(false);
      }
    };
    fetchTeamMembers();
  }, [baseURL]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
  const itemVariants = { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.45 } } };

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-6 border rounded-xl animate-pulse">
                  <div className="h-24 w-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-5 w-3/4 bg-gray-300 rounded mx-auto mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded mx-auto"></div>
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
              Team & Mentors
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
              Meet the core team, mentors, and advisors who support GTU Ventures' mission.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          {/* GTU Venture Team */}
          <div className="mb-8">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
              <h2 className="text-display font-bold">GTU Venture Team</h2>
              <p className="text-muted-foreground mt-2">The team that runs day-to-day incubation and programs.</p>
            </motion.div>

            {error ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-red-500">{error}</p>
              </div>
            ) : teamMembers.length === 0 ? (
              <div className="text-center text-muted-foreground py-10">No team members found.</div>
            ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="contents">
              {teamMembers.map((p: any, i: number) => (
                <motion.article variants={itemVariants} key={p._id || i} className="overflow-hidden rounded-2xl shadow-lg bg-card border border-transparent text-center p-6">
                  <div className="h-2 bg-secondary/80 rounded-t" />
                  <div className="p-4">
                    {p.photo ? (
                      <img
                        src={`${baseURL}${p.photo.replace(/\\/g, '/')}`}
                        alt={p.name}
                        className="h-24 w-24 rounded-full mx-auto mb-4 object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`h-24 w-24 bg-gray-100 rounded-full mx-auto mb-4 overflow-hidden ${p.photo ? 'hidden' : 'flex'} items-center justify-center text-2xl font-semibold`}
                      style={{ display: p.photo ? 'none' : 'flex' }}
                    >
                      {(p.name || 'U').charAt(0)}
                    </div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-muted-foreground">{p.role}</div>
                    {p.bio ? <div className="mt-3 text-sm text-muted-foreground">{p.bio}</div> : null}
                    {p.label && typeof p.label === 'object' && p.label.title && (
                      <div className="mt-2 text-xs text-primary">{p.label.title}</div>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        )}
      </div>

          {/* Board of Directors & Advisors */}
          <BoardSection directors={boardDirectors} advisors={boardAdvisors} />
        </div>
      </section>
    </div>
  );
}
