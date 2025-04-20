import Header from "../components/Header";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Footer from "../components/Footer";
import Project from "./Project";
import { Element } from "react-scroll";

function Layout() {
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
