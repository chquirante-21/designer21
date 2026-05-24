import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { Footer } from "./layout/Footer";

function App() {
  const isProjectsPage = window.location.pathname.startsWith("/projects");

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      {isProjectsPage ? (
        <ProjectsPage />
      ) : (
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Testimonials />
          <Contact />
        </main>
      )}
      <Footer />
    </div >
  )
}

export default App
