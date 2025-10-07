import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Building, Handshake, Globe } from "lucide-react";

const partnerData = {
  funding: [
    {
      id: 1,
      name: "MSME",
      logo: "/incubators/MSME.png",
      description: "Ministry of Micro, Small and Medium Enterprises providing financial and technical support to startups in the MSME sector.",
      website: "https://msme.gov.in",
      type: "Government",
      focus: "MSME Development",
    },
    {
      id: 2,
      name: "Atal Innovation Mission",
      logo: "/incubators/aim.png", 
      description: "Government of India's flagship innovation promotion platform, supporting startup ecosystem through funding and mentorship.",
      website: "https://aim.gov.in",
      type: "Government",
      focus: "Innovation & Technology",
    },
    {
      id: 3,
      name: "SISFS",
      logo: "/incubators/SISFS.png",
      description: "Startup India Seed Fund Scheme providing seed funding and support to student entrepreneurs.",
      website: "https://seedfund.startupindia.gov.in/",
      type: "Government",
      focus: "Student Startups",
    },
    {
      id: 4,
      name: "SSIP",
      logo: "/incubators/ssip-.png",
      description: "Student Startup and Innovation Policy promoting entrepreneurship culture among students in Gujarat.",
      website: "https://www.ssipgujarat.in/",
      type: "State Government",
      focus: "Policy Support",
    },
  ],
  strategic: [
    {
      id: 5,
      name: "Nodal Institute",
      logo: "/incubators/Nodalinstitute.png",
      description: "Central coordinating body facilitating collaboration between academia, industry, and government for innovation.",
      website: "#",
      type: "Institutional",
      focus: "Coordination & Support",
    },
    {
      id: 6,
      name: "TiE Gujarat",
      logo: "/gtuv.png", // Using GTU logo as placeholder for partners without specific logos
      description: "The Indus Entrepreneurs Gujarat chapter, fostering entrepreneurship through mentorship and networking.",
      website: "https://gujarat.tie.org",
      type: "Non-Profit",
      focus: "Mentorship & Networking",
    },
    {
      id: 7,
      name: "NASSCOM",
      logo: "/gtuv.png", // Using GTU logo as placeholder for partners without specific logos
      description: "National Association of Software and Service Companies, supporting tech startups and digital transformation.",
      website: "https://nasscom.in",
      type: "Industry Body",
      focus: "Technology & Software",
    },
  ],
  corporate: [
    {
      id: 8,
      name: "Reliance Industries",
      logo: "/gtuv.png", // Using GTU logo as placeholder for partners without specific logos
      description: "India's largest private sector corporation, partnering for innovation in energy, retail, and digital services.",
      website: "https://ril.com",
      type: "Corporate",
      focus: "Energy & Digital Services",
    },
    {
      id: 9,
      name: "Tata Consultancy Services",
      logo: "/gtuv.png", // Using GTU logo as placeholder for partners without specific logos
      description: "Global IT services and consulting company supporting digital transformation and innovation initiatives.",
      website: "https://tcs.com",
      type: "Corporate",
      focus: "IT Services & Consulting",
    },
    {
      id: 10,
      name: "Adani Group",
      logo: "/gtuv.png", // Using GTU logo as placeholder for partners without specific logos
      description: "Multinational conglomerate supporting infrastructure, energy, and logistics innovation startups.",
      website: "https://adani.com",
      type: "Corporate",
      focus: "Infrastructure & Energy",
    },
  ],
  academic: [
    {
      id: 11,
      name: "Gujarat Technological University",
      logo: "/gtulogo.png", // Using GTU logo for GTU itself
      description: "Leading technical university in Gujarat, collaborating on research, innovation, and entrepreneurship education.",
      website: "https://gtu.ac.in",
      type: "University",
      focus: "Research & Education",
    },
    {
      id: 12,
      name: "Indian Institute of Technology Gandhinagar",
      logo: "/gtuv.png", // Using GTU logo as placeholder for partners without specific logos
      description: "Premier institute of technology fostering innovation and entrepreneurship through cutting-edge research and education.",
      website: "https://iitgn.ac.in",
      type: "Institute",
      focus: "Technology & Innovation",
    },
  ],
  csr: [
    {
      id: 13,
      name: "Tata Trusts",
      logo: "/gtuv.png", // Using GTU logo as placeholder for partners without specific logos
      description: "Philanthropic organization supporting social innovation and sustainable development through CSR initiatives.",
      website: "https://tatatrusts.org",
      type: "CSR",
      focus: "Social Innovation",
    },
    {
      id: 14,
      name: "Adani Foundation",
      logo: "/gtuv.png", // Using GTU logo as placeholder for partners without specific logos
      description: "CSR arm of Adani Group focusing on education, healthcare, and sustainable development initiatives.",
      website: "https://adanifoundation.org",
      type: "CSR",
      focus: "Community Development",
    },
  ],
};

