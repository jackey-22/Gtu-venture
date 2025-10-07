import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
  return (
    <section className="py-24 bg-background" id="about" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-display font-bold text-foreground mb-6">
              GTU Ventures
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Gujarat Technological University (GTU), established in 2007, has
              consistently been at the forefront of fostering innovation,
              entrepreneurship, and skills development in Gujarat. With a rich
              history of supporting over 750 startups and generating thousands of
              jobs, GTU has carved its niche as a leader in the startup ecosystem
              of the state.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              The launch of GTU Ventures aligns with the broader vision of scaling
              up the university's contributions to the state's economic
              development, supporting Hon'ble Prime Minister Shri Narendra Modi's
              vision for a Viksit Bharat@2047.
            </p>
            <Button
              asChild
              className="btn-primary bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold"
              data-testid="about-learn-more"
            >
              <a href="/about">Learn More</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <img
              src="/incub12.jpeg"
              alt="GTU Ventures incubation space"
              className="rounded-3xl shadow-lg w-full h-auto"
              data-testid="about-image"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 bg-accent rounded-2xl p-6 text-center shadow-lg"
              data-testid="about-stat-card"
            >
              <div className="text-2xl font-bold text-accent-foreground">
                10,000
              </div>
              <div className="text-sm text-accent-foreground">
                Sq. Ft. Incubation Area
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
