import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { fetchPost } from "@/utils/fetch.utils";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetchPost({
        pathName: 'user/subscribe-newsletter',
        body: JSON.stringify({ email }),
      });

      if (response?.success) {
        toast({
          title: "Success!",
          description: response.message || "You've been subscribed to our newsletter.",
        });
        setEmail("");
      } else {
        toast({
          title: "Error",
          description: response?.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-[clamp(3rem,8vw,6rem)] bg-gradient-to-br from-primary to-secondary text-white overflow-hidden" data-testid="newsletter">
      <div className="max-w-4xl mx-auto px-[clamp(1rem,4vw,4rem)] text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-bold mb-[clamp(1rem,3vw,1.5rem)]" style={{ fontSize: 'clamp(1.75rem, 4vw + 0.5rem, 3rem)' }}>Stay in the Loop</h2>
          <p className="text-white/90 mb-[clamp(2rem,5vw,3rem)] max-w-2xl mx-auto" style={{ fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1.25rem)' }}>
            Get the latest updates on programs, events, and startup success
            stories delivered to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-[clamp(0.75rem,2vw,1rem)] max-w-md mx-auto"
            data-testid="newsletter-form"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-[clamp(1rem,3vw,1.5rem)] py-[clamp(0.75rem,2vw,1rem)] rounded-full text-foreground bg-white/95 placeholder-gray-500 border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
              style={{ fontSize: 'clamp(0.875rem, 1.2vw + 0.25rem, 1rem)' }}
              data-testid="newsletter-email-input"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-white text-primary px-[clamp(1.5rem,4vw,2rem)] py-[clamp(0.75rem,2vw,1rem)] rounded-full font-semibold hover:bg-white/90 transition-colors whitespace-nowrap disabled:opacity-50 w-full sm:w-auto"
              style={{ fontSize: 'clamp(0.875rem, 1.2vw + 0.25rem, 1rem)' }}
              data-testid="newsletter-submit-button"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          <p className="text-white/70 mt-[clamp(0.75rem,2vw,1rem)]" style={{ fontSize: 'clamp(0.75rem, 1vw + 0.25rem, 0.875rem)' }}>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
