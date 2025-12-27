import { useState, useEffect } from "react";
import { ArrowRight, ExternalLink, FileText, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useContactModal } from "@/contexts/ContactModalContext";
import { useIsMobile } from "@/hooks/use-mobile";
import TechSpecsModal from "@/components/TechSpecsModal";
import { fetchTemplates, ProjectTemplate } from "@/lib/api";
import projectImage1 from "@/assets/project-dashboard-1.png";
import projectImage2 from "@/assets/project-dashboard-2.png";
import projectImage3 from "@/assets/project-dashboard-3.png";

// Fallback images for templates without image_url
const fallbackImages = [projectImage1, projectImage2, projectImage3];

// Items per page
const ITEMS_PER_PAGE = 8;

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-secondary/20 text-secondary border-secondary/30";
    case "Intermediate":
      return "bg-primary/20 text-primary border-primary/30";
    case "Advanced":
      return "bg-accent/20 text-accent border-accent/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const ProjectIdeas = () => {
  const { openModal } = useContactModal();
  const isMobile = useIsMobile();
  const [templates, setTemplates] = useState<ProjectTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [modalProject, setModalProject] = useState<ProjectTemplate | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch templates on mount
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const data = await fetchTemplates();
        setTemplates(data);
      } catch (error) {
        console.error("Failed to load templates:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTemplates();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(templates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTemplates = templates.slice(startIndex, endIndex);

  // Handle page change
  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of grid
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Helper to get image for a template
  const getTemplateImage = (template: ProjectTemplate, index: number): string => {
    return template.image_url || fallbackImages[index % fallbackImages.length];
  };

  const handleTechSpecsClick = (project: ProjectTemplate) => {
    if (isMobile) {
      setExpandedCardId(expandedCardId === project.id ? null : project.id);
    } else {
      setModalProject(project);
    }
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 text-sm"
            >
              ← Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Explore <span className="text-gradient">Ready-to-Build</span> Project Templates
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Browse our curated collection of final year project ideas. Each template comes with
              complete documentation, modern tech stack, and deployment-ready code.
            </p>
          </div>
        </div>
      </section>

      {/* Filters/Stats Bar */}
      <section className="pb-8 sm:pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="glass-card rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-primary">{templates.length || '—'}</div>
                <div className="text-xs text-muted-foreground">Templates</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-secondary">15+</div>
                <div className="text-xs text-muted-foreground">Technologies</div>
              </div>
              <div className="w-px h-8 bg-border hidden sm:block" />
              <div className="text-center hidden sm:block">
                <div className="text-xl sm:text-2xl font-bold text-foreground">100%</div>
                <div className="text-xs text-muted-foreground">Customizable</div>
              </div>
            </div>
            <Button variant="glow" className="min-h-[44px] w-full sm:w-auto" onClick={openModal}>
              Request Custom Project
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-8 sm:pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-pulse text-muted-foreground">Loading templates...</div>
            </div>
          ) : templates.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No templates available yet. Check back soon!
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentTemplates.map((project, index) => {
                  const isExpanded = expandedCardId === project.id;
                  const absoluteIndex = startIndex + index;

                  return (
                    <Card
                      key={project.id}
                      className="group glass-card overflow-hidden hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col"
                    >
                      {/* Image Container - 16:9 aspect ratio */}
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={getTemplateImage(project, absoluteIndex)}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(project.difficulty)}`}>
                            {project.difficulty}
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-4 sm:p-5 flex flex-col flex-grow">
                        <h3 className="text-base sm:text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {project.title}
                        </h3>

                        {/* Description - truncated by default, full on mobile expand */}
                        <p className={`text-muted-foreground text-sm mb-4 transition-all duration-300 ${isMobile && isExpanded ? '' : 'line-clamp-2'
                          }`}>
                          {project.description}
                        </p>

                        {/* Tech Tags - limited by default, all on mobile expand */}
                        <div className={`flex flex-wrap gap-1.5 mb-4 items-start transition-all duration-300 ${isMobile && isExpanded ? '' : 'flex-grow'
                          }`}>
                          {(isMobile && isExpanded ? project.tags : project.tags.slice(0, 3)).map((tag) => (
                            <span key={tag} className="tech-badge text-xs">
                              {tag}
                            </span>
                          ))}
                          {!isMobile && project.tags.length > 3 && (
                            <span className="tech-badge text-xs">+{project.tags.length - 3}</span>
                          )}
                          {isMobile && !isExpanded && project.tags.length > 3 && (
                            <span className="tech-badge text-xs">+{project.tags.length - 3}</span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            variant="glow"
                            size="sm"
                            className="flex-1 gap-2 min-h-[40px]"
                            onClick={() => project.live_preview_url && window.open(project.live_preview_url, '_blank')}
                          >
                            <ExternalLink size={14} />
                            Live Preview
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-2 min-h-[40px] border-border hover:bg-muted/50"
                            onClick={() => handleTechSpecsClick(project)}
                          >
                            {isMobile && isExpanded ? (
                              <>
                                <ChevronUp size={14} />
                                Show Less
                              </>
                            ) : (
                              <>
                                <FileText size={14} />
                                Tech Specs
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  {/* Previous Button */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-10 w-10"
                  >
                    <ChevronLeft size={18} />
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                      page === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">...</span>
                      ) : (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="icon"
                          onClick={() => goToPage(page as number)}
                          className={`h-10 w-10 ${currentPage === page ? 'bg-primary text-primary-foreground' : ''}`}
                        >
                          {page}
                        </Button>
                      )
                    ))}
                  </div>

                  {/* Next Button */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-10 w-10"
                  >
                    <ChevronRight size={18} />
                  </Button>
                </div>
              )}

              {/* Page Info */}
              {totalPages > 1 && (
                <div className="text-center mt-4 text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, templates.length)} of {templates.length} templates
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="glass-card rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Don't see what you're looking for?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Our team specializes in custom projects. Share your unique idea and we'll bring it to life.
            </p>
            <div className="flex justify-center">
              <Button variant="glow" size="lg" className="gap-2 min-h-[44px]" onClick={openModal}>
                Discuss Your Idea
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Tech Specs Modal for Desktop/Tablet */}
      <TechSpecsModal
        project={modalProject}
        isOpen={!!modalProject}
        onClose={() => setModalProject(null)}
        getDifficultyColor={getDifficultyColor}
      />
    </div>
  );
};

export default ProjectIdeas;