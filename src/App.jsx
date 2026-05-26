import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Contact } from "@/sections/Contact";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { Footer } from "./layout/Footer";
import { BackToTopButton } from "@/components/BackToTopButton";

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
          <Contact />
        </main>
      )}
      {!isProjectsPage ? <BackToTopButton /> : null}
      <Footer hideContactLink={!isProjectsPage} />
    </div >
  )
}

export default App
