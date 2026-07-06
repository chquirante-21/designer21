import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Services } from "@/sections/Services";
import { Workflow } from "@/sections/Workflow";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Contact } from "@/sections/Contact";
import { Footer } from "./layout/Footer";
import { BackToTopButton } from "@/components/BackToTopButton";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (window.location.pathname.startsWith("/projects")) {
      window.history.replaceState(null, "", "/#projects");
    }
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Workflow />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <BackToTopButton />
      <Footer />
    </div >
  )
}

export default App
