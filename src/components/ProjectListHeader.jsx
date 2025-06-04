import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArchive } from "react-icons/fa";

const ProjectListHeader = () => {
  const navigate = useNavigate();

  const handleNavigateBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <header
      className={`w-full bg-[#121212] fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out`}
    >
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
            <div className="flex items-center gap-3">
              <FaArchive className="text-[#f0c14b] text-2xl" />
              <h1 className="text-2xl font-bold text-gray-200">
                Project Archive
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProjectListHeader;
