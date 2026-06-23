import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { projects } from "@/data/projects";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const featuredProjects = projects.slice(0, 9);
const bentoLayouts = [
  "sm:col-start-1 sm:row-start-1",
  "sm:col-span-2 sm:col-start-2 sm:row-start-1",
  "sm:col-start-4 sm:row-start-1",
  "sm:col-start-1 sm:row-span-2 sm:row-start-2 lg:row-span-1",
  "col-span-2 row-span-2 sm:col-start-2 sm:row-start-2 lg:row-span-1",
  "sm:col-start-4 sm:row-span-2 sm:row-start-2 lg:row-span-1",
  "sm:col-start-1 sm:row-start-4 lg:row-start-3",
  "sm:col-span-2 sm:col-start-2 sm:row-start-4 lg:row-start-3",
  "sm:col-start-4 sm:row-start-4 lg:row-start-3",
];

const isVideoSource = (src = "") => /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src);

const ProjectMedia = ({
  project,
  className,
  mediaRef,
  preview = false,
  source: sourceOverride,
}) => {
  const source = sourceOverride ?? (preview ? project.image : project.video ?? project.image);

  if (isVideoSource(source)) {
    return (
      <video
        ref={mediaRef}
        src={source}
        aria-label={`${project.title} ${preview ? "preview" : "video"}`}
        autoPlay
        controls={!preview}
        loop
        muted
        playsInline
        preload={preview ? "auto" : "metadata"}
        className={className}
      />
    );
  }

  return (
    <img
      src={source}
      alt={project.title}
      loading={preview ? "lazy" : "eager"}
      decoding="async"
      className={className}
    />
  );
};

