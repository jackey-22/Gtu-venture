import { motion } from "framer-motion";
import { Award, TrendingUp, Users, DollarSign } from "lucide-react";

const successStories = [
  {
    id: 1,
    title: "AgriTech Startup Raises ₹2.5 Cr",
    description: "A student-led startup developing AI-powered crop monitoring solutions secured Series A funding from top investors, creating 50+ jobs in rural Gujarat.",
    icon: TrendingUp,
    metric: "₹2.5 Cr Raised",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=400&q=60",
  },
  {
    id: 2,
    title: "Clean Energy Solution Patents Granted",
    description: "Our incubated startup filed 5 patents for innovative solar panel efficiency technology, now deployed in 20+ industrial facilities across India.",
    icon: Award,
    metric: "5 Patents Filed",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=400&q=60",
  },
  {
    id: 3,
    title: "HealthTech Platform Scales to 100K Users",
    description: "A GTU Ventures graduate built a telemedicine platform that now serves over 100,000 patients, generating ₹15 Cr in annual revenue.",
    icon: Users,
    metric: "100K+ Users",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&q=60",
  },
  {
    id: 4,
    title: "FinTech Startup Acquires Major Investment",
    description: "From ideation to acquisition, this startup developed blockchain-based payment solutions and was acquired for ₹50 Cr by a leading financial institution.",
    icon: DollarSign,
    metric: "₹50 Cr Acquisition",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=60",
  },
];

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

export default function SuccessStories() {
  return (
    <section className="py-24 bg-gradient-to-br from-gtu-light to-gtu-base">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Highlights of Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real achievements from our incubated startups, showcasing innovation, growth, and impact across Gujarat and beyond.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {successStories.map((story) => (
            <motion.div
              key={story.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <story.icon className="w-6 h-6 text-gtu-primary" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{story.title}</h3>
                <p className="text-muted-foreground mb-4">{story.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gtu-primary font-semibold text-lg">{story.metric}</span>
                  <div className="w-8 h-8 bg-gtu-lavender rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-gtu-primary" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}