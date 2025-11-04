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
    <section className="py-24 bg-gradient-to-br from-primary to-secondary text-white" data-testid="newsletter">
      <div className="max-w-4xl mx-auto px-6 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-display font-bold mb-6">Stay in the Loop</h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Get the latest updates on programs, events, and startup success
            stories delivered to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            data-testid="newsletter-form"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-full text-foreground bg-white/95 placeholder-gray-500 border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
              data-testid="newsletter-email-input"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-colors whitespace-nowrap disabled:opacity-50"
              data-testid="newsletter-submit-button"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          <p className="text-sm text-white/70 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
