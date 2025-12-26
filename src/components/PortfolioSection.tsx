import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useRef } from "react";
import projectImage1 from "@/assets/project-dashboard-1.png";
import projectImage2 from "@/assets/project-dashboard-2.png";
import projectImage3 from "@/assets/project-dashboard-3.png";

const projects = [
  {
    id: 1,
    title: "AI Traffic Management System",
    description: "Real-time traffic analysis using computer vision and machine learning algorithms to optimize urban traffic flow and reduce congestion.",
    image: projectImage1,
    tags: ["Python", "TensorFlow", "OpenCV"],
  },
  {
    id: 2,
    title: "Smart Campus Navigation",
    description: "Indoor navigation application with augmented reality waypoints and comprehensive accessibility features for university campus users.",
    image: projectImage2,
    tags: ["Flutter", "Firebase", "ARCore"],
  },
  {
    id: 3,
    title: "E-Commerce Analytics Platform",
    description: "Full-stack analytics dashboard featuring predictive algorithms for inventory management, sales forecasting and business insights.",
    image: projectImage3,
    tags: ["React", "Django", "PostgreSQL"],
  },
  {
    id: 4,
    title: "Healthcare Appointment System",
    description: "Patient management system with real-time scheduling, automated appointment reminders and secure medical record integration.",
    image: projectImage1,
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 5,
    title: "Smart Inventory Tracker",
    description: "IoT-enabled inventory management solution with barcode scanning, stock alerts and comprehensive analytics dashboard interface.",
    image: projectImage2,
    tags: ["Python", "Flask", "MySQL"],
  },
  {
    id: 6,
    title: "Student Portal System",
    description: "Comprehensive student management platform with grades tracking, attendance monitoring and streamlined course registration system.",
    image: projectImage3,
    tags: ["Java", "Spring Boot", "PostgreSQL"],
  },
];

const PortfolioSection = () => {
  const isMobile = useIsMobile();
  const [cardOrder, setCardOrder] = useState(projects.map((_, i) => i));
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleSwipe = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Move top card to bottom of stack
    setTimeout(() => {
      setCardOrder((prev) => {
        const newOrder = [...prev];
        const first = newOrder.shift()!;
        newOrder.push(first);
        return newOrder;
      });
      setSwipeOffset(0);
      setIsAnimating(false);
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || isAnimating) return;
    const deltaX = e.touches[0].clientX - touchStartRef.current.x;
    setSwipeOffset(deltaX);
  };

  const handleTouchEnd = () => {
    if (Math.abs(swipeOffset) > 80) {
      handleSwipe();
    } else {
      setSwipeOffset(0);
    }
    touchStartRef.current = null;
  };

  return (
    <section id="portfolio" className="py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Our Projects that <span className="text-gradient">brings ideas to reality</span>.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Real projects we've delivered. Each one custom-built with clean code and comprehensive documentation.
          </p>
        </div>
      </div>

      {/* Mobile: Vertical scrollable cards with full content */}
      {isMobile ? (
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="glass-card overflow-hidden min-h-[380px] flex flex-col active:scale-[0.98] transition-transform duration-150 cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end justify-end p-4">
                    <ExternalLink className="text-primary" size={20} />
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold mb-3 text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tech-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* Desktop/Tablet: Marquee scroll */
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee-slow hover:[animation-play-state:paused]">
            {[...projects, ...projects].map((project, index) => (
              <Card
                key={`${project.id}-${index}`}
                className="group glass-card overflow-hidden hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer flex-shrink-0 w-[320px] sm:w-[380px] mx-3 sm:mx-4"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                    <ExternalLink className="text-primary" size={20} />
                  </div>
                </div>

                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tech-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;