const partnerCategories = [
  { id: "funding", label: "Funding Partners", icon: Building },
  { id: "strategic", label: "Strategic Partners", icon: Handshake },
  { id: "corporate", label: "Corporate Partners", icon: Globe },
  { id: "academic", label: "Academic Partners", icon: Building },
  { id: "csr", label: "CSR Partners", icon: Handshake },
];

export default function Partners() {
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
              Our Partners
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We collaborate with leading organizations, government bodies, and industry leaders 
              to provide comprehensive support to our startup ecosystem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partner Categories */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <Tabs defaultValue="funding" className="w-full">
            <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-5 mb-16">
              {partnerCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger 
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-2"
                    data-testid={`tab-${category.id}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{category.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Funding Partners */}
            <TabsContent value="funding">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-display font-bold text-foreground mb-4">
                    Funding Partners
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Government agencies and institutions providing financial support and grants 
                    to help startups grow and scale their operations.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {partnerData.funding.map((partner, index) => (
                    <motion.div
                      key={partner.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      data-testid={`partner-card-${partner.id}`}
                    >
                      <Card className="h-full hover-lift">
                        <CardContent className="p-8">
                          <div className="flex items-start gap-6 mb-6">
                            <img
                              src={partner.logo}
                              alt={`${partner.name} logo`}
                              className="w-16 h-16 object-contain logo-hover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-bold text-foreground mb-2">
                                {partner.name}
                              </h3>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="secondary">{partner.type}</Badge>
                                <Badge variant="outline">{partner.focus}</Badge>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground leading-relaxed mb-6">
                            {partner.description}
                          </p>

                          {partner.website !== "#" && (
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                              data-testid={`partner-website-${partner.id}`}
                            >
                              <ExternalLink className="w-4 h-4" />
                              Visit Website
                            </a>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Strategic Partners */}
            <TabsContent value="strategic">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-display font-bold text-foreground mb-4">
                    Strategic Partners
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Organizations that provide mentorship, networking opportunities, and 
                    strategic guidance to help startups navigate their growth journey.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {partnerData.strategic.map((partner, index) => (
                    <motion.div
                      key={partner.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      data-testid={`partner-card-${partner.id}`}
                    >
                      <Card className="h-full hover-lift">
                        <CardContent className="p-8">
                          <div className="flex items-start gap-6 mb-6">
                            <img
                              src={partner.logo}
                              alt={`${partner.name} logo`}
                              className="w-16 h-16 object-contain logo-hover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-bold text-foreground mb-2">
                                {partner.name}
                              </h3>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="secondary">{partner.type}</Badge>
                                <Badge variant="outline">{partner.focus}</Badge>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground leading-relaxed mb-6">
                            {partner.description}
                          </p>

                          {partner.website !== "#" && (
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                              data-testid={`partner-website-${partner.id}`}
                            >
                              <ExternalLink className="w-4 h-4" />
                              Visit Website
                            </a>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Corporate Partners */}
            <TabsContent value="corporate">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-display font-bold text-foreground mb-4">
                    Corporate Partners
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Leading corporations that offer industry expertise, market access, and 
                    collaboration opportunities for innovative startups.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {partnerData.corporate.map((partner, index) => (
                    <motion.div
                      key={partner.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      data-testid={`partner-card-${partner.id}`}
                    >
                      <Card className="h-full hover-lift">
                        <CardContent className="p-8">
                          <div className="flex items-start gap-6 mb-6">
                            <img
                              src={partner.logo}
                              alt={`${partner.name} logo`}
                              className="w-16 h-16 object-contain logo-hover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-bold text-foreground mb-2">
                                {partner.name}
                              </h3>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="secondary">{partner.type}</Badge>
                                <Badge variant="outline">{partner.focus}</Badge>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground leading-relaxed mb-6">
                            {partner.description}
                          </p>

                          {partner.website !== "#" && (
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                              data-testid={`partner-website-${partner.id}`}
                            >
                              <ExternalLink className="w-4 h-4" />
                              Visit Website
                            </a>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Academic Partners */}
            <TabsContent value="academic">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-display font-bold text-foreground mb-4">
                    Academic Partners
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Leading academic institutions collaborating on research, education, and 
                    innovation to bridge the gap between academia and industry.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {partnerData.academic.map((partner, index) => (
                    <motion.div
                      key={partner.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      data-testid={`partner-card-${partner.id}`}
                    >
                      <Card className="h-full hover-lift">
                        <CardContent className="p-8">
                          <div className="flex items-start gap-6 mb-6">
                            <img
                              src={partner.logo}
                              alt={`${partner.name} logo`}
                              className="w-16 h-16 object-contain logo-hover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-bold text-foreground mb-2">
                                {partner.name}
                              </h3>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="secondary">{partner.type}</Badge>
                                <Badge variant="outline">{partner.focus}</Badge>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground leading-relaxed mb-6">
                            {partner.description}
                          </p>

                          {partner.website !== "#" && (
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                              data-testid={`partner-website-${partner.id}`}
                            >
                              <ExternalLink className="w-4 h-4" />
                              Visit Website
                            </a>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* CSR Partners */}
            <TabsContent value="csr">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-display font-bold text-foreground mb-4">
                    CSR Partners
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Corporate social responsibility organizations supporting sustainable 
                    development and social innovation initiatives.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {partnerData.csr.map((partner, index) => (
                    <motion.div
                      key={partner.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      data-testid={`partner-card-${partner.id}`}
                    >
                      <Card className="h-full hover-lift">
                        <CardContent className="p-8">
                          <div className="flex items-start gap-6 mb-6">
                            <img
                              src={partner.logo}
                              alt={`${partner.name} logo`}
                              className="w-16 h-16 object-contain logo-hover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-bold text-foreground mb-2">
                                {partner.name}
                              </h3>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="secondary">{partner.type}</Badge>
                                <Badge variant="outline">{partner.focus}</Badge>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground leading-relaxed mb-6">
                            {partner.description}
                          </p>

                          {partner.website !== "#" && (
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                              data-testid={`partner-website-${partner.id}`}
                            >
                              <ExternalLink className="w-4 h-4" />
                              Visit Website
                            </a>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Partnership Benefits */}
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
              Partnership Benefits
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our partnerships provide startups with comprehensive support across all aspects of business growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Financial Support",
                description: "Access to grants, funding opportunities, and investment connections through our partner network.",
                icon: "💰"
              },
              {
                title: "Market Access", 
                description: "Direct connections to potential customers and distribution channels through corporate partnerships.",
                icon: "🌍"
              },
              {
                title: "Mentorship & Guidance",
                description: "Expert guidance from industry leaders and successful entrepreneurs in our partner organizations.",
                icon: "🎯"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-8">
                    <div className="text-4xl mb-6">{benefit.icon}</div>
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="py-24 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-display font-bold mb-6">
              Become a Partner
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our ecosystem and help shape the future of innovation in Gujarat. 
              Partner with us to support the next generation of entrepreneurs.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-colors"
              data-testid="become-partner-cta"
            >
              <Handshake className="w-5 h-5" />
              Partner With Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
