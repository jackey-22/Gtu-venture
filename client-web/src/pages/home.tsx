import { motion } from "framer-motion";
import Hero from "@/components/home/hero";
import Carousel3D from "@/components/home/carousel3d";
import FeaturedGrid from "@/components/home/featured-grid";
import PartnerLogos from "@/components/home/partner-logos";
import LogoWall from "@/components/startups/logo-wall";
import ProgramHighlights from "@/components/home/program-highlights";
import MetricsStrip from "@/components/home/metrics-strip";
import AboutSection from "@/components/home/about-section";
import SuccessStories from "@/components/home/success-stories";
import Testimonials from "@/components/home/testimonials";
import LatestUpdates from "@/components/home/latest-updates";
import Newsletter from "@/components/home/newsletter";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Home() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen"
    >
      <motion.div variants={itemVariants}>
        <Hero />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Carousel3D />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <FeaturedGrid />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <LogoWall />
        <PartnerLogos />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <ProgramHighlights />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <MetricsStrip />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <AboutSection />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <SuccessStories />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Testimonials />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <LatestUpdates />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Newsletter />
      </motion.div>
    </motion.div>
  );
}
