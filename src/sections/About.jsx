import { Code2, Lightbulb, Rocket, Users, Paintbrush, TabletSmartphone } from "lucide-react";

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
    description:
      "Driven by innovation through modern design and creative solutions.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-22 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                About Me
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
              Building the future,
              <span className="font-serif italic font-normal text-white">
                {" "}
                one component at a time.
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200">
              <p>
                I’m a creative Graphic and UI/UX Designer with years of experience crafting modern digital experiences that are both visually engaging and user-focused. 
                My passion for design started from a strong interest in creativity and how impactful visuals can shape user interaction and brand identity.
              </p>
              <p>
                I specialize in UI/UX design, digital creatives, responsive web design, and branding, creating everything from sleek website interfaces to high-converting marketing materials and social media campaigns. 
                My approach blends clean aesthetics, usability, and strategic design thinking to deliver impactful and memorable experiences.
              </p>
              <p>
                Beyond design, I enjoy exploring new creative trends, improving my frontend design skills, 
                and continuously learning modern tools and technologies that help bring ideas to life.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
              <p className="text-lg font-medium italic text-foreground">
                "My mission is to craft digital experiences that are not only functional and visually engaging, but also intuitive, user-friendly, 
                and memorable - creating designs that users enjoy interacting with and brands are proud to showcase."
              </p>
            </div>
          </div>

          {/* Right Column - Hilights */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-2xl animate-fade-in"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
