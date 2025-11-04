import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const tabs = ["News", "Events", "Insights"];

export default function LatestUpdates() {
  const baseURL = import.meta.env.VITE_URL;
  const [activeTab, setActiveTab] = useState("News");
  const [news, setNews] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, eventsRes] = await Promise.all([
          fetch(`${baseURL}user/get-news`),
          fetch(`${baseURL}user/get-events`)
        ]);

        const newsJson = await newsRes.json();
        const eventsJson = await eventsRes.json();

        setNews((newsJson.data || []).slice(0, 3));
        setEvents((eventsJson.data || []).slice(0, 3));
      } catch (error) {
        console.error('Error fetching latest updates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseURL]);

  const content = useMemo(() => {
    const newsItems = news.map((item, idx) => ({
      id: item._id || idx,
      category: item.category || "News",
      title: item.title || "",
      description: item.content?.substring(0, 150) || item.description || "",
      date: item.date ? new Date(item.date).toLocaleDateString() : item.created_at ? new Date(item.created_at).toLocaleDateString() : "",
      image: item.images && item.images.length > 0 ? `${baseURL}${item.images[0].replace(/\\/g, '/')}` : "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      categoryColor: "text-primary",
    }));

    const eventItems = events.map((item, idx) => ({
      id: item._id || idx,
      category: item.category || "Event",
      title: item.title || "",
      description: item.description?.substring(0, 150) || "",
      date: item.start_date ? new Date(item.start_date).toLocaleDateString() : "",
      image: item.image ? `${baseURL}${item.image.replace(/\\/g, '/')}` : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      categoryColor: "text-warning",
    }));

    // Keep Insights as static for now (can be made dynamic later)
    const insightsItems = [
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
    ];

    return {
      News: newsItems.length > 0 ? newsItems : [{
        id: 1,
        category: "News",
        title: "No news available",
        description: "Check back soon for the latest updates.",
        date: "",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        categoryColor: "text-primary",
      }],
      Events: eventItems.length > 0 ? eventItems : [{
        id: 1,
        category: "Event",
        title: "No events available",
        description: "Check back soon for upcoming events.",
        date: "",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        categoryColor: "text-warning",
      }],
      Insights: insightsItems,
    };
  }, [news, events, baseURL]);

  return (
    <section className="py-[clamp(3rem,8vw,6rem)] bg-background overflow-hidden" data-testid="latest-updates">
      <div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,4rem)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-[clamp(2rem,5vw,3rem)]"
        >
          <h2 className="font-bold text-foreground mb-[clamp(1rem,3vw,1.5rem)]" style={{ fontSize: 'clamp(1.75rem, 4vw + 0.5rem, 3rem)' }}>
            Latest Updates
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto" style={{ fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1.25rem)' }}>
            Stay updated with our programs, events, and startup success stories
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-[clamp(2rem,5vw,3rem)] overflow-x-auto">
          <div className="bg-muted rounded-full p-1 flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-[clamp(1rem,3vw,1.5rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] rounded-full font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontSize: 'clamp(0.75rem, 1vw + 0.25rem, 0.875rem)' }}
                data-testid={`tab-${tab.toLowerCase()}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
              <p className="mt-3 text-primary">Loading...</p>
            </div>
          </div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(1.5rem,4vw,2rem)]"
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
                className="w-full object-cover"
                style={{ aspectRatio: '16/9', height: 'clamp(12rem, 25vw, 12rem)' }}
              />
              <div className="p-[clamp(1rem,3vw,1.5rem)]">
                <div className={`font-semibold ${item.categoryColor} uppercase tracking-wide mb-2`} style={{ fontSize: 'clamp(0.625rem, 1vw + 0.25rem, 0.75rem)' }}>
                  {item.category}
                </div>
                <h3 className="font-bold text-foreground mb-[clamp(0.5rem,1.5vw,0.75rem)]" style={{ fontSize: 'clamp(1rem, 2vw + 0.25rem, 1.25rem)' }}>
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-[clamp(0.75rem,2vw,1rem)]" style={{ fontSize: 'clamp(0.75rem, 1.2vw + 0.25rem, 0.875rem)' }}>
                  {item.description}
                </p>
                <div className="text-muted-foreground" style={{ fontSize: 'clamp(0.625rem, 1vw + 0.25rem, 0.75rem)' }}>
                  {item.date}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
        )}
      </div>
    </section>
  );
}
