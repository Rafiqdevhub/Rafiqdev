import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import Header from "../components/Header";
import Home from "./Home";
import Project from "./Project";
import Experiences from "./experiences";
import ChatbotSection from "./ChatbotSection";
import { Element } from "react-scroll";
import { useState, useEffect as useEffectReact } from "react";
import AboutModal from "../components/AboutModal";
import ContactModal from "../components/ContactModal";
import ServicesModal from "../components/ServicesModal";

function Layout() {
  const location = useLocation();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        scroller.scrollTo(hash + "-section", {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
          offset: -70,
        });
      }, 100);
    }
  }, [location]);

  useEffectReact(() => {
    const anyOpen = aboutOpen || contactOpen || servicesOpen;
    document.body.style.overflow = anyOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aboutOpen, contactOpen, servicesOpen]);

  return (
    <div className="flex flex-col w-full">
      <Header
        onOpenAbout={() => setAboutOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        onOpenServices={() => setServicesOpen(true)}
      />
      <Element name="Home-section" className="w-full">
        <Home />
      </Element>
      <Element
        name="Experiences-section"
        className="w-full pt-2 xxs:pt-3 xs:pt-4 md:pt-8"
      >
        <Experiences />
      </Element>
      <Element
        name="Project-section"
        className="w-full pt-2 xxs:pt-3 xs:pt-4 md:pt-8"
      >
        <Project />
      </Element>
      <Element
        name="Chatbot-section"
        className="w-full pt-2 xxs:pt-3 xs:pt-4 md:pt-8"
      >
        <ChatbotSection />
      </Element>

      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
      <ServicesModal
        isOpen={servicesOpen}
        onClose={() => setServicesOpen(false)}
      />
    </div>
  );
}

export default Layout;
