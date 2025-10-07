import { useState } from "react";
import { motion } from "framer-motion";

const tabs = ["News", "Events", "Insights"];

const content = {
  News: [
    {
      id: 1,
      category: "Startup Success",
      title: "Local EdTech Startup Raises ₹5cr Series A",
      description: "GTU Ventures alumni company secures major funding round to expand across India.",
      date: "Jan 15, 2025",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
      categoryColor: "text-primary",
    },
    {
      id: 2,
      category: "Innovation",
      title: "Gujarat Startup Wins National AI Challenge",
      description: "Recognition for breakthrough artificial intelligence solution developed at GTU.",
      date: "Jan 12, 2025",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
      categoryColor: "text-success",
    },
    {
      id: 3,
      category: "Partnership",
      title: "New Collaboration with Global Tech Giant",
      description: "Strategic partnership to accelerate startup growth and technology transfer.",
      date: "Jan 10, 2025",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
      categoryColor: "text-secondary",
    },
  ],
  Events: [
    {
      id: 1,
      category: "Upcoming Event",
      title: "CowTech Krishi Summit 2025",
      description: "World Environment Day celebration featuring agricultural technology innovations.",
      date: "June 5, 2025",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
      categoryColor: "text-warning",
    },
    {
      id: 2,
      category: "Workshop",
      title: "Startup Funding Masterclass",
      description: "Learn from successful entrepreneurs about securing investment for your startup.",
      date: "Feb 15, 2025",
      image: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
      categoryColor: "text-primary",
    },
    {
      id: 3,
      category: "Pitch Event",
      title: "Demo Day 2025 - Season 1",
      description: "Watch our latest cohort of startups pitch to investors and industry experts.",
      date: "Mar 20, 2025",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
      categoryColor: "text-success",
    },
  ],
  Insights: [
    {
      id: 1,
      category: "Industry Insight",
      title: "The Future of Student Entrepreneurship",
      description: "Analyzing trends and opportunities in the evolving startup ecosystem.",
      date: "Jan 10, 2025",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
      categoryColor: "text-success",
    },
    {
      id: 2,
      category: "Research",
      title: "Gujarat's Startup Ecosystem Report 2024",
      description: "Comprehensive analysis of startup growth and investment trends in Gujarat.",
      date: "Dec 28, 2024",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
      categoryColor: "text-primary",
    },
    {
      id: 3,
      category: "Best Practices",
      title: "Building Sustainable Startups",
      description: "Key strategies for creating long-term value in your entrepreneurial journey.",
      date: "Dec 25, 2024",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
      categoryColor: "text-secondary",
    },
  ],
};

export default function LatestUpdates() {
  const [activeTab, setActiveTab] = useState("News");

  return (
    <section className="py-24 bg-background" data-testid="latest-updates">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-display font-bold text-foreground mb-6">
            Latest Updates
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with our programs, events, and startup success stories
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted rounded-full p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`tab-${tab.toLowerCase()}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {content[activeTab as keyof typeof content].map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-3xl overflow-hidden border shadow-sm hover-lift cursor-pointer"
              data-testid={`content-card-${item.id}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className={`text-xs font-semibold ${item.categoryColor} uppercase tracking-wide mb-2`}>
                  {item.category}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="text-xs text-muted-foreground">
                  {item.date}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
