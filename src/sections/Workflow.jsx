import {
  Bot,
  CheckCircle2,
  Figma,
  MessageSquareText,
  PenTool,
  Video,
} from "lucide-react";

const workflowSteps = [
  {
    icon: MessageSquareText,
    title: "Brief sharpening",
    description:
      "I use ChatGPT to pressure-test briefs, organize messaging, and map content options before the visual direction is locked.",
  },
  {
    icon: Figma,
    title: "Design exploration",
    description:
      "Figma stays as the main design space for layouts, systems, prototypes, and the manual craft decisions that make work feel finished.",
  },
  {
    icon: Bot,
    title: "Build support",
    description:
      "Codex helps me move faster on responsive components, cleanup, and implementation checks while I keep ownership of the final experience.",
  },
  {
    icon: Video,
    title: "Content production",
    description:
      "Tools like HeyGen support quick presenter or motion drafts when a campaign needs video options, timing tests, or stakeholder previews.",
  },
];

const toolTags = ["Codex", "ChatGPT", "HeyGen", "Figma", "Adobe Creative Cloud", "Manual QA"];
const workflowBeamDuration = 8;
const workflowBeamDelay = workflowBeamDuration / workflowSteps.length;

export const Workflow = () => {
  return (
    <section id="workflow" className="relative overflow-hidden py-18 sm:py-22">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-xl">
            <span className="text-sm font-medium uppercase tracking-wider text-secondary-foreground">
              AI-Assisted Workflow
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-secondary-foreground md:text-4xl">
              Faster production,
              <span className="font-serif font-normal text-white">
                {" "}
                still led by design judgment.
              </span>
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              I use AI as a practical support layer for research, content structure, prototypes, and production checks. The final direction, hierarchy, visual polish, and brand decisions stay hands-on.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {toolTags.map((tool) => (
                <span
                  className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  key={tool}
                >
                  {tool}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border/70 bg-surface/40 p-4">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                Recruiter takeaway: I can collaborate with modern AI tools without losing the standards, taste, and production discipline expected from a senior designer.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {workflowSteps.map((step, index) => (
              <article
                className="about-highlight-card glass rounded-2xl p-5"
                key={step.title}
                style={{
                  "--about-card-beam-delay": `${index * workflowBeamDelay}s`,
                  "--about-card-beam-duration": `${workflowBeamDuration}s`,
                  animationDelay: `${(index + 1) * 90}ms`,
                }}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <PenTool
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 right-8 h-28 w-28 rotate-12 text-primary/[0.03]"
      />
    </section>
  );
};
