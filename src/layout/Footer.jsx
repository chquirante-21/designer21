import { Github, Linkedin, Twitter } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/chquirante-21", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/designer21/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/chaqkoy", label: "Twitter" },
];

const footerLinks = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export const Footer = ({ hideContactLink = false }) => {
  const currentYear = new Date().getFullYear();
  const visibleFooterLinks = hideContactLink
    ? footerLinks.filter((link) => link.href !== "/#contact")
    : footerLinks;

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a href="/" className="text-xl font-bold tracking-tight">
              CQ<span className="text-primary">.</span>
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} Charlo Quirante. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {visibleFooterLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target={social.href === "#" ? undefined : "_blank"}
                rel={social.href === "#" ? undefined : "noopener noreferrer"}
                className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
