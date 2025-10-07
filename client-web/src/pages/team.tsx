import PageShell from "./page-shell";
import { motion } from "framer-motion";
import { Twitter, Linkedin } from "lucide-react";
import BoardSection from "@/components/team/board";
import { boardDirectors, boardAdvisors } from "@/lib/boardData";
import { gtuVentureTeam } from "@/lib/gtuTeamData";

export default function Team() {
  return (
    <PageShell title="Team & Mentors" subtitle="Meet the core team, mentors, and advisors who support GTU Ventures' mission.">
      {/* GTU Venture Team */}
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <h2 className="text-display font-bold">GTU Venture Team</h2>
          <p className="text-muted-foreground mt-2">The team that runs day-to-day incubation and programs.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(() => {
            const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
            const itemVariants = { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.45 } } };

            return (
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="contents">
                {gtuVentureTeam.map((p: any, i: number) => (
                  <motion.article variants={itemVariants} key={i} className="overflow-hidden rounded-2xl shadow-lg bg-card border border-transparent text-center p-6">
                    <div className="h-2 bg-secondary/80 rounded-t" />
                    <div className="p-4">
                      <div className="h-24 w-24 bg-gray-100 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center text-2xl font-semibold">{(p.name || 'U').charAt(0)}</div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-muted-foreground">{p.role}</div>
                      {p.bio ? <div className="mt-3 text-sm">{p.bio}</div> : null}
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            );
          })()}
        </div>
      </div>

      {/* Board of Directors & Advisors */}
      <BoardSection directors={boardDirectors} advisors={boardAdvisors} />
    </PageShell>
  );
}
