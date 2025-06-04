import { memo } from "react";
import PropTypes from "prop-types";
import { FaExternalLinkAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useIntersectionObserver } from "../utils/useIntersectionObserver";

const ArchiveProjectCard = memo(
  ({ project, index, isExpanded, onToggle, onTechClick }) => {
    const [cardRef, isVisible] = useIntersectionObserver({
      threshold: 0.1,
      once: true,
    });

    const handleLiveLinkClick = () => {
      if (project.liveLink === "/") {
        toast.success(
          "🎯 Project deployed and under final testing. Contact me for an exclusive preview!",
          {
            duration: 3000,
            position: "top-center",
            style: {
              background: "#1a1a2e",
              color: "#f0c14b",
              border: "1px solid #f0c14b",
            },
          }
        );
      }
    };

    return (
      <div
        ref={cardRef}
        className={`group relative bg-[#1a1a2e] rounded-lg p-4 xs:p-6 border border-[#2a2a4e] shadow-md 
                  hover:shadow-[0_8px_30px_rgba(240,193,75,0.2)]
                  opacity-0 transform translate-y-4 transition-all duration-500
                  ${isVisible ? "opacity-100 translate-y-0" : ""}`}
      >
        {isVisible && (
          <>
            <h2 className="font-poppins text-base xs:text-xl font-bold text-white mb-2 xs:mb-3">
              {project.name}
            </h2>

            <p className="text-[#a3a3a3] mb-3 xs:mb-4 text-xs xs:text-sm">
              {isExpanded
                ? project.description
                : project.description.substring(0, 100)}
              {project.description.length > 100 && (
                <span
                  className="ml-[5px] cursor-pointer text-[#f0c14b] hover:text-[#e57e31] transition-colors duration-300"
                  onClick={() => onToggle(index)}
                  aria-label={isExpanded ? "Show less" : "Show more"}
                >
                  {isExpanded ? " Show less" : "...Read more"}
                </span>
              )}
            </p>

            <div className="flex flex-wrap gap-1.5 xs:gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 xs:px-3 py-0.5 xs:py-1 text-xs font-medium text-white bg-[#2a2a4e] rounded-full hover:bg-[#f0c14b] hover:text-[#1a1a2e] transition-colors duration-300 cursor-pointer"
                  onClick={() => onTechClick(tech)}
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.liveLink && (
              <div className="mt-3 xs:mt-4 text-xs xs:text-sm text-[#a3a3a3]">
                <div className="flex items-center justify-between px-2 xs:px-4 py-1.5 xs:py-2">
                  <span className="text-[#f0c14b] text-xs xs:text-sm">
                    View Live Application
                  </span>
                  {project.liveLink === "/" ? (
                    <button
                      onClick={handleLiveLinkClick}
                      className="inline-flex items-center justify-center w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-[#1a1a2e] hover:bg-[#f0c14b] hover:bg-opacity-20 text-[#f0c14b] hover:text-[#e57e31] transition-all duration-300 cursor-pointer border border-[#f0c14b] hover:border-[#e57e31] hover:scale-110"
                      title="Coming Soon"
                    >
                      <FaExternalLinkAlt className="text-sm xs:text-base" />
                    </button>
                  ) : (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-[#1a1a2e] hover:bg-[#f0c14b] hover:bg-opacity-20 text-[#f0c14b] hover:text-[#e57e31] transition-all duration-300 cursor-pointer border border-[#f0c14b] hover:border-[#e57e31] hover:scale-110"
                      title="View Live App"
                    >
                      <FaExternalLinkAlt className="text-sm xs:text-base" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

ArchiveProjectCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    liveLink: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onTechClick: PropTypes.func.isRequired,
};

ArchiveProjectCard.displayName = "ArchiveProjectCard";

export default ArchiveProjectCard;
