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
    <header className="w-full bg-[#121212] fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <button
              onClick={handleNavigateBack}
              className="flex items-center gap-2 text-gray-200 hover:text-[#c59629] transition-colors duration-300"
              aria-label="Back to home"
            >
              <FaArrowLeft />
              <span>Back to Portfolio</span>
            </button>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <FaArchive className="text-[#f0c14b] text-2xl" />
                <h1 className="text-2xl font-bold text-gray-200">
                  Project Archive
                </h1>
              </div>
            </div>
            <button
              onClick={scrollToTop}
              className={`w-10 h-10 flex items-center justify-center bg-[#1a1a2e] text-[#f0c14b] rounded-full shadow-lg hover:bg-[#f0c14b] hover:text-[#1a1a2e] transition-all duration-300 border border-[#f0c14b] hover:scale-110 ${
                showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
              aria-label="Scroll to top"
            >
              <FaChevronUp className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProjectListHeader;
