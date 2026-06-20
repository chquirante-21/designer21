import { Button } from "@/components/Button";
import {
  AlertCircle,
  ArrowUp,
  CheckCircle,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "designer21.misa@gmail.com",
    href: "mailto:designer21.misa@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Cabuyao City, Laguna, Philippines",
  },
];

const availabilityMessages = [
  "Open to new opportunities, freelance projects, and creative collaborations focused on building engaging, modern, and impactful digital experiences.",
];
const contactCardBeamDuration = 8;
const contactCardBeamDelay = contactCardBeamDuration / 6;
const contactEmail = "designer21.misa@gmail.com";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const TypewriterText = ({
  strings,
  typeSpeed = 34,
  deleteSpeed = 18,
  pauseTime = 1800,
}) => {
  const [typewriterState, setTypewriterState] = useState(() => ({
    characterIndex: prefersReducedMotion() ? strings[0].length : 0,
    deleting: false,
    phraseIndex: 0,
  }));

  const currentPhrase = strings[typewriterState.phraseIndex];
  const visibleText = currentPhrase.slice(0, typewriterState.characterIndex);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return undefined;
    }

    const isTyped =
      !typewriterState.deleting &&
      typewriterState.characterIndex === currentPhrase.length;
    const isDeleted =
      typewriterState.deleting && typewriterState.characterIndex === 0;
    const delay = isTyped
      ? pauseTime
      : isDeleted
        ? 450
        : typewriterState.deleting
          ? deleteSpeed
          : typeSpeed;

    const timeout = window.setTimeout(() => {
      setTypewriterState((currentState) => {
        const phrase = strings[currentState.phraseIndex];

        if (!currentState.deleting && currentState.characterIndex < phrase.length) {
          return {
            ...currentState,
            characterIndex: currentState.characterIndex + 1,
          };
        }

        if (!currentState.deleting) {
          return { ...currentState, deleting: true };
        }

        if (currentState.characterIndex > 0) {
          return {
            ...currentState,
            characterIndex: currentState.characterIndex - 1,
          };
        }

        return {
          characterIndex: 0,
          deleting: false,
          phraseIndex: (currentState.phraseIndex + 1) % strings.length,
        };
      });
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [currentPhrase.length, deleteSpeed, pauseTime, strings, typeSpeed, typewriterState]);

  return (
    <div className="contact-typewriter-shell text-sm text-muted-foreground">
      <p className="sr-only">{strings.join(" ")}</p>
      <span aria-hidden="true" className="invisible block">
        {currentPhrase}
      </span>
      <span aria-hidden="true" className="contact-typewriter-text">
        {visibleText}
        <span className="contact-typewriter-cursor" />
      </span>
    </div>
  );
};

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });
    trackEvent("contact_form_submit_attempt");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          sourceUrl: window.location.href,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Message could not be sent. Please email me directly instead.",
        );
      }

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
      trackEvent("contact_form_submit_success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus({
        type: "error",
        message:
          error?.text ||
          error?.message ||
          "Failed to send message. Please try again later.",
      });
      trackEvent("contact_form_submit_error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Get In Touch
          </span>
          <h2 className="mb-4 mt-4 text-3xl font-bold text-secondary-foreground animate-fade-in animation-delay-100 sm:mb-6 sm:text-4xl md:text-5xl">
            Let's build{" "}
            <span className="font-serif italic font-normal text-white">
              something great.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's discuss how we can work together.
          </p>
        </div>
        {/* Contact Info */}
        <div className="mx-auto grid min-w-0 max-w-5xl gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="glass min-w-0 rounded-2xl border border-primary/30 p-5 animate-fade-in animation-delay-300 sm:rounded-3xl sm:p-8">
            <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your name..."
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Your message..."
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>

              <Button
                className="w-full"
                type="submit"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>

              {submitStatus.type && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`flex items-center gap-3
                     p-4 rounded-xl ${
                       submitStatus.type === "success"
                         ? "bg-green-500/10 border border-green-500/20 text-green-400"
                         : "bg-red-500/10 border border-red-500/20 text-red-400"
                     }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              )}
              <p className="text-center text-sm text-muted-foreground">
                Having trouble? Email me directly at{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-medium text-primary hover:text-primary/80"
                >
                  {contactEmail}
                </a>
                .
              </p>
            </form>
          </div>

          {/* Contact Info */}
          <div className="min-w-0 space-y-5 animate-fade-in animation-delay-400 sm:space-y-6">
            <div
              className="contact-beam-card glass min-w-0 rounded-2xl p-5 sm:rounded-3xl sm:p-8"
              style={{
                "--about-card-beam-delay": "0s",
                "--about-card-beam-duration": `${contactCardBeamDuration}s`,
              }}
            >
              <h3 className="mb-5 text-lg font-semibold sm:mb-6 sm:text-xl">
                Contact Information
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((item) => {
                  const Item = item.href ? "a" : "div";

                  return (
                    <Item
                      key={item.label}
                      href={item.href}
                      onClick={
                        item.href
                          ? () => trackEvent("contact_info_click", { label: item.label })
                          : undefined
                      }
                      className={`group flex min-w-0 items-start gap-3 rounded-xl p-2 transition-colors sm:items-center sm:gap-4 sm:p-4 ${
                        item.href ? "hover:bg-surface" : ""
                      }`}
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20 sm:h-12 sm:w-12">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm text-muted-foreground">
                          {item.label}
                        </div>
                        <div className="break-words font-medium [overflow-wrap:anywhere]">
                          {item.value}
                        </div>
                      </div>
                    </Item>
                  );
                })}
              </div>
            </div>

            {/* Availability Card */}
            <div
              className="contact-beam-card glass min-w-0 rounded-2xl border border-primary/30 p-5 sm:rounded-3xl sm:p-8"
              style={{
                "--about-card-beam-delay": `${contactCardBeamDelay}s`,
                "--about-card-beam-duration": `${contactCardBeamDuration}s`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">Currently Available</span>
              </div>
              <TypewriterText strings={availabilityMessages} />
            </div>
          </div>
        </div>
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="ml-auto mt-6 flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-card/90 text-primary shadow-lg shadow-black/30 backdrop-blur transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:hidden"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};
