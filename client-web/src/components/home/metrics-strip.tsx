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
    <section className="py-24 bg-primary text-white" data-testid="metrics-strip">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display font-bold mb-6">Impact by GTU Ventures</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Building India's startup ecosystem through innovation and entrepreneurship
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <div className="text-4xl lg:text-5xl font-bold mb-2 counter">
                <AnimatedCounter
                  from={0}
                  to={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              </div>
              <div className="text-white/80 text-sm uppercase tracking-wide">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
