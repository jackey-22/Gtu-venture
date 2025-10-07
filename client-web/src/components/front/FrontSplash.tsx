import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FrontSplash({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const total = 1800; // ms
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, Math.round((elapsed / total) * 100));
      setProgress(p);
      if (elapsed >= total) {
        clearInterval(id);
        onFinish();
      }
    }, 50);

    return () => clearInterval(id);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#f9f7ff] via-[#f0f2ff] to-[#f5f6ff] overflow-hidden">
      {/* floating gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ x: ["-10%", "10%", "-10%"], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-[#a78bfa]/40 to-[#7c4dff]/30 blur-3xl"
        />
        <motion.div
          animate={{ x: ["0%", "-12%", "0%"], y: [0, 18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-28 right-0 w-[26rem] h-[26rem] rounded-full bg-gradient-to-br from-[#e0f2fe]/50 to-[#f3e8ff]/40 blur-3xl"
        />
      </div>

      {/* subtle particle dots */}
      <div className="absolute inset-0 -z-20">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-black/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.4, 1] }}
            transition={{ duration: 3 + Math.random() * 3, repeat: Infinity }}
          />
        ))}
      </div>

      {/* main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl mx-6"
      >
        <div className="relative bg-white/50 backdrop-blur-lg px-8 py-8 rounded-3xl flex items-center gap-8 shadow-2xl border border-white/40 overflow-hidden">
          {/* rotating highlight */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />

          {/* logo section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <div className="rounded-full p-1 bg-gradient-to-tr from-[#7c4dff] to-[#a78bfa] shadow-lg">
              <img
                src="/gtulogo.png"
                alt="GTU"
                className="h-20 md:h-24 bg-white rounded-full p-1"
              />
            </div>
            <div>
              <img src="/gtuv.png" alt="GTU Ventures" className="h-12 md:h-14" />
              <div className="text-xs text-muted-foreground mt-1">
              </div>
            </div>
          </motion.div>

          {/* right content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex-1"
          >
            <h3 className="text-2xl font-bold text-foreground tracking-tight">
              GTU Ventures
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Curating founders, mentorship and capital.
            </p>

            {/* progress bar */}
            <div className="mt-6 relative">
              <div className="h-3 w-full rounded-full bg-white/30 overflow-hidden shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#7c4dff] via-[#8b5cf6] to-[#c084fc] shadow-md"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut", duration: 0.3 }}
                />
                {/* shimmer sweep */}
                <motion.div
                  className="absolute left-0 top-0 h-3 w-28 bg-white/40 blur-sm mix-blend-screen"
                  animate={{ x: [-60, 400] }}
                  transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Loading — {progress}%
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
