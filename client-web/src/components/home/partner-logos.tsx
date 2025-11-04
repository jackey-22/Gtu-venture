import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchGet } from "@/utils/fetch.utils";

export default function PartnerLogos() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetchGet({ pathName: 'user/get-partners' });
        if (response?.success && response?.data) {
          // Filter for partners with category 'funding' or similar
          const fundingPartners = response.data.filter((p: any) => 
            p.category === 'funding' || p.category === 'csr'
          ).slice(0, 5); // Limit to 5 partners
          setPartners(fundingPartners);
        } else {
          // Fallback to default partners
          setPartners([
            { name: "MSME", logo: "/incubators/MSME.png" },
            { name: "Nodal Institute", logo: "/incubators/Nodalinstitute.png" },
            { name: "SISFS", logo: "/incubators/SISFS.png" },
            { name: "SSIP", logo: "/incubators/ssip-.png" },
            { name: "Atal Innovation Mission", logo: "/incubators/aim.png" },
          ]);
        }
      } catch (error) {
        console.error('Error fetching partners:', error);
        setPartners([
          { name: "MSME", logo: "/incubators/MSME.png" },
          { name: "Nodal Institute", logo: "/incubators/Nodalinstitute.png" },
          { name: "SISFS", logo: "/incubators/SISFS.png" },
          { name: "SSIP", logo: "/incubators/ssip-.png" },
          { name: "Atal Innovation Mission", logo: "/incubators/aim.png" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading || partners.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted" data-testid="partner-logos">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-12"
        >
          Grant & Funding Support
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex justify-center"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={partner.logo}
                alt={partner.name}
                className="h-16 w-auto logo-hover"
                data-testid={`partner-logo-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
