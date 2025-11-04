import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/animated-counter";
import { useEffect, useState } from "react";
import { fetchGet } from "@/utils/fetch.utils";

export default function MetricsStrip() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetchGet({ pathName: 'user/get-metrics' });
        if (response?.success && response?.data) {
          setMetrics(response.data);
        } else {
          // Fallback to default metrics
          setMetrics([
            { label: "Students Sensitised", value: 430000, suffix: "" },
            { label: "Startups Supported", value: 730, suffix: "" },
            { label: "Funding Disbursed", value: 21.17, prefix: "₹", suffix: "cr" },
            { label: "Jobs Created", value: 4100, suffix: "+" },
            { label: "Student Projects", value: 3578, suffix: "" },
            { label: "Patents Granted", value: 214, suffix: "" },
            { label: "Revenue Generated", value: 56.02, prefix: "₹", suffix: "cr" },
            { label: "Mentors Engaged", value: 273, suffix: "" },
          ]);
        }
      } catch (error) {
        console.error('Error fetching metrics:', error);
        setMetrics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading || metrics.length === 0) {
    return null;
  }

  return (
    <section className="py-[clamp(3rem,8vw,6rem)] bg-primary text-white overflow-hidden" data-testid="metrics-strip">
      <div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,4rem)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-[clamp(2rem,5vw,4rem)]"
        >
          <h2 className="font-bold mb-[clamp(1rem,3vw,1.5rem)]" style={{ fontSize: 'clamp(1.75rem, 4vw + 0.5rem, 3rem)' }}>Impact by GTU Ventures</h2>
          <p className="text-white/90 max-w-3xl mx-auto" style={{ fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1.25rem)' }}>
            Building India's startup ecosystem through innovation and entrepreneurship
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[clamp(1.5rem,4vw,2rem)]">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
              data-testid={`metric-${index}`}
            >
              <div className="font-bold mb-2 counter" style={{ fontSize: 'clamp(1.75rem, 4vw + 0.5rem, 3rem)' }}>
                <AnimatedCounter
                  from={0}
                  to={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              </div>
              <div className="text-white/80 uppercase tracking-wide" style={{ fontSize: 'clamp(0.75rem, 1vw + 0.25rem, 0.875rem)' }}>
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
