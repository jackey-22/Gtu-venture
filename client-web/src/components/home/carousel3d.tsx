import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

const carouselItems: CarouselItem[] = [
  {
    id: 0,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Innovation Workspace",
    description: "Modern facilities for startup growth",
  },
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Student Entrepreneurs",
    description: "4,30,000 students sensitised",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Tech Innovation",
    description: "Cutting-edge solutions",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Startup Pitches",
    description: "3,578 projects approved",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    title: "Mentorship",
    description: "273 mentors engaged",
  },
];

export default function Carousel3D() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  const totalItems = carouselItems.length;

  const getItemPosition = (index: number) => {
    const diff = (index - currentIndex + totalItems) % totalItems;

    if (diff === 0) return "active";
    if (diff === 1 || diff === totalItems - 4) return "next";
    if (diff === totalItems - 1 || diff === 4) return "prev";
    if (diff === 2 || diff === totalItems - 3) return "far-next";
    if (diff === totalItems - 2 || diff === 3) return "far-prev";

    return "hidden";
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay with proper typing for browser setInterval id
  useEffect(() => {
    if (!isPaused) {
      // window.setInterval returns a number in browser
      intervalRef.current = window.setInterval(() => {
        nextSlide();
      }, 3000) as unknown as number;
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current as number);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    // Outer section with spacing so it doesn't overlap hero/other sections
    <section className="w-full flex justify-center py-8">
      <div className="w-full max-w-4xl px-4">
        {/* ensure carousel has enough top spacing so it doesn't overlap the hero */}
        <div className="relative pt-12 md:pt-16 lg:pt-20">
          {/* allow carousel transforms to overflow so full 3D effect is visible */}
          <div
            className="carousel-3d w-full h-56 md:h-72 lg:h-80 overflow-visible relative z-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-roledescription="carousel"
          >
            <div className="carousel-container">
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className={`carousel-item ${getItemPosition(index)}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${totalItems} - ${item.title}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-2xl"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4 rounded-2xl">
                <div className="text-white">
                  <h3 className="text-sm md:text-lg font-semibold">{item.title}</h3>
                  <p className="text-xs md:text-sm opacity-90">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
            </div>

            <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            className="carousel-btn"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="text-primary text-xl p-2 bg-white rounded-full shadow w-10 h-10 hover:bg-primary hover:text-white transition-colors" />
          </button>

          <div className="flex space-x-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex ? "bg-gtu-primary" : "bg-gray-300"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            className="carousel-btn"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="text-primary text-xl p-2 bg-white rounded-full shadow w-10 h-10 hover:bg-primary hover:text-white transition-colors" />
          </button>
            </div>
          </div>

          {/* removed CTA per request; keep a small spacer so the next section doesn't overlap */}
          <div className="h-6 md:h-8 lg:h-10" />
        </div>
      </div>
    </section>
  );
}
