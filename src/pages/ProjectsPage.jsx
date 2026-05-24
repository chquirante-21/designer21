import { projectRows } from "@/data/projects";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

const pageDots = Array.from({ length: 34 }, (_, index) => ({
  id: `project-dot-${index}`,
  left: `${(index * 31 + 7) % 100}%`,
  top: `${(index * 43 + 13) % 100}%`,
  duration: `${18 + (index % 7) * 2}s`,
  delay: `${(index % 8) * 0.35}s`,
  opacity: 0.2 + (index % 5) * 0.06,
}));

const projectShelves = (() => {
  const anchoredProjects = new Set();

  return projectRows.map((row) => ({
    ...row,
    projects: row.projects.map((project) => {
      const shouldAnchor = !anchoredProjects.has(project.id);
      anchoredProjects.add(project.id);

      return {
        project,
        shouldAnchor,
      };
    }),
  }));
})();

const ProjectTile = ({ project, onDetails, shouldAnchor }) => {
  const [previewStyle, setPreviewStyle] = useState(null);

  const handlePreviewOpen = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const viewportPadding = 24;
    const width = Math.min(window.innerWidth - viewportPadding * 2, 500);
    const estimatedHeight = width * 0.5625 + 128;
    const maxTop = Math.max(
      viewportPadding,
      window.innerHeight - estimatedHeight - viewportPadding,
    );
    const top = Math.min(Math.max(rect.top - 28, 76), maxTop);
    const left = Math.min(
      Math.max(rect.left, viewportPadding),
      window.innerWidth - width - viewportPadding,
    );

    setPreviewStyle({
      left,
      top,
      width,
    });
  };

  const handlePreviewClose = (event) => {
    if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget)) {
      return;
    }

    setPreviewStyle(null);
  };

  return (
    <article
      id={shouldAnchor ? project.id : undefined}
      onFocus={handlePreviewOpen}
      onMouseEnter={handlePreviewOpen}
      onBlur={handlePreviewClose}
      onMouseLeave={handlePreviewClose}
      className="group/tile relative z-0 h-[min(40vw,203px)] w-[min(72vw,360px)] scroll-mt-32 flex-shrink-0 transition-all duration-300 hover:z-40 focus-within:z-40"
    >
      <div className="h-full overflow-hidden rounded-md bg-[#181818] shadow-2xl shadow-black/30">
        <button
          type="button"
          aria-label={`View ${project.title} in full view`}
          onClick={() => onDetails(project)}
          className="relative block h-full w-full overflow-hidden text-left"
        >
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
          <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white drop-shadow-lg">
            {project.title}
          </h3>
        </button>
      </div>

      {previewStyle ? (
        <FloatingProjectPreview
          preview={{ ...previewStyle, project }}
          onDetails={onDetails}
        />
      ) : null}
    </article>
  );
};

const FloatingProjectPreview = ({ onDetails, preview }) => {
  if (!preview) {
    return null;
  }

  const { project } = preview;

  return (
    <div
      className="fixed z-[70] overflow-hidden rounded-md bg-[#181818] shadow-2xl shadow-black/70"
      style={{
        left: `${preview.left}px`,
        top: `${preview.top}px`,
        width: `${preview.width}px`,
      }}
    >
      <button
        type="button"
        aria-label={`View ${project.title} in full view`}
        onClick={() => onDetails(project)}
        className="relative block w-full overflow-hidden text-left"
      >
        <img
          src={project.image}
          alt={project.title}
          className="aspect-video h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
        <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white drop-shadow-lg">
          {project.title}
        </h3>
      </button>

      <div className="space-y-3 p-4">
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-background/80 px-3 py-1 text-[11px] font-semibold text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectShelf = ({ row, onDetails }) => {
  const rowRef = useRef(null);

  const scrollRow = (direction) => {
    rowRef.current?.scrollBy({
      left: direction * 420,
      behavior: "smooth",
    });
  };

  return (
    <section className="group/shelf relative">
      <h2 className="mb-3 text-xl font-bold md:text-2xl">{row.title}</h2>

      <div className="relative overflow-visible">
        <div
          ref={rowRef}
          className="no-scrollbar flex gap-2 overflow-x-auto pb-12 pt-1 md:gap-3 md:pb-14"
        >
          {row.projects.map(({ project, shouldAnchor }) => (
            <ProjectTile
              key={project.id}
              project={project}
              onDetails={onDetails}
              shouldAnchor={shouldAnchor}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label={`Scroll ${row.title} left`}
          onClick={() => scrollRow(-1)}
          className="pointer-events-none absolute left-0 top-1 z-50 hidden h-[min(40vw,203px)] w-12 items-center justify-center bg-gradient-to-r from-background/95 via-background/45 to-transparent text-white opacity-0 transition-opacity group-hover/shelf:pointer-events-auto group-hover/shelf:opacity-100 md:flex"
        >
          <span className="flex h-11 w-8 items-center justify-center rounded bg-black/45 backdrop-blur-sm transition-colors hover:bg-primary/90">
            <ChevronLeft className="h-7 w-7" />
          </span>
        </button>
        <button
          type="button"
          aria-label={`Scroll ${row.title} right`}
          onClick={() => scrollRow(1)}
          className="pointer-events-none absolute right-0 top-1 z-50 hidden h-[min(40vw,203px)] w-12 items-center justify-center bg-gradient-to-l from-background/95 via-background/45 to-transparent text-white opacity-0 transition-opacity group-hover/shelf:pointer-events-auto group-hover/shelf:opacity-100 md:flex"
        >
          <span className="flex h-11 w-8 items-center justify-center rounded bg-black/45 backdrop-blur-sm transition-colors hover:bg-primary/90">
            <ChevronRight className="h-7 w-7" />
          </span>
        </button>
      </div>
    </section>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 px-4 py-8 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl">
        <button
          type="button"
          aria-label="Close project details"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-primary"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative min-h-[320px] overflow-hidden md:min-h-[520px]">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-contain bg-background"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-card via-card/80 to-transparent p-6 pt-32 md:p-8 md:pt-40">
            <h2 className="text-3xl font-bold md:text-5xl">{project.title}</h2>
          </div>
        </div>

        <div className="space-y-4 p-5 md:p-6">
          <p className="max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {project.description}
          </p>

          <div>
            <h3 className="mb-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
              Role
            </h3>
            <p className="text-muted-foreground">{project.role}</p>
          </div>

          <div className="max-w-md">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-background">
        <div className="fixed inset-0 -z-10">
          <img
            src="/hero-bg.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/92 to-background" />
        </div>

        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {pageDots.map((dot) => (
            <div
              key={dot.id}
              aria-hidden="true"
              className="absolute h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: "#20B2A6",
                left: dot.left,
                top: dot.top,
                opacity: dot.opacity,
                animation: `slow-drift ${dot.duration} ease-in-out infinite`,
                animationDelay: dot.delay,
              }}
            />
          ))}
        </div>

        <section className="relative z-10 px-4 pb-20 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1500px]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back Home
              </a>
            </div>

            <div className="space-y-0">
              {projectShelves.map((row) => (
                <ProjectShelf
                  key={row.title}
                  row={row}
                  onDetails={setSelectedProject}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};
