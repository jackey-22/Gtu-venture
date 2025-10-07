import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

type Person = {
  name: string;
  role?: string;
  bio?: string;
  image?: string | null;
};

export default function BoardSection({
  directors,
  advisors,
}: {
  directors: Person[];
  advisors: Person[];
}) {
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
  const itemVariants = { hidden: { y: 8, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.45 } } };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-display font-bold text-foreground">Board of Directors</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
            The leadership that guides GTU Ventures' strategic direction.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {directors.map((p, i) => (
            <motion.article variants={itemVariants} key={i} className="overflow-hidden rounded-2xl shadow-lg bg-card border border-transparent text-center p-6">
              <div className="h-2 bg-secondary/80 rounded-t" />
              <div className="p-4">
                <div className="h-24 w-24 bg-gray-100 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center text-2xl font-semibold">{(p.name || 'U').charAt(0)}</div>
                <div className="font-semibold">{p.name}</div>
                {p.role ? <div className="text-sm text-muted-foreground">{p.role}</div> : null}
                {p.bio ? <div className="mt-3 text-sm">{p.bio}</div> : null}
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-12 text-center mb-8">
          <h3 className="text-2xl font-semibold text-foreground">Advisors</h3>
        </div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {advisors.map((p, i) => (
            <motion.article variants={itemVariants} key={i} className="overflow-hidden rounded-2xl shadow-lg bg-card border border-transparent text-center p-6">
              <div className="h-2 bg-secondary/80 rounded-t" />
              <div className="p-4">
                <div className="h-24 w-24 bg-gray-100 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center text-2xl font-semibold">{(p.name || 'U').charAt(0)}</div>
                <div className="font-semibold">{p.name}</div>
                {p.role ? <div className="text-sm text-muted-foreground">{p.role}</div> : null}
                {p.bio ? <div className="mt-3 text-sm">{p.bio}</div> : null}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
