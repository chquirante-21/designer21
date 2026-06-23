import { Code2, Lightbulb, Paintbrush, Rocket, TabletSmartphone, Users } from "lucide-react";

const aboutParagraphs = [
  "I’m a Senior Graphic Designer with 10+ years of experience building digital-first creative across brand systems, campaign visuals, web layouts, social assets, motion graphics, and UI/UX support.",
  "My work is strongest where visual direction needs to become usable production: clear layouts, consistent typography, polished image treatment, responsive design, and creative assets that stay cohesive across marketing channels.",
  "Alongside Adobe Creative Cloud and Figma, I bring frontend awareness and AI-assisted workflows that help me move quickly from concept to finished creative while keeping the final output sharp, organized, and brand-ready.",
];
const aboutAnimationSeconds = 8;
const aboutParagraphDelay = aboutAnimationSeconds / aboutParagraphs.length;
const aboutCardBeamDelay = aboutAnimationSeconds / 6;

const highlights = [
  {
    icon: Paintbrush,
    title: "Senior Visual Design",
    description:
      "Creating polished, recruiter-ready brand and campaign visuals with strong hierarchy, typography, and production detail.",
  },
  {
    icon: TabletSmartphone,
    title: "Digital Campaign Systems",
    description:
      "Designing social creatives, banners, launch assets, and landing visuals that feel consistent across every placement.",
  },
  {
    icon: Code2,
    title: "Web & UI Awareness",
    description:
      "Pairing graphic design craft with responsive web, UI, and frontend knowledge so creative ideas translate cleanly on screen.",
  },
  {
    icon: Rocket,
    title: "Production Speed",
    description:
      "Moving from concept to final files with organized workflows, clear asset structure, and careful quality control.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working with stakeholders, developers, and marketing teams to turn briefs into practical, polished creative.",
  },
  {
    icon: Lightbulb,
    title: "Creative Adaptability",
    description: "Blending classic design judgment with current tools, trends, motion, and AI-assisted creative exploration.",
  },
];

export const About = () => {
  return (
    <section id="about" className="relative overflow-hidden py-22">
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="text-sm font-medium uppercase tracking-wider text-secondary-foreground">
                About Me
              </span>
            </div>

            <h2 className="animate-fade-in text-4xl font-bold leading-tight text-secondary-foreground animation-delay-100 md:text-5xl">
              Design craft for brands,
              <span className="font-serif font-normal text-white">
                {" "}
                campaigns, and digital teams.
              </span>
            </h2>

            <div
              className="about-text-rotator animate-fade-in animation-delay-200"
              style={{ "--about-text-duration": `${aboutAnimationSeconds}s` }}
            >
              <p className="sr-only">{aboutParagraphs.join(" ")}</p>
              {aboutParagraphs.map((paragraph, index) => (
                <article
                  aria-hidden="true"
                  className="about-text-slide"
                  key={paragraph}
                  style={{ "--about-text-delay": `${index * aboutParagraphDelay}s` }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-xs font-semibold tracking-[0.2em] text-primary">
                      0{index + 1} / 03
                    </span>
                    <span className="h-px w-10 bg-primary/50" />
                  </div>
                  <p className="leading-7 text-muted-foreground">{paragraph}</p>
                </article>
              ))}
              <div aria-hidden="true" className="about-text-progress-track">
                {aboutParagraphs.map((paragraph, index) => (
                  <span
                    className="about-text-progress"
                    key={paragraph}
                    style={{ "--about-text-delay": `${index * aboutParagraphDelay}s` }}
                  />
                ))}
              </div>
            </div>

            <div className="glass animate-fade-in rounded-2xl p-6 glow-border animation-delay-300">
              <p className="text-lg font-medium italic text-foreground">
                "My goal is to make every visual touchpoint feel intentional, consistent, and ready for the audience it needs to reach."
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
            {highlights.map((item, index) => (
              <div
                className="about-highlight-card glass animate-fade-in rounded-2xl p-6"
                key={item.title}
                style={{
                  "--about-card-beam-delay": `${index * aboutCardBeamDelay}s`,
                  "--about-card-beam-duration": `${aboutAnimationSeconds}s`,
                  animationDelay: `${(index + 1) * 100}ms`,
                }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 hover:bg-primary/20">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
