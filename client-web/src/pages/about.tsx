import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Lightbulb, Award } from "lucide-react";
import BoardSection from "@/components/team/board";
import { boardDirectors, boardAdvisors } from "@/lib/boardData";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Fostering creativity and cutting-edge solutions to real-world problems"
  },
  {
    icon: Users,
    title: "Community", 
    description: "Building a supportive ecosystem of entrepreneurs, mentors, and partners"
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Maintaining the highest standards in all our programs and initiatives"
  },
  {
    icon: Award,
    title: "Impact",
    description: "Creating meaningful change in society through entrepreneurship"
  }
];

const timeline = [
  { year: "2007", event: "Gujarat Technological University established" },
  { year: "2015", event: "First startup incubation programs launched" },
  { year: "2018", event: "100+ startups milestone achieved" },
  { year: "2020", event: "Digital transformation initiatives" },
  { year: "2023", event: "GTU Ventures officially launched" },
  { year: "2024", event: "730+ startups supported, ₹21.17cr funding disbursed" }
];

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gtu-base to-gtu-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-hero font-extrabold text-foreground mb-6">
              About GTU Ventures
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Empowering Gujarat's entrepreneurial ecosystem through innovation, 
              education, and strategic partnerships since 2007.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-display font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                To create a thriving startup ecosystem that transforms innovative ideas 
                into successful businesses, contributing to Gujarat's economic growth and 
                supporting India's vision of becoming a global innovation hub.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We are committed to providing comprehensive support to student entrepreneurs, 
                from ideation to market success, through our integrated programs and 
                extensive network of mentors and partners.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-display font-bold text-foreground mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                To be recognized as India's leading university-based startup ecosystem, 
                nurturing the next generation of entrepreneurs who will shape the future 
                of technology and innovation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We envision a future where every student with an entrepreneurial spirit 
                has access to the resources, mentorship, and opportunities needed to 
                build impactful businesses that solve real-world challenges.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display font-bold text-foreground mb-6">Our Objectives</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key goals driving our initiatives and programs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="text-center h-full hover-lift">
                <CardContent className="p-8">
                  <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-6">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Foster Innovation
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Support cutting-edge research and development in emerging technologies, 
                    enabling students to create solutions for global challenges.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="text-center h-full hover-lift">
                <CardContent className="p-8">
                  <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-6">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Build Community
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Create a collaborative ecosystem connecting students, faculty, industry 
                    partners, and investors to accelerate entrepreneurial success.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="text-center h-full hover-lift">
                <CardContent className="p-8">
                  <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-6">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Drive Impact
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Generate measurable economic and social impact through job creation, 
                    technology transfer, and sustainable business development.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Message from Director */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display font-bold text-foreground mb-6">Message from Our Director</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-gtu-primary to-gtu-secondary rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">DR</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Dr. Pankajray Patel</h3>
                  <p className="text-gtu-primary font-medium mb-6">Director, GISC & AIC-GISC</p>
                  <blockquote className="text-lg text-muted-foreground leading-relaxed italic mb-6">
                    "At GTU Ventures, we believe that entrepreneurship is not just about starting businesses—it's about solving problems, creating opportunities, and building a better future. Our commitment to nurturing the next generation of innovators stems from the recognition that today's students are tomorrow's job creators and economic drivers. Through our comprehensive ecosystem of support, mentorship, and resources, we empower young minds to turn their ideas into impactful realities that contribute to Gujarat's growth and India's global competitiveness."
                  </blockquote>
                  <p className="text-muted-foreground">
                    With over two decades of experience in academia and innovation management, Dr. Patel leads our mission to bridge the gap between education and entrepreneurship, ensuring that GTU remains at the forefront of India's startup revolution.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Institutional Background */}
      <section className="py-24 bg-gradient-to-br from-gtu-light to-gtu-base">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display font-bold text-foreground mb-6">Institutional Background</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our foundation in Gujarat's premier technological university
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">Gujarat Technological University (GTU)</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Established in 2007, Gujarat Technological University is a premier academic and research institution 
                dedicated to providing quality education and fostering innovation in engineering and technology. 
                As Gujarat's largest technical university, GTU serves over 4 lakh students across 500+ affiliated colleges.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                GTU's mission encompasses academic excellence, industry collaboration, and entrepreneurial development, 
                making it the ideal foundation for GTU Ventures' ecosystem-building initiatives.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">Gujarat Information & Communication Technology (GICT) Society</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The Gujarat Information & Communication Technology Society (GICT Society) is the nodal agency 
                responsible for implementing ICT initiatives across Gujarat. Through its various centers and 
                initiatives, GICT Society drives digital transformation and innovation across the state.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                GTU Ventures operates under the umbrella of GICT Society, leveraging its extensive network, 
                resources, and expertise to create a comprehensive startup ecosystem that benefits the entire 
                Gujarat region.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display font-bold text-foreground mb-6">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do at GTU Ventures
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full hover-lift">
                    <CardContent className="p-8">
                      <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-6">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display font-bold text-foreground mb-6">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key milestones in GTU Ventures' evolution
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>

                  <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <Card className="hover-lift">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-primary mb-2">
                          {item.year}
                        </div>
                        <p className="text-foreground font-medium">
                          {item.event}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-display font-bold mb-6">Our Impact Today</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              The numbers that reflect our commitment to fostering innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold mb-2">730+</div>
              <div className="text-white/80 text-sm uppercase tracking-wide">
                Startups Supported
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold mb-2">₹21.17cr</div>
              <div className="text-white/80 text-sm uppercase tracking-wide">
                Funding Disbursed
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold mb-2">4,100+</div>
              <div className="text-white/80 text-sm uppercase tracking-wide">
                Jobs Created
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold mb-2">273</div>
              <div className="text-white/80 text-sm uppercase tracking-wide">
                Mentors Engaged
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Board of Directors & Advisors */}
      <BoardSection directors={boardDirectors} advisors={boardAdvisors} />
    </div>
  );
}
