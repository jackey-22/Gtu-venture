import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Zap, Target, Clock, Users, DollarSign } from "lucide-react";
import { programs } from "@/lib/data";

const programIcons = {
  "pre-incubation": Lightbulb,
  "incubation": Zap,
  "acceleration": Target,
};

export default function Programs() {
  const [selectedStage, setSelectedStage] = useState<string>("all");

  const filteredPrograms = selectedStage === "all" 
    ? programs 
    : programs.filter(program => program.stage === selectedStage);

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
              Our Programs
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive support at every stage of your entrepreneurial journey, 
              from idea validation to scaling your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Program Filters */}
      <section className="py-12 bg-background border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={selectedStage === "all" ? "default" : "outline"}
              onClick={() => setSelectedStage("all")}
              data-testid="filter-all"
            >
              All Programs
            </Button>
            <Button
              variant={selectedStage === "early" ? "default" : "outline"}
              onClick={() => setSelectedStage("early")}
              data-testid="filter-early"
            >
              Early Stage
            </Button>
            <Button
              variant={selectedStage === "growth" ? "default" : "outline"}
              onClick={() => setSelectedStage("growth")}
              data-testid="filter-growth"
            >
              Growth Stage
            </Button>
            <Button
              variant={selectedStage === "scale" ? "default" : "outline"}
              onClick={() => setSelectedStage("scale")}
              data-testid="filter-scale"
            >
              Scale Stage
            </Button>
          </div>
        </div>
      </section>

      {/* Program Cards */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program, index) => {
              const Icon = programIcons[program.id as keyof typeof programIcons];
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  data-testid={`program-${program.id}`}
                >
                  <Card className="h-full hover-lift">
                    <CardContent className="p-8">
                      <div className="bg-primary/10 rounded-2xl p-4 w-fit mb-6">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {program.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {program.description}
                      </p>

                      <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {program.duration}
                        </div>
                        <Badge variant="secondary" className="capitalize">
                          {program.stage}
                        </Badge>
                      </div>

                      <Tabs defaultValue="benefits" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="benefits">Benefits</TabsTrigger>
                          <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="benefits" className="mt-4">
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {program.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </TabsContent>
                        
                        <TabsContent value="eligibility" className="mt-4">
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {program.eligibility.map((criterion, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0"></div>
                                {criterion}
                              </li>
                            ))}
                          </ul>
                        </TabsContent>
                      </Tabs>

                      <Button 
                        asChild 
                        className="w-full mt-6 bg-primary text-primary-foreground"
                        data-testid={`apply-${program.id}`}
                      >
                        <a href="/apply">Apply for {program.title}</a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display font-bold text-foreground mb-6">
              Our Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From application to graduation, here's how we support your startup journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Apply", description: "Submit your application with your startup idea" },
              { step: "2", title: "Review", description: "Our team evaluates your application and potential" },
              { step: "3", title: "Program", description: "Join the program and access resources and mentorship" },
              { step: "4", title: "Launch", description: "Graduate with a market-ready business" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Programs */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display font-bold text-foreground mb-6">
              Past Programs & Alumni Network
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Celebrating our successful graduates and the impact they've made in the entrepreneurial ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Completed Cohorts */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">Completed Cohorts</h3>
              <div className="space-y-6">
                {[
                  {
                    year: "2024",
                    startups: 45,
                    funding: "₹12.5cr",
                    highlights: "Highest funding round in GTU Ventures history"
                  },
                  {
                    year: "2023",
                    startups: 38,
                    funding: "₹8.2cr",
                    highlights: "First unicorn startup from our program"
                  },
                  {
                    year: "2022",
                    startups: 32,
                    funding: "₹6.8cr",
                    highlights: "Expanded to 8 new industry sectors"
                  }
                ].map((cohort, index) => (
                  <Card key={cohort.year} className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-foreground">
                          Cohort {cohort.year}
                        </h4>
                        <Badge variant="secondary">{cohort.startups} Startups</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Funding</p>
                          <p className="text-lg font-bold text-success">{cohort.funding}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Success Rate</p>
                          <p className="text-lg font-bold text-primary">87%</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{cohort.highlights}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Alumni Network */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">Alumni Network</h3>
              <div className="space-y-6">
                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-foreground mb-3">Success Stories</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-foreground">AgriTech Solutions</p>
                          <p className="text-sm text-muted-foreground">Raised ₹3cr Series A, serving 10,000+ farmers</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-foreground">EduTech Innovations</p>
                          <p className="text-sm text-muted-foreground">Scaled to 50,000+ users, acquired by major edtech player</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="font-medium text-foreground">FinTech Pro</p>
                          <p className="text-sm text-muted-foreground">₹8cr funding, 500,000+ active users</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-foreground mb-3">Network Benefits</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">150+</div>
                        <div className="text-sm text-muted-foreground">Active Alumni</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">₹35cr+</div>
                        <div className="text-sm text-muted-foreground">Combined Funding</div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Exclusive alumni events & networking</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Mentorship opportunities</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Access to follow-on funding</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>

          {/* Alumni CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Join Our Alumni Network</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Stay connected with fellow entrepreneurs, access exclusive opportunities, and continue your growth journey with our vibrant alumni community.
                </p>
                <Button className="bg-primary text-primary-foreground px-6 py-2">
                  Connect with Alumni
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-display font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join the next generation of successful entrepreneurs. Apply to one of our programs today.
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90"
              data-testid="cta-apply-button"
            >
              <a href="/apply">Apply Now</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
