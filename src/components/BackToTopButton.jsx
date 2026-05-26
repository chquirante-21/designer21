import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileContactVisible, setIsMobileContactVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 480);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const contactSection = document.getElementById("contact");
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    let observer;

    if (!contactSection) return undefined;

    const observeContact = () => {
      observer?.disconnect();

      if (!mobileQuery.matches) {
        setIsMobileContactVisible(false);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => setIsMobileContactVisible(entry.isIntersecting),
        { rootMargin: "-64px 0px 0px 0px" }
      );
      observer.observe(contactSection);
    };

    observeContact();
    mobileQuery.addEventListener("change", observeContact);

    return () => {
      observer?.disconnect();
      mobileQuery.removeEventListener("change", observeContact);
    };
  }, []);

  const isFloatingButtonVisible = isVisible && !isMobileContactVisible;

  return (
    <button
      type="button"
      aria-label="Back to top"
      aria-hidden={!isFloatingButtonVisible}
      tabIndex={isFloatingButtonVisible ? 0 : -1}
      title="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-card/90 text-primary shadow-lg shadow-black/30 backdrop-blur transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:bottom-6 sm:right-6 sm:h-12 sm:w-12 ${
        isFloatingButtonVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};
