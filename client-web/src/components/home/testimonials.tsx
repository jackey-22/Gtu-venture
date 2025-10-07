import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote: "GTU Ventures provided the perfect environment to transform our idea into a thriving business. The mentorship and resources were invaluable.",
    author: "Rajesh Patel",
    position: "Founder, TechStart Solutions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
  },
  {
    id: 2,
    quote: "The funding and guidance from GTU Ventures helped us scale our startup faster than we ever imagined. Their network is incredible.",
    author: "Priya Sharma",
    position: "Co-founder, EduTech Innovations",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332c37b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
  },
  {
    id: 3,
    quote: "Being part of the GTU Ventures ecosystem opened doors we never knew existed. The community support is amazing.",
    author: "Amit Singh",
    position: "Founder, AgriTech Solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-muted" data-testid="testimonials">
      <div className="max-w-4xl mx-auto px-6 lg:px-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-display font-bold text-foreground mb-16"
        >
          What Founders Say
        </motion.h2>

        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
              data-testid={`testimonial-${currentIndex}`}
            >
              <blockquote className="text-2xl lg:text-3xl font-medium text-foreground leading-relaxed mb-8">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].author}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                data-testid={`testimonial-image-${currentIndex}`}
              />
              <div className="font-semibold text-foreground">
                {testimonials[currentIndex].author}
              </div>
              <div className="text-muted-foreground text-sm">
                {testimonials[currentIndex].position}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center space-x-2 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-border"
              }`}
              data-testid={`testimonial-dot-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
