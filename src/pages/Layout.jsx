import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import Header from "../components/Header";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Footer from "../components/Footer";
import Project from "./Project";
import { Element } from "react-scroll";

function Layout() {
  const location = useLocation();

  // Handle route-based scroll on mount and route change
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      // Scroll to the section after a short delay to ensure content is rendered
      setTimeout(() => {
        scroller.scrollTo(hash + "-section", {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
          offset: -70, // Adjust based on your header height
        });
      }, 100);
    }
  }, [location]);

  return (
    <div className="flex flex-col w-full">
      <Header />
      <Element name="Home-section" className="w-full">
        <Home />
      </Element>
      <Element
        name="About-section"
        className="w-full mt-[-30px] xxs:mt-[-40px] xs:mt-[-50px] sm:mt-[-60px] md:mt-0"
      >
        <About />
      </Element>
      <Element
        name="Project-section"
        className="w-full pt-2 xxs:pt-3 xs:pt-4 md:pt-8"
      >
        <Project />
      </Element>
      <Element
        name="Contact-section"
        className="w-full pt-2 xxs:pt-3 xs:pt-4 md:pt-8"
      >
        <Contact />
      </Element>
      <Footer />
    </div>
  );
}

export default Layout;
