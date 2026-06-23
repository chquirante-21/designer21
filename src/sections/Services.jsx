import {
  BadgeCheck,
  Brush,
  Code2,
  Layers3,
  LayoutTemplate,
  Megaphone,
  MonitorSmartphone,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const services = [
  {
    icon: LayoutTemplate,
    title: "Website UI/UX Design",
    description:
      "Landing pages, portfolio sites, dashboards, and product interfaces designed for clarity, trust, and responsive use.",
  },
  {
    icon: Brush,
    title: "Graphic & Campaign Design",
    description:
      "Social media creatives, banners, launch visuals, and digital ads built with consistent direction and polished execution.",
  },
  {
    icon: Layers3,
    title: "Brand Visual Systems",
    description:
      "Reusable visual styles, layouts, and component thinking that help brands look consistent across web and marketing channels.",
  },
  {
    icon: Code2,
    title: "Frontend Implementation",
    description:
      "Responsive React, Tailwind, HTML, and CSS builds that translate design ideas into clean, usable web experiences.",
  },
];

const proofPoints = [
  {
    icon: BadgeCheck,
    value: "10+",
    label: "Years of design experience",
  },
  {
    icon: MonitorSmartphone,
    value: "Web + Creative",
    label: "Design coverage from UI to campaign assets",
  },
  {
    icon: Megaphone,
    value: "Open",
    label: "Available for freelance work and collaborations",
  },
];
const servicesProofBeamDuration = 8;
const servicesProofBeamDelay = servicesProofBeamDuration / proofPoints.length;

export const Services = () => {
  return (
    <section id="services" className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="max-w-xl">
            <span className="text-sm font-medium uppercase tracking-wider text-secondary-foreground">
              Services
            </span>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-secondary-foreground md:text-5xl">
              Design support for{" "}
              <span className="font-serif font-normal text-white">
                brands that need to look ready.
              </span>
            </h2>
            <p className="mt-6 leading-7 text-muted-foreground">
              I can help shape the visual direction, design the interface, produce campaign assets, and support the frontend build so your digital presence feels cohesive from first click to final message.
            </p>
            <div className="mt-8 grid gap-3">
              {proofPoints.map((point, index) => (
                <div
                  className="about-highlight-card flex min-w-0 items-center gap-4 rounded-2xl border border-border/70 bg-surface/40 p-4"
                  key={point.label}
                  style={{
                    "--about-card-beam-delay": `${index * servicesProofBeamDelay}s`,
                    "--about-card-beam-duration": `${servicesProofBeamDuration}s`,
                  }}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <point.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground">{point.value}</div>
                    <div className="text-sm text-muted-foreground">{point.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <article
                className="service-card glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
                key={service.title}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary/25 bg-primary/10 p-5">
          <p className="max-w-2xl text-sm leading-6 text-foreground">
            Need a clearer website, stronger campaign visuals, or a portfolio-ready digital presence?
          </p>
          <a
            href="#contact"
            onClick={() => trackEvent("services_contact_click")}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Start a project
          </a>
        </div>
      </div>
    </section>
  );
};
