import { useEffect, useState, useRef } from "react";
import { Link, Events, scrollSpy } from "react-scroll";
import { CgMenuRight } from "react-icons/cg";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { HiChatBubbleLeftRight, HiSparkles } from "react-icons/hi2";
import PropTypes from "prop-types";
import Chatbot from "./Chatbot";

const Header = ({ onOpenAbout, onOpenServices }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoverItem, setHoverItem] = useState(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showChatbotHint, setShowChatbotHint] = useState(false);
  const headerRef = useRef(null);
  const chatbotRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isCurrentScrolled = scrollTop > 0;
      setIsScrolling(isCurrentScrolled);

      if (scrollTop > 100) {
        setShowScrollIndicator(false);
      }

      if (scrollTop > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsChatbotOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousedown", handleClickOutside);
    Events.scrollEvent.register("begin", function (to) {
      setActiveSection(to);
    });

    scrollSpy.update();

    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 5000);

    // Show chatbot hint after some time if not opened
    const hintTimer = setTimeout(() => {
      if (!isChatbotOpen) {
        setShowChatbotHint(true);
        setTimeout(() => setShowChatbotHint(false), 6000);
      }
    }, 8000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleClickOutside);
      Events.scrollEvent.remove("begin");
      clearTimeout(timer);
      clearTimeout(hintTimer);
    };
  }, [isChatbotOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
          ? "bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95 backdrop-blur-md shadow-lg shadow-yellow-400/5 border-b border-slate-800/50"
          : "bg-transparent"
      }`}
    >
      <style>{`
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
        @keyframes slide-up-fade {
          from {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-slide-up-fade {
          animation: slide-up-fade 0.3s ease-out;
        }
      `}</style>

      <div className="hidden w-full lg:flex items-center justify-between">
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

        <nav className="flex">
          <div className="flex cursor-pointer items-center justify-center space-x-8">
            <button
              onClick={() => onOpenAbout?.()}
              onMouseEnter={() => setHoverItem("About-section")}
              onMouseLeave={() => setHoverItem(null)}
              className="animate-fadeInDown bg-transparent"
              style={{ animationDelay: "200ms" }}
            >
              <p
                className={`link-hover-effect ${getActiveClass(
                  "About-section"
                )}`}
              >
                About
              </p>
            </button>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-70}
              duration={800}
              delay={0}
              isDynamic={true}
              to="Experiences-section"
              onMouseEnter={() => setHoverItem("Experiences-section")}
              onMouseLeave={() => setHoverItem(null)}
              className="animate-fadeInDown"
              style={{ animationDelay: "250ms" }}
            >
              <p
                className={`link-hover-effect ${getActiveClass(
                  "Experiences-section"
                )}`}
              >
                Experience
              </p>
            </Link>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-70}
              duration={800}
              delay={0}
              isDynamic={true}
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
            <button
              onClick={() => onOpenServices?.()}
              onMouseEnter={() => setHoverItem("Services-section")}
              onMouseLeave={() => setHoverItem(null)}
              className="animate-fadeInDown bg-transparent"
              style={{ animationDelay: "350ms" }}
            >
              <p
                className={`link-hover-effect ${getActiveClass(
                  "Services-section"
                )}`}
              >
                Services
              </p>
            </button>

            <div className="relative group">
              <button
                onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                onMouseEnter={() => {
                  setHoverItem("Chatbot");
                  setShowChatbotHint(false);
                }}
                onMouseLeave={() => setHoverItem(null)}
                className="animate-fadeInDown bg-transparent flex items-center space-x-1"
                style={{ animationDelay: "400ms" }}
                title="Open AI Assistant"
              >
                <p className={`link-hover-effect ${getActiveClass("Chatbot")}`}>
                  <HiChatBubbleLeftRight className="text-lg" />
                </p>
              </button>

              {/* Chatbot Hint */}
              {showChatbotHint && !isChatbotOpen && (
                <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 animate-slide-up-fade z-40">
                  <div className="relative bg-indigo-600 text-white text-xs rounded-2xl px-3 py-2 shadow-2xl border border-white/20 backdrop-blur-sm whitespace-nowrap">
                    {/* Arrow pointer */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-3 border-r-3 border-b-3 border-transparent border-b-indigo-600"></div>

                    <div className="flex items-center space-x-1">
                      <HiChatBubbleLeftRight className="text-sm text-yellow-300" />
                      <span className="font-semibold">Ask me anything!</span>
                      <HiSparkles className="text-xs text-pink-300 animate-ping" />
                    </div>
                  </div>
                </div>
              )}
            </div>

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
            className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-800/50 border border-yellow-400/20 text-yellow-400 hover:text-orange-500 focus:outline-none transition-all duration-300 hover:rotate-180"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            <CgMenuRight size={24} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="absolute left-0 top-full block w-full cursor-pointer lg:hidden">
          <div className="bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95 backdrop-blur-md mx-4 mt-2 flex flex-col items-center justify-center space-y-5 py-5 animate-fadeInDown border border-slate-800/50 rounded-lg shadow-lg">
            <button
              onClick={() => {
                onOpenAbout?.();
                toggleMobileMenu();
              }}
              onMouseEnter={() => setHoverItem("About-section")}
              onMouseLeave={() => setHoverItem(null)}
            >
              <p
                className={`link-hover-effect ${getActiveClass(
                  "About-section"
                )}`}
              >
                About
              </p>
            </button>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-70}
              duration={800}
              delay={0}
              isDynamic={true}
              to="Experiences-section"
              onMouseEnter={() => setHoverItem("Experiences-section")}
              onMouseLeave={() => setHoverItem(null)}
            >
              <p
                className={`link-hover-effect ${getActiveClass(
                  "Experiences-section"
                )}`}
                onClick={toggleMobileMenu}
              >
                Experience
              </p>
            </Link>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-70}
              duration={800}
              delay={0}
              isDynamic={true}
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
            <button
              onClick={() => {
                onOpenServices?.();
                toggleMobileMenu();
              }}
              onMouseEnter={() => setHoverItem("Services-section")}
              onMouseLeave={() => setHoverItem(null)}
            >
              <p
                className={`link-hover-effect ${getActiveClass(
                  "Services-section"
                )}`}
              >
                Services
              </p>
            </button>
          </div>
        </nav>
      )}

      {showScrollIndicator && !isScrolling && (
        <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 animate-bounce hidden xs:block">
          <Link
            to="About-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={800}
            delay={0}
            isDynamic={true}
            className="flex flex-col items-center cursor-pointer"
          >
            <span className="text-xs text-yellow-400 mb-1">Scroll</span>
            <FaChevronDown className="text-yellow-400" />
          </Link>
        </div>
      )}

      {/* Chatbot Dropdown */}
      {isChatbotOpen && (
        <div
          ref={chatbotRef}
          className="fixed top-20 right-4 z-50 animate-fadeInDown"
        >
          <Chatbot isDropdown={true} onClose={() => setIsChatbotOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;

Header.propTypes = {
  onOpenAbout: PropTypes.func,
  onOpenContact: PropTypes.func,
  onOpenServices: PropTypes.func,
};
