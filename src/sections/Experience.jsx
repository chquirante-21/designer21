import { BriefcaseBusiness, CalendarDays } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    period: "May 2019 — March 2026",
    role: "Senior Web and Graphic Designer",
    company: "Tri7 Solutions Inc. LTD",
    description:
      "Led digital design work across website layouts, campaign graphics, brand assets, UI/UX support, and motion/video creative. Balanced visual direction with hands-on production so marketing and product materials stayed polished, consistent, and ready for launch.",
    technologies: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "Adobe After Effects", "Adobe Premiere Pro", "Responsive Design"],
    current: false,
  },
  {
    period: "Aug 2016 — April 2019",
    role: "Web Designer",
    company: "Walo Group Information Technologies Inc.",
    description:
      "Designed responsive websites and supporting digital visuals with a focus on clean hierarchy, usability, and brand presentation. Worked across Adobe tools, Figma, HTML, and CSS to bridge design intent with practical web execution.",
    technologies: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "Adobe After Effects", "Adobe Premiere Pro", "HTML", "CSS"],
    current: false,
  },
  {
    period: "Dec 2013 - June 2016",
    role: "Web and Graphic Designer",
    company: "E-Fox Solutions Inc.",
    description:
      "Created web graphics, page layouts, brand materials, and marketing creatives for digital use. Built a strong foundation in translating business needs into clear visual concepts and production-ready assets.",
    technologies: ["Adobe Photoshop", "Adobe Illustrator"],
    current: false,
  },
  {
    period: "June 2013 - Dec 2013",
    role: "Web Designer",
    company: "Webxpress Incorporated",
    description:
      "Supported custom website projects from visual layout through delivery, producing clean page designs and assets for small business and startup clients.",
    technologies: ["Adobe Photoshop", "Adobe Illustrator", "WordPress", "Bootstrap"],
    current: false,
  },
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const Experience = () => {
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);
  const [timelineProgress, setTimelineProgress] = useState(() =>
    prefersReducedMotion() ? 1 : 0,
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealedItems, setRevealedItems] = useState(() =>
    experiences.map(() => prefersReducedMotion()),
  );

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotionQuery.matches) {
      return undefined;
    }

    let frameId;

    const updateTimeline = () => {
      const timeline = timelineRef.current;

      if (!timeline) return;

      const timelineRect = timeline.getBoundingClientRect();
      const viewportAnchor = window.innerHeight * 0.48;
      const nextProgress = clamp(
        (viewportAnchor - timelineRect.top) / Math.max(timelineRect.height, 1),
        0,
        1,
      );

      setTimelineProgress((currentProgress) =>
        Math.abs(currentProgress - nextProgress) > 0.003
          ? nextProgress
          : currentProgress,
      );

      const closestIndex = itemRefs.current.reduce(
        (closest, item, index) => {
          if (!item) return closest;

          const itemRect = item.getBoundingClientRect();
          const dotY = itemRect.top + 40;
          const distance = Math.abs(dotY - viewportAnchor);

          return distance < closest.distance ? { distance, index } : closest;
        },
        { distance: Number.POSITIVE_INFINITY, index: 0 },
      ).index;

      setActiveIndex((currentIndex) =>
        currentIndex === closestIndex ? currentIndex : closestIndex,
      );

      setRevealedItems((currentItems) => {
        let hasChange = false;
        const nextItems = [...currentItems];

        itemRefs.current.forEach((item, index) => {
          if (!item || nextItems[index]) return;

          const itemRect = item.getBoundingClientRect();
          const shouldReveal =
            itemRect.top < window.innerHeight * 0.92 && itemRect.bottom > 0;

          if (shouldReveal) {
            nextItems[index] = true;
            hasChange = true;
          }
        });

        return hasChange ? nextItems : currentItems;
      });
    };

    const requestTimelineUpdate = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateTimeline);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        setRevealedItems((currentItems) => {
          let hasChange = false;
          const nextItems = [...currentItems];

          entries.forEach((entry) => {
            const index = Number(entry.target.getAttribute("data-index"));

            if (entry.isIntersecting && !nextItems[index]) {
              nextItems[index] = true;
              hasChange = true;
            }
          });

          return hasChange ? nextItems : currentItems;
        });
      },
      {
        rootMargin: "-12% 0px -18% 0px",
        threshold: 0.25,
      },
    );

    itemRefs.current.forEach((item) => {
      if (item) revealObserver.observe(item);
    });

    requestTimelineUpdate();
    window.addEventListener("scroll", requestTimelineUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestTimelineUpdate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      revealObserver.disconnect();
      window.removeEventListener("scroll", requestTimelineUpdate);
      window.removeEventListener("resize", requestTimelineUpdate);
    };
  }, []);

  const progressHeight = `${Math.round(timelineProgress * 1000) / 10}%`;

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/4 w-96
       h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <span
            className="text-secondary-foreground text-sm
           font-medium tracking-wider uppercase animate-fade-in"
          >
            Career Journey
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold
           mt-4 mb-6 animate-fade-in animation-delay-100
            text-secondary-foreground"
          >
            Experience that{" "}
            <span className="font-serif font-normal text-white">
              {" "}
              speaks volumes.
            </span>
          </h2>

          <p
            className="text-muted-foreground
           animate-fade-in animation-delay-200"
          >
            A career built across graphic design, campaign creative, responsive
            web design, UI support, motion, and production-ready digital assets.
          </p>
        </div>

        {/* Timeline */}
        <ol
          ref={timelineRef}
          aria-label="Professional experience timeline"
          className="experience-timeline relative mx-auto max-w-6xl pb-8"
        >
          <div
            aria-hidden="true"
            className="experience-timeline-track absolute bottom-10 left-5 top-10 md:left-1/2"
          >
            <span
              className="experience-timeline-progress"
              style={{ height: progressHeight }}
            >
              <span className="experience-timeline-orb" />
            </span>
          </div>

          {experiences.map((exp, idx) => {
            const isLeftAligned = idx % 2 === 0;
            const isActive = idx === activeIndex;
            const isPassed = idx <= activeIndex;
            const isRevealed = revealedItems[idx];

            return (
              <li
                key={`${exp.company}-${exp.period}`}
                ref={(element) => {
                  itemRefs.current[idx] = element;
                }}
                data-index={idx}
                className={`experience-timeline-item relative flex pb-16 last:pb-0 md:pb-24 ${
                  isLeftAligned ? "md:justify-start" : "md:justify-end"
                }`}
              >
                <div
                  aria-hidden="true"
                  className={`experience-timeline-dot absolute left-5 top-10 z-20 md:left-1/2 ${
                    isPassed ? "is-passed" : ""
                  } ${isActive ? "is-active" : ""}`}
                >
                  <span />
                </div>

                <article
                  className={`experience-timeline-card glass relative ml-12 w-[calc(100%-3rem)] rounded-2xl border border-primary/20 p-5 shadow-xl shadow-black/20 md:ml-0 md:w-[calc(50%-3.5rem)] md:p-6 ${
                    isLeftAligned
                      ? "experience-timeline-card-left"
                      : "experience-timeline-card-right"
                  } ${isRevealed ? "is-visible" : ""} ${
                    isActive ? "is-active" : ""
                  }`}
                >
                  <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary">
                    <CalendarDays className="h-4 w-4" />
                    <span>{exp.period}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-white md:text-2xl">
                    {exp.role}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                    <BriefcaseBusiness className="h-4 w-4 text-primary/80" />
                    <p>{exp.company}</p>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {exp.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border/70 bg-surface/80 px-3 py-1 text-xs text-muted-foreground transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
