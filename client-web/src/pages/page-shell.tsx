import React from "react";
import { motion } from "framer-motion";

type PageShellProps = {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  heroActions?: React.ReactNode;
  children?: React.ReactNode;
  fullWidth?: boolean;
};

export default function PageShell({ title, subtitle, eyebrow, heroActions, children, fullWidth }: PageShellProps) {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero / page header (render only when title is provided) */}
      {title ? (
        <section className="py-24 bg-gradient-to-br from-gtu-base to-gtu-light">
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div>
                {eyebrow ? (
                  <div className="text-sm text-primary font-medium mb-2 uppercase tracking-wide">{eyebrow}</div>
                ) : null}

                <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight font-extrabold mb-4 text-foreground">
                  {title}
                </h1>

                {subtitle ? (
                  <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">{subtitle}</p>
                ) : null}
              </div>

              {heroActions ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45 }}
                  className="flex-shrink-0"
                >
                  {heroActions}
                </motion.div>
              ) : null}
            </motion.div>
          </div>
        </section>
      ) : null}

      {/* Main content container */}
      <section className="py-16 bg-background">
        <div className={`${fullWidth ? "max-w-screen-2xl" : "max-w-7xl"} mx-auto px-6 lg:px-16`}>
          {children}
        </div>
      </section>
    </div>
  );
}
