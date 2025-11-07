import { memo, useState } from "react";
import PropTypes from "prop-types";
import { FaExternalLinkAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useIntersectionObserver } from "../utils/useIntersectionObserver";

const ArchiveProjectCard = memo(
  ({ project, index, isExpanded, onToggle, onTechClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [cardRef, isVisible] = useIntersectionObserver({
      threshold: 0.1,
      once: true,
    });

    const handleLiveLinkClick = () => {
      if (project.liveLink === "/") {
        toast.success(
          "Project deployed and under final testing. Contact me for an exclusive preview!",
          {
            duration: 3000,
            position: "top-center",
            style: {
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
              color: "#f0c14b",
              border: "1px solid #f0c14b",
              borderRadius: "12px",
              padding: "16px",
              fontWeight: "600",
            },
          }
        );
      }
    };

    return (
      <div
        ref={cardRef}
        className={`group relative rounded-2xl bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 backdrop-blur-sm p-4 xs:p-6 border border-[#f0c14b]/20 hover:border-[#f0c14b]/60 transition-all duration-500 overflow-hidden
                  opacity-0 transform translate-y-4
                  ${isVisible ? "opacity-100 translate-y-0" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isVisible
            ? isHovered
              ? "translateY(-8px)"
              : "translateY(0)"
            : "translateY(16px)",
          boxShadow:
            isHovered && isVisible
              ? "0 20px 60px rgba(240, 193, 75, 0.3), 0 0 40px rgba(240, 193, 75, 0.1)"
              : "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#f0c14b]/20 to-[#e57e31]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-[#f0c14b]/10 to-[#e57e31]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>

        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f0c14b] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {isVisible && (
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3 xs:mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#f0c14b] animate-pulse"></div>
                  <span className="text-[10px] xs:text-xs font-medium text-[#f0c14b]/70 uppercase tracking-wider">
                    Project {index + 1}
                  </span>
                </div>
                <h2 className="font-tinos text-base xs:text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 lg:text-2xl group-hover:from-[#f0c14b] group-hover:via-white group-hover:to-[#f0c14b] transition-all duration-500">
                  {project.name}
                </h2>
              </div>

              <div className="flex items-center gap-1.5 px-2 xs:px-3 py-1 rounded-full bg-[#f0c14b]/10 border border-[#f0c14b]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f0c14b] animate-pulse"></span>
                <span className="text-[10px] xs:text-xs font-semibold text-[#f0c14b]">
                  Active
                </span>
              </div>
            </div>

            <div className="relative mb-3 xs:mb-4">
              <p className="text-xs xs:text-sm sm:text-base text-slate-300 leading-relaxed">
                {isExpanded
                  ? project.description
                  : project.description.substring(0, 100)}
                {project.description.length > 100 && (
                  <span
                    className="ml-2 cursor-pointer font-semibold text-[#f0c14b] hover:text-[#e57e31] transition-colors duration-300 inline-flex items-center gap-1 hover:gap-2"
                    onClick={() => onToggle(index)}
                    aria-label={isExpanded ? "Show less" : "Show more"}
                  >
                    {isExpanded ? "↑ Show less" : "→ Read more"}
                  </span>
                )}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 xs:gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="group/tech inline-flex items-center px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-lg bg-[#0f0f23]/60 border border-[#f0c14b]/30 text-xs xs:text-sm font-medium text-slate-200 hover:bg-[#f0c14b] hover:text-[#0f0f23] hover:border-[#f0c14b] hover:scale-105 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                  onClick={() => onTechClick(tech)}
                  style={{
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <span className="relative">
                    {tech}
                    <span className="absolute inset-0 bg-gradient-to-r from-[#f0c14b]/0 via-[#f0c14b]/20 to-[#f0c14b]/0 opacity-0 group-hover/tech:opacity-100 group-hover/tech:animate-shimmer transition-opacity duration-300"></span>
                  </span>
                </span>
              ))}
            </div>

            {project.liveLink && (
              <div className="mt-4 xs:mt-6 pt-4 xs:pt-5 border-t border-[#f0c14b]/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-xs xs:text-sm font-medium text-slate-400">
                      Live Application
                    </span>
                  </div>

                  {project.liveLink === "/" ? (
                    <button
                      onClick={handleLiveLinkClick}
                      className="relative group/btn inline-flex items-center justify-center w-10 h-10 xs:w-12 xs:h-12 rounded-xl bg-gradient-to-br from-[#f0c14b]/20 to-[#e57e31]/20 hover:from-[#f0c14b] hover:to-[#e57e31] text-[#f0c14b] hover:text-[#0f0f23] transition-all duration-300 cursor-pointer border border-[#f0c14b]/50 hover:border-[#f0c14b] hover:scale-110 hover:rotate-12 backdrop-blur-sm"
                      title="Coming Soon"
                    >
                      <FaExternalLinkAlt className="text-sm xs:text-base relative z-10 group-hover/btn:animate-pulse" />
                      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f0c14b]/0 via-[#f0c14b]/30 to-[#f0c14b]/0 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-shimmer"></span>
                    </button>
                  ) : (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group/btn inline-flex items-center justify-center w-10 h-10 xs:w-12 xs:h-12 rounded-xl bg-gradient-to-br from-[#f0c14b]/20 to-[#e57e31]/20 hover:from-[#f0c14b] hover:to-[#e57e31] text-[#f0c14b] hover:text-[#0f0f23] transition-all duration-300 cursor-pointer border border-[#f0c14b]/50 hover:border-[#f0c14b] hover:scale-110 hover:rotate-12 backdrop-blur-sm"
                      title="View Live App"
                    >
                      <FaExternalLinkAlt className="text-sm xs:text-base relative z-10 group-hover/btn:animate-pulse" />
                      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f0c14b]/0 via-[#f0c14b]/30 to-[#f0c14b]/0 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-shimmer"></span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#f0c14b]/20 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
