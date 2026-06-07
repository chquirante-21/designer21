import { Code2, Lightbulb, Paintbrush, Rocket, TabletSmartphone, Users } from "lucide-react";

const aboutParagraphs = [
  "I’m a creative Web, Graphic and UI/UX Designer with years of experience crafting modern digital experiences that are both visually engaging and user-focused. My passion for design started from a strong interest in creativity and how impactful visuals can shape user interaction and brand identity.",
  "I specialize in UI/UX design, digital creatives, responsive web design, and branding, creating everything from sleek website interfaces to high-converting marketing materials and social media campaigns. My approach blends clean aesthetics, usability, and strategic design thinking to deliver impactful and memorable experiences.",
  "Beyond design, I enjoy exploring new creative trends, improving my frontend design skills, and continuously learning modern tools and technologies that help bring ideas to life.",
];
const aboutAnimationSeconds = 8;
const aboutParagraphDelay = aboutAnimationSeconds / aboutParagraphs.length;
const aboutCardBeamDelay = aboutAnimationSeconds / 6;

const highlights = [
  {
    icon: Paintbrush,
    title: "Minimal & Modern Design",
    description:
      "Creating timeless, user-centered designs that are visually engaging, scalable, and built to leave a lasting impact.",
  },
  {
    icon: TabletSmartphone,
    title: "Responsive Web Design",
    description:
      "Creating responsive, user-focused designs that adapt seamlessly across all devices while delivering clean, engaging, and visually impactful digital experiences.",
  },
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "Building clean, organized, and scalable code that ensures long-term performance, maintainability, and seamless user experiences.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Optimizing performance to deliver fast, smooth, and seamless digital experiences across all devices.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Collaborating with teams to transform ideas into engaging, user-focused digital experiences.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Driven by innovation through modern design and creative solutions.",
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
              Building the future,
              <span className="font-serif font-normal italic text-white">
                {" "}
                one component at a time.
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
                "My mission is to craft digital experiences that are not only functional and visually engaging, but also intuitive, user-friendly,
                and memorable - creating designs that users enjoy interacting with and brands are proud to showcase."
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