const ProjectImageViewer = ({ project, onClose }) => {
  const mediaRef = useRef(null);
  const gallerySources = project.gallery?.length
    ? project.gallery
    : [project.video ?? project.image];
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSource = gallerySources[currentIndex] ?? gallerySources[0];
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < gallerySources.length - 1;

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

  useEffect(() => {
    const media = mediaRef.current;

    if (media instanceof HTMLVideoElement) {
      media.currentTime = 0;
      void media.play().catch(() => {});
    }
  }, [currentSource]);

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
        aria-label="Close full view"
        onClick={onClose}
        autoFocus
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-card/90 text-white transition-colors hover:bg-primary"
      >
        <X className="h-5 w-5" />
      </button>

      <div
        onClick={(event) => event.stopPropagation()}
        className="grid max-h-full w-full max-w-6xl overflow-hidden rounded-xl bg-card shadow-2xl lg:grid-cols-[1fr_320px]"
      >
        <div className="flex min-h-0 items-center justify-center bg-black">
          <ProjectMedia
            project={project}
            mediaRef={mediaRef}
            source={currentSource}
            className="max-h-[calc(100vh-18rem)] max-w-full object-contain sm:max-h-[calc(100vh-15rem)] lg:max-h-[calc(100vh-6rem)]"
          />
        </div>
        <aside className="max-h-[40vh] overflow-y-auto border-t border-border bg-card p-5 lg:max-h-[calc(100vh-4rem)] lg:border-l lg:border-t-0 lg:p-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {project.rating} / {project.year}
          </span>
          <h3 className="mt-3 text-2xl font-bold text-foreground">
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-5 rounded-2xl border border-border/80 bg-surface/60 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Role
            </div>
            <p className="mt-2 text-sm leading-6 text-foreground">{project.role}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </aside>
      </div>

      {gallerySources.length > 1 ? (
        <>
          {canGoPrevious ? (
            <button
              type="button"
              aria-label={`View previous ${project.title} sample`}
              onClick={(event) => {
                event.stopPropagation();
                setCurrentIndex((index) => Math.max(index - 1, 0));
              }}
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-white opacity-50 shadow-xl transition-all hover:bg-primary hover:opacity-100 focus-visible:bg-primary focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:opacity-100 sm:left-5 sm:h-12 sm:w-12"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          ) : null}

          {canGoNext ? (
            <button
              type="button"
              aria-label={`View next ${project.title} sample`}
              onClick={(event) => {
                event.stopPropagation();
                setCurrentIndex((index) =>
                  Math.min(index + 1, gallerySources.length - 1),
                );
              }}
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-white opacity-50 shadow-xl transition-all hover:bg-primary hover:opacity-100 focus-visible:bg-primary focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:opacity-100 sm:right-5 sm:h-12 sm:w-12"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          ) : null}
        </>
      ) : null}
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
              Featured Design Work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
              Brand, campaign, and digital work that
              <span className="font-serif font-normal text-white">
                {" "}
                shows range.
              </span>
            </h2>
            <p className="text-muted-foreground animate-fade-in animation-delay-200">
              The first pieces highlight the graphic design work most relevant to senior design roles: brand systems, campaign kits, banners, motion, and digital assets. UI and web samples follow to show how that visual thinking carries into product and frontend work.
            </p>
          </div>

          {/* Bento Projects Grid */}
          <div className="project-bento-grid grid grid-cols-2 auto-rows-[140px] gap-3 sm:grid-cols-4 sm:auto-rows-[150px] sm:gap-4">
            {featuredProjects.map((project, idx) => {
              const isCenterTile = idx === 4;

              return (
                <div
                  key={project.id}
                  className={`group relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-xl shadow-black/20 animate-fade-in transition-all duration-500 hover:border-primary/70 hover:shadow-2xl hover:shadow-primary/15 focus-within:border-primary/70 focus-within:shadow-2xl focus-within:shadow-primary/15 sm:rounded-3xl ${bentoLayouts[idx]}`}
                  style={{ animationDelay: `${(idx + 1) * 100}ms` }}
                >
                  <button
                    type="button"
                    aria-label={`Open full view of ${project.title}`}
                    onClick={() => {
                      trackEvent("project_open_click", {
                        project: project.title,
                      });
                      setSelectedProject(project);
                    }}
                    className="relative block h-full w-full overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                  >
                    <ProjectMedia
                      project={project}
                      preview
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/10 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-90" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(32,178,166,0.24),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100" />
                    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute right-3 top-3 flex items-center gap-2 text-white/70 sm:right-4 sm:top-4">
                      <span className="text-xs font-semibold tracking-[0.2em]">
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-100 transition-all duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                      <span className={`flex scale-90 items-center justify-center rounded-full border border-white/15 bg-background/75 text-white shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:border-primary/70 group-hover:bg-primary ${
                        isCenterTile ? "h-14 w-14 sm:h-16 sm:w-16" : "h-11 w-11 sm:h-14 sm:w-14"
                      }`}>
                        <Expand className={isCenterTile ? "h-6 w-6 sm:h-7 sm:w-7" : "h-5 w-5 sm:h-6 sm:w-6"} />
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                      <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:block">
                        {project.category}
                      </span>
                      <h3 className={`mt-1 font-semibold text-white drop-shadow-lg transition-colors duration-300 group-hover:text-primary ${
                        isCenterTile ? "text-lg sm:text-2xl" : "text-sm sm:text-base"
                      }`}>
                        {project.title}
                      </h3>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* View All CTA */}
          <div className="text-center mt-12 animate-fade-in animation-delay-500">
            <AnimatedBorderButton
              as="a"
              href="https://www.figma.com/design/xH2r0dsSEM0F8i10JQOa0R/Old-Files?node-id=0-1&t=LYoCjN5Dhoxo0MUv-1"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("view_more_samples_click")}
            >
              View more samples
              <ArrowUpRight className="w-5 h-5" />
            </AnimatedBorderButton>
          </div>
        </div>
      </section>

      {selectedProject ? (
        <ProjectImageViewer
          key={selectedProject.id}
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      ) : null}
    </>
  );
};
