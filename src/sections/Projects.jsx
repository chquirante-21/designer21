import { ArrowUpRight, Expand, X } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { projects } from "@/data/projects";
import { useEffect, useState } from "react";

const featuredProjects = projects.slice(0, 4);

const ProjectImageViewer = ({ project, onClose }) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-label={`Full view of ${project.title}`}
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
    >
      <button
        type="button"
        aria-label="Close full image view"
        onClick={onClose}
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-card/90 text-white transition-colors hover:bg-primary"
      >
        <X className="h-5 w-5" />
      </button>

      <div
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-full max-w-full items-center justify-center overflow-hidden rounded-lg bg-black shadow-2xl"
      >
        <img
          src={project.image}
          alt={project.title}
          className="max-h-[calc(100vh-4rem)] max-w-[calc(100vw-2rem)] object-contain md:max-h-[calc(100vh-5rem)] md:max-w-[calc(100vw-5rem)]"
        />
      </div>
    </div>
  );
};

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section id="projects" className="py-32 relative overflow-hidden">
        {/* Bg glows */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mx-auto max-w-3xl mb-16">
            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
              Featured Samples
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
              Samples that
              <span className="font-serif italic font-normal text-white">
                {" "}
                make an impact.
              </span>
            </h2>
            <p className="text-muted-foreground animate-fade-in animation-delay-200">
              From UI/UX design and interactive interfaces to branding and digital creatives,
              these works showcase my ability to turn ideas into impactful and meaningful digital experiences.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
              >
                {/* Image */}
                <button
                  type="button"
                  aria-label={`Open full view of ${project.title}`}
                  onClick={() => setSelectedProject(project)}
                  className="relative block aspect-video w-full overflow-hidden text-left"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-card via-card/25 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-background/75 text-white backdrop-blur transition-colors group-hover:bg-primary">
                      <Expand className="h-6 w-6" />
                    </span>
                  </div>
                </button>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                    />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center mt-12 animate-fade-in animation-delay-500">
            <AnimatedBorderButton as="a" href="https://www.figma.com/design/xH2r0dsSEM0F8i10JQOa0R/Old--Files?node-id=0-1&t=uHdrMCd1CBjsFBmu-1" target="_blank">
              View more samples
              <ArrowUpRight className="w-5 h-5" />
            </AnimatedBorderButton>
          </div>
        </div>
      </section>

      {selectedProject ? (
        <ProjectImageViewer
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}
    </>
  );
};
