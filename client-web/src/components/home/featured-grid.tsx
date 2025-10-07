import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users, TrendingUp, Lightbulb, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

// Using plain anchors so routing works regardless of router setup; replace with <Link> if using react-router/next/router

export default function FeaturedGrid() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4">Discover Your Path to Success</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Explore our comprehensive ecosystem designed to support entrepreneurs at every stage of their journey</p>
        </div>

  {/* 2x2 Grid - uniform card heights and subtle background */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Browse Startups Card - Big Text Card */}
          <a href="/startups" className="group">
            <motion.div whileHover={{ y: -6, scale: 1.02 }} className="lg:row-span-1 bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow transition-transform duration-300 card-hover cursor-pointer group overflow-hidden min-h-[260px] md:min-h-[320px]">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-purple-600 transition-colors">Browse Our Startups</h3>
                <p className="text-body text-muted-foreground mb-6">Discover innovative startups built by our founders across diverse industries and technologies. Explore profiles and connect with teams on the startups page.</p>
              </div>
              <div className="ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                <ArrowRight className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-gtu-primary" />
                <span className="text-xl font-bold text-foreground">150+</span>
                <span className="text-muted-foreground">Startups</span>
              </span>
              <span className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gtu-primary" />
                <span className="text-xl font-bold text-foreground">500+</span>
                <span className="text-muted-foreground">Founders</span>
              </span>
            </div>
          </motion.div>
          </a>
          {/* Find Your Program Card - Image Card */}
          <a href="/programs" className="group block" aria-label="Find Your Program">
          <motion.div whileHover={{ y: -6, scale: 1.02 }} className="relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl card-hover cursor-pointer group transition-transform duration-300 min-h-[260px] md:min-h-[320px]">
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=60" alt="Team collaboration" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>
            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-3">Programs</span>
                <h3 className="text-2xl font-bold text-white mb-2">Find Your Program</h3>
                <p className="text-gray-200 text-sm">From pre-incubation to acceleration, discover the right program for your venture stage.</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>
          </a>
          {/* For Investors & Mentors Card - Image Card */}
          <a href="/partners" className="group">
          <motion.div whileHover={{ y: -6, scale: 1.02 }} className="relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl card-hover cursor-pointer group transition-transform duration-300 min-h-[260px] md:min-h-[320px]">
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=60" alt="Partners collaboration" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
            </div>
            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-3">Partners</span>
                <h3 className="text-2xl font-bold text-white mb-2">Our Partners</h3>
                <p className="text-gray-200 text-sm">We collaborate with leading organizations, government bodies, and industry leaders to provide comprehensive support to our startup ecosystem.</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>
          </a>
          {/* Build for the Future CTA - Text Card with Gradient */}
          <a href="/apply" className="group">
          <motion.div whileHover={{ y: -6, scale: 1.02 }} className="rounded-3xl p-8 shadow-md hover:shadow-xl card-hover cursor-pointer group text-white transition-transform duration-300 min-h-[260px] md:min-h-[320px] bg-[#7247bd]">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-4">
                  <Lightbulb className="w-6 h-6" />
                  <span className="text-purple-100 text-sm font-medium">Innovation Hub</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-extrabold mb-4 group-hover:text-purple-100 transition-colors">Build for the Future</h3>
                <p className="text-purple-100 mb-6">Access cutting-edge research, world-class facilities, and breakthrough technologies to build tomorrow's solutions today.</p>
              </div>
              <div className="ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
            </div>
            <Button
              variant="secondary"
              className="bg-white text-[#7247bd] font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
            >
              <span className="flex items-center gap-3">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 text-[#7247bd]" />
              </span>
            </Button>
          </motion.div>
          </a>
        </div>
      </div>
    </section>
  );
}
