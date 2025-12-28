import { memo, useState, useCallback } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding } from "react-icons/fa";
import PropTypes from "prop-types";

const ExperienceCard = memo(({ experience, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      className="group relative mb-4 xs:mb-8 h-auto rounded-2xl bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 backdrop-blur-sm p-4 xs:p-6 border border-[#f0c14b]/20 hover:border-[#f0c14b]/60 transition-all duration-500 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 20px 60px rgba(240, 193, 75, 0.3), 0 0 40px rgba(240, 193, 75, 0.1)"
          : "0 4px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Animated background orbs */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#f0c14b]/20 to-[#e57e31]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-[#f0c14b]/10 to-[#e57e31]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f0c14b] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        {/* Header section with experience number and duration */}
        <div className="flex items-start justify-between mb-3 xs:mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#f0c14b] animate-pulse"></div>
              <span className="text-[10px] xs:text-xs font-medium text-[#f0c14b]/70 uppercase tracking-wider">
                Experience {index + 1}
              </span>
            </div>
            <h3 className="font-tinos text-base xs:text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 lg:text-2xl group-hover:from-[#f0c14b] group-hover:via-white group-hover:to-[#f0c14b] transition-all duration-500">
              {experience.title}
            </h3>
          </div>

          <div className="flex items-center gap-1 px-2 xs:px-3 py-1 rounded-full bg-[#f0c14b]/10 border border-[#f0c14b]/30">
            <FaCalendarAlt className="text-[10px] xs:text-xs text-[#f0c14b]" />
            <span className="text-[10px] xs:text-xs font-semibold text-[#f0c14b]">
              {experience.duration}
            </span>
          </div>
        </div>

        {/* Company and location info */}
        <div className="mb-3 xs:mb-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0f0f23]/60 border border-[#f0c14b]/30 backdrop-blur-sm">
            <FaBuilding className="text-[#f0c14b] text-xs xs:text-sm" />
            <span className="text-xs xs:text-sm font-semibold text-slate-200">
              {experience.company}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs xs:text-sm text-slate-400">
            <FaMapMarkerAlt className="text-[#f0c14b]" />
            <span>{experience.location}</span>
          </div>
        </div>

        {/* Key Responsibilities */}
        <div className="mb-3 xs:mb-4">
          <h4 className="text-[#f0c14b] font-semibold text-xs xs:text-sm mb-2 flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[#f0c14b] animate-pulse"></div>
            Key Responsibilities
          </h4>
          <ul className="space-y-1.5">
            {experience.description.map((item, idx) => (
              <li
                key={idx}
                className="text-xs xs:text-sm text-slate-300 leading-relaxed flex items-start gap-2"
              >
                <span className="text-[#f0c14b] mt-1 text-xs">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies section */}
        <div className="mt-3 xs:mt-4 pt-3 xs:pt-4 border-t border-[#f0c14b]/10">
          <h4 className="text-[#f0c14b] font-semibold text-xs xs:text-sm mb-2 flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[#f0c14b] animate-pulse"></div>
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-1.5 xs:gap-2">
            {experience.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="group/tech inline-flex items-center px-2.5 xs:px-3 py-1 xs:py-1.5 rounded-lg bg-[#0f0f23]/60 border border-[#f0c14b]/30 text-xs xs:text-sm font-medium text-slate-200 hover:bg-[#f0c14b] hover:text-[#0f0f23] hover:border-[#f0c14b] hover:scale-105 transition-all duration-300 cursor-default backdrop-blur-sm"
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
        </div>
      </div>

      {/* Bottom corner decoration */}
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#f0c14b]/20 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
});

ExperienceCard.propTypes = {
  experience: PropTypes.shape({
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.arrayOf(PropTypes.string).isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

ExperienceCard.displayName = "ExperienceCard";

export default ExperienceCard;
