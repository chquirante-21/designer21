import { Button } from "@/components/Button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const navLinks = [
    { href: "/#reel", label: "Reel" },
    { href: "/#about", label: "About" },
    { href: "/#services", label: "Services" },
    { href: "/#projects", label: "Projects" },
    { href: "/#experience", label: "Experience" },
];

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
                isScrolled ? "glass-strong py-3" : "bg-transparent py-5"
            }  z-50`}>
            <nav className="container mx-auto px-6 flex items-center justify-between">
                <a href="/" className="text-xl font-bold tracking-tight hover:text-primary">
                    CQ<span className="text-primary">.</span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a href={link.href} key={link.href}
                            className="px-4 py-2 text-sm text-muted-foreground
                             hover:text-foreground rounded-full hover:bg-surface"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
                
                {/* CTA Button */}
                <div className="hidden md:block">
                    <Button
                        as="a"
                        href="/#contact"
                        size="sm"
                        onClick={() => trackEvent("nav_contact_click")}
                    >
                        <span className="text-sm font-normal">Contact Me</span>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                type="button"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                className="md:hidden p-2 text-foreground cursor-pointer"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div id="mobile-navigation" className="md:hidden glass-strong animate-fade-in">
                    <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                    {navLinks.map((link) => (
	                     <a
                            href={link.href}
                            key={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg text-muted-foreground hover:text-foreground py-2"
                    >
                            {link.label}
                    </a>
                 ))}
            
                        <Button
                            as="a"
                            href="/#contact"
                            onClick={() => {
                                trackEvent("mobile_nav_contact_click");
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            Contact Me
                        </Button>
                </div>
            </div>
            )}
        </header>
    );
};
