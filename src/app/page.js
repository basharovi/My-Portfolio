import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Portfolio from "@/components/sections/Portfolio";
import Education from "@/components/sections/Education";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      {/* <Portfolio /> */}
      <Education />
      {/* <Gallery /> */}
      <Contact />
    </>
  );
}
