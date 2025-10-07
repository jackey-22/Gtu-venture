import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
  { name: "Programs", href: "/programs" },
  { name: "Startups", href: "/startups" },
  { name: "Events", href: "/events" },
  { name: "Partners", href: "/partners" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show a white/glass navbar when on the home route and at the top (over the hero).
  const onHome = location === "/";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        // Priority: if scrolled use existing glass style, else if on home show white glass, else transparent
        isScrolled
          ? "glass border-b border-border/20"
          : onHome
          ? "bg-white/70 backdrop-blur-sm border-b border-white/10"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0 flex items-center gap-3" data-testid="logo-link">
            {/* Small GTU mark */}
          <img src="/gtulogo.png" alt="GTU" className="h-15 md:h-18 w-auto" />
            {/* Use PNG only for compatibility */}
            <img src="/gtuv.png" alt="GTU Ventures" className="h-14 md:h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  location === item.href
                    ? onHome && !isScrolled
                      ? "text-purple-700"
                      : "text-primary"
                    : onHome && !isScrolled
                    ? "text-gray-800 hover:text-purple-700"
                    : "text-gray-700 hover:text-primary"
                }`}
                data-testid={`nav-link-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center space-x-4">
            <Button
              asChild
              className={`btn-primary bg-primary text-primary-foreground hover:bg-primary/90 ${
                onHome && !isScrolled ? "ring-0" : ""
              }`}
              data-testid="apply-button"
            >
              <a href="/apply">Apply Now</a>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  data-testid="mobile-menu-button"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`text-lg font-medium transition-colors ${
                        location === item.href
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      }`}
                      data-testid={`mobile-nav-link-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button
                    asChild
                    className="mt-6 bg-primary text-primary-foreground"
                  >
                    <a href="/apply" onClick={() => setIsMobileOpen(false)}>
                      Apply Now
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
