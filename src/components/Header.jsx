import { useEffect, useState, useRef } from "react";
import { Link, Events, scrollSpy } from "react-scroll";
import { CgMenuRight } from "react-icons/cg";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { UserData } from "../data/UserData";

const Header = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoverItem, setHoverItem] = useState(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const headerRef = useRef(null);

  const { resumeUrl } = UserData;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isCurrentScrolled = scrollTop > 0;
      setIsScrolling(isCurrentScrolled);

      // Hide scroll indicator after user scrolls down
      if (scrollTop > 100) {
        setShowScrollIndicator(false);
      }

      // Show scroll to top button when scrolled past a certain point
      if (scrollTop > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    Events.scrollEvent.register("begin", function (to) {
      setActiveSection(to);
    });

    scrollSpy.update();

    // Hide scroll indicator after 5 seconds even if user doesn't scroll
    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      Events.scrollEvent.remove("begin");
      clearTimeout(timer);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Animation class for active link with enhanced visual effect
  const getActiveClass = (section) => {
    if (activeSection === section) {
      return "font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#f0c14b] to-[#e57e31] scale-110 active-nav-item";
    }
    return `text-[#a3a3a3] hover:text-[#f0c14b] transition-all duration-300 
      ${hoverItem === section ? "scale-110" : ""}`;
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 z-50 flex w-full items-center justify-center py-3 xs:py-4 text-base transition-all duration-500 sm:px-4 lg:px-28
      ${
        isScrolling
          ? "bg-gradient-to-r from-[#0f0f1a]/95 via-[#0f0f1a]/90 to-[#0f0f1a]/95 backdrop-blur-md shadow-lg shadow-[#f0c14b]/5"
          : "bg-transparent"
      }`}
    >
      <style jsx>{`
        @keyframes pulse-subtle {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        @keyframes glow {
          0%,
          100% {
            text-shadow: 0 0 5px rgba(240, 193, 75, 0);
          }
          50% {
            text-shadow: 0 0 10px rgba(240, 193, 75, 0.5);
          }
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        @keyframes bounceUp {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(10px);
          }
          60% {
            transform: translateY(5px);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.5s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s infinite ease-in-out,
            glow 2s infinite ease-in-out;
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        .animate-bounceUp {
          animation: bounceUp 2s infinite;
        }
        .link-hover-effect {
          position: relative;
          transition: all 0.3s ease;
        }
        .link-hover-effect::after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: #f0c14b;
          transition: width 0.3s ease;
        }
        .link-hover-effect:hover::after {
          width: 100%;
        }
        .logo-text {
          background: linear-gradient(to right, #f0c14b, #e57e31);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: bold;
          letter-spacing: 0.5px;
        }
        .glass-effect {
          backdrop-filter: blur(8px);
          background: rgba(15, 15, 26, 0.85);
          border: 1px solid rgba(240, 193, 75, 0.1);
          border-radius: 10px;
          box-shadow: 0 8px 32px 0 rgba(15, 15, 26, 0.2);
        }
        .scroll-top-button {
          height: 40px;
          width: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f0c14b, #e57e31);
          color: #0f0f1a;
          box-shadow: 0 4px 15px rgba(240, 193, 75, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .scroll-top-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(240, 193, 75, 0.4);
        }
        .active-nav-item {
          position: relative;
          animation: pulse-subtle 2s infinite ease-in-out,
            glow 2s infinite ease-in-out;
        }
        .active-nav-item::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: -2px;
          left: 0;
          background: linear-gradient(to right, #f0c14b, #e57e31, #f0c14b);
          background-size: 200% 100%;
          animation: shimmer 2s infinite linear;
        }
        .active-nav-item::before {
          content: "";
          position: absolute;
          width: 120%;
          height: 35px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            ellipse at center,
            rgba(240, 193, 75, 0.1) 0%,
            rgba(240, 193, 75, 0) 70%
          );
          border-radius: 30px;
          z-index: -1;
        }
      `}</style>

      {/* Desktop Navigation */}
      <div className="hidden w-full lg:flex items-center justify-between">
        {/* Logo / Personal Brand */}
        <Link
          to="Home-section"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="cursor-pointer"
        >
          <div className="flex items-center space-x-2 animate-fadeInDown">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-[#f0c14b] to-[#e57e31] text-[#0f0f1a] font-bold text-xl">
              MR
            </div>
            <span className="logo-text text-xl">Rafiq</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex">
          <div className="flex cursor-pointer items-center justify-center space-x-8">
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="Home-section"
              onMouseEnter={() => setHoverItem("Home-section")}
              onMouseLeave={() => setHoverItem(null)}
              className="animate-fadeInDown"
              style={{ animationDelay: "100ms" }}
            >
              <p
                className={`link-hover-effect ${getActiveClass(
                  "Home-section"
                )}`}
              >
                Home
              </p>
            </Link>

            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="About-section"
              onMouseEnter={() => setHoverItem("About-section")}
              onMouseLeave={() => setHoverItem(null)}
              className="animate-fadeInDown"
              style={{ animationDelay: "200ms" }}
            >
              <p
                className={`link-hover-effect ${getActiveClass(
                  "About-section"
                )}`}
              >
                About
              </p>
            </Link>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="Project-section"
              onMouseEnter={() => setHoverItem("Project-section")}
              onMouseLeave={() => setHoverItem(null)}
              className="animate-fadeInDown"
              style={{ animationDelay: "300ms" }}
            >
              <p
                className={`link-hover-effect ${getActiveClass(
                  "Project-section"
                )}`}
              >
                Projects
              </p>
            </Link>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="Contact-section"
              onMouseEnter={() => setHoverItem("Contact-section")}
              onMouseLeave={() => setHoverItem(null)}
              className="animate-fadeInDown"
              style={{ animationDelay: "400ms" }}
            >
              <p
                className={`link-hover-effect ${getActiveClass(
                  "Contact-section"
                )}`}
              >
                Contact
              </p>
            </Link>
            <div
              className="transform transition-transform duration-300 hover:scale-105 animate-fadeInDown"
              style={{ animationDelay: "500ms" }}
              onMouseEnter={() => setHoverItem("resume")}
              onMouseLeave={() => setHoverItem(null)}
            >
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`button-UI w-[120px] rounded-lg px-4 py-1.5 font-bold tracking-wider text-[#0f0f1a] shadow-xl transition-all duration-300 
                  hover:opacity-90 hover:shadow-[0_8px_30px_rgba(240,193,75,0.3)]
                  ${
                    hoverItem === "resume" ? "animate-float" : ""
                  } inline-block text-center`}
                style={{
                  animation:
                    hoverItem === "resume"
                      ? "float 2s ease-in-out infinite"
                      : "none",
                  background: "linear-gradient(to right, #f0c14b, #e57e31)",
                }}
              >
                Resume
              </a>
            </div>

            {/* Scroll to Top Button in Desktop View (Inside Header) */}
            {showScrollTop && (
              <div
                className="scroll-top-button animate-fadeInDown ml-2"
                onClick={scrollToTop}
                title="Scroll to top"
              >
                <FaChevronUp size={16} className="animate-bounceUp" />
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="flex w-full px-4 justify-between items-center lg:hidden">
        <Link
          to="Home-section"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center h-8 w-8 xs:h-9 xs:w-9 rounded-full bg-gradient-to-br from-[#f0c14b] to-[#e57e31] text-[#0f0f1a] font-bold text-sm xs:text-base">
              MR
            </div>
            <span className="logo-text text-base xs:text-lg">Rafiq</span>
          </div>
        </Link>

        <div className="flex items-center">
          {/* Scroll to Top Button in Mobile View */}
          {showScrollTop && (
            <div
              className="scroll-top-button animate-fadeInDown h-8 w-8 mr-3"
              onClick={scrollToTop}
              title="Scroll to top"
            >
              <FaChevronUp size={12} className="animate-bounceUp" />
            </div>
          )}
          <button
            className="flex items-center justify-center h-10 w-10 rounded-full bg-[#0f0f1a]/50 border border-[#f0c14b]/20 text-[#f0c14b] hover:text-[#e57e31] focus:outline-none transition-all duration-300 hover:rotate-180"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            <CgMenuRight size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="absolute left-0 top-full block w-full cursor-pointer lg:hidden">
          <div className="glass-effect mx-4 mt-2 flex flex-col items-center justify-center space-y-5 py-5 animate-fadeInDown">
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="Home-section"
              onMouseEnter={() => setHoverItem("Home-section")}
              onMouseLeave={() => setHoverItem(null)}
            >
              <p
                className={`link-hover-effect ${getActiveClass(
                  "Home-section"
                )}`}
                onClick={toggleMobileMenu}
              >
                Home
              </p>
            </Link>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="About-section"
              onMouseEnter={() => setHoverItem("About-section")}
              onMouseLeave={() => setHoverItem(null)}
            >
              <p
                className={`link-hover-effect ${getActiveClass(
                  "About-section"
                )}`}
                onClick={toggleMobileMenu}
              >
                About
              </p>
            </Link>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="Project-section"
              onMouseEnter={() => setHoverItem("Project-section")}
              onMouseLeave={() => setHoverItem(null)}
            >
              <p
                className={`link-hover-effect ${getActiveClass(
                  "Project-section"
                )}`}
                onClick={toggleMobileMenu}
              >
                Projects
              </p>
            </Link>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="Contact-section"
              onMouseEnter={() => setHoverItem("Contact-section")}
              onMouseLeave={() => setHoverItem(null)}
            >
              <p
                className={`link-hover-effect ${getActiveClass(
                  "Contact-section"
                )}`}
                onClick={toggleMobileMenu}
              >
                Contact
              </p>
            </Link>
            <div className="transform transition-transform duration-300 hover:scale-105">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button-UI w-[120px] rounded-lg px-4 py-1.5 font-bold tracking-wider text-[#0f0f1a] shadow-xl transition-all duration-300 hover:opacity-90 hover:shadow-[0_8px_30px_rgba(240,193,75,0.3)] inline-block text-center"
                style={{
                  background: "linear-gradient(to right, #f0c14b, #e57e31)",
                }}
                onClick={toggleMobileMenu}
              >
                Resume
              </a>
            </div>
          </div>
        </nav>
      )}

      {/* Scroll Down Indicator */}
      {showScrollIndicator && !isScrolling && (
        <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 animate-bounce hidden xs:block">
          <Link
            to="About-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="flex flex-col items-center cursor-pointer"
          >
            <span className="text-xs text-[#f0c14b] mb-1">Scroll</span>
            <FaChevronDown className="text-[#f0c14b]" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
