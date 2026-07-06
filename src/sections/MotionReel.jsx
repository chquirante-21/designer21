import { ArrowUpRight, Clapperboard, Film, MonitorPlay, Rocket, Video } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { trackEvent } from "@/lib/analytics";

const reelSamples = [
  {
    title: "Short-form video ad",
    src: "/projects/06/Video-Ad-optimized.mp4",
    poster: "/projects/06/gallery-sampleani1.avif",
  },
  {
    title: "Animated UI teaser",
    src: "/projects/06/sampleani1-optimized.mp4",
    poster: "/projects/06/thumb-sampleani1.webp",
  },
];

const motionStrengths = [
  {
    icon: Clapperboard,
    label: "Animated banners",
  },
  {
    icon: MonitorPlay,
    label: "Social teasers",
  },
  {
    icon: Video,
    label: "Video ad concepts",
  },
  {
    icon: Rocket,
    label: "Export-ready motion assets",
  },
];

export const MotionReel = () => {
  return (
    <section id="reel" className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="max-w-xl">
            <span className="text-sm font-medium uppercase tracking-wider text-secondary-foreground">
              Motion Reel
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-secondary-foreground md:text-4xl">
              Motion graphics and video ads
              <span className="font-serif font-normal text-white">
                {" "}
                built for digital campaigns.
              </span>
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              A quick look at my motion and video direction for campaign assets, launch teasers, and digital ads. I combine After Effects and Premiere Pro with AI-assisted tools like HeyGen and Remotion to explore presenter videos, motion drafts, and production-ready exports.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {motionStrengths.map((strength) => (
                <div
                  className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface/40 p-3"
                  key={strength.label}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <strength.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{strength.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <AnimatedBorderButton
                as="a"
                href="#projects"
                onClick={() => trackEvent("motion_reel_projects_click")}
              >
                View motion project
                <ArrowUpRight className="h-5 w-5" />
              </AnimatedBorderButton>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
            <article className="group relative overflow-hidden rounded-3xl border border-primary/25 bg-card shadow-2xl shadow-primary/10">
              <video
                src={reelSamples[0].src}
                poster={reelSamples[0].poster}
                aria-label={reelSamples[0].title}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Featured
                  </div>
                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {reelSamples[0].title}
                  </h3>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background/80 text-primary backdrop-blur">
                  <Film className="h-5 w-5" />
                </div>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xl shadow-black/20 sm:min-h-full">
              <video
                src={reelSamples[1].src}
                poster={reelSamples[1].poster}
                aria-label={reelSamples[1].title}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:aspect-auto"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/85 via-background/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary backdrop-blur">
                  <Video className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  {reelSamples[1].title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-white/65">
                  Interface motion for animated product and campaign previews.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
