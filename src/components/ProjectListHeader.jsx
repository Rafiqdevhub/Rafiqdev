import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArchive, FaChevronUp } from "react-icons/fa";

const ProjectListHeader = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleNavigateBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full bg-[#121212]/95 fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out backdrop-blur-sm border-b border-white/5 pt-[env(safe-area-inset-top)]">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 md:py-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-2">
            <button
              onClick={handleNavigateBack}
              className="flex items-center gap-2 text-gray-200 hover:text-[#c59629] transition-colors duration-300 text-sm sm:text-base"
              aria-label="Back to home"
            >
              <FaArrowLeft className="text-base sm:text-lg" />
              <span className="hidden xs:inline">Back to Portfolio</span>
            </button>
            <div className="flex items-center gap-4 sm:gap-6 flex-1 justify-center">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <FaArchive className="text-[#f0c14b] text-xl sm:text-2xl flex-shrink-0" />
                <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-200 truncate">
                  Project Archive
                </h1>
              </div>
            </div>
            <button
              onClick={scrollToTop}
              className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-[#1a1a2e] text-[#f0c14b] rounded-full shadow-lg hover:bg-[#f0c14b] hover:text-[#1a1a2e] transition-all duration-300 border border-[#f0c14b] hover:scale-110 ${
                showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
              aria-label="Scroll to top"
            >
              <FaChevronUp className="text-base sm:text-lg" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProjectListHeader;
