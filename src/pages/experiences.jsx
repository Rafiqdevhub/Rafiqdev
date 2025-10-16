import { memo, useState, useCallback } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding } from "react-icons/fa";
import { UserData } from "../data/UserData";
import PropTypes from "prop-types";

const ExperienceCard = memo(({ experience, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-[#42403b] to-[#49260b] rounded-lg opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-300 ${
          isHovered ? "opacity-30" : ""
        }`}
      ></div>
      <div
        className="relative bg-gradient-to-br from-[#1a1a2e] to-[#2a2a4e] rounded-lg p-4 xxs:p-5 xs:p-6 border border-gray-700 hover:border-[#f0c14b] transition-all duration-300 transform hover:scale-[1.02]"
        style={{
          animationDelay: `${index * 200}ms`,
        }}
      >
        <div className="flex flex-col space-y-3 xxs:space-y-4">
          <div className="flex flex-col xxs:flex-row xxs:items-start xxs:justify-between gap-2">
            <h3 className="text-lg xxs:text-xl xs:text-2xl font-bold text-white">
              {experience.title}
            </h3>
            <div className="flex items-center gap-1 text-[#f0c14b] text-xs xxs:text-sm">
              <FaCalendarAlt />
              <span>{experience.duration}</span>
            </div>
          </div>

          <div className="flex flex-col xxs:flex-row xxs:items-center gap-2 text-sm xxs:text-base">
            <div className="flex items-center gap-2 text-gray-300">
              <FaBuilding className="text-[#f0c14b]" />
              <span className="font-semibold">{experience.company}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <FaMapMarkerAlt />
              <span>{experience.location}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-[#f0c14b] font-semibold text-sm xxs:text-base">
              Key Responsibilities:
            </h4>
            <ul className="space-y-1">
              {experience.description.map((item, idx) => (
                <li
                  key={idx}
                  className="text-gray-300 text-sm leading-relaxed flex items-start gap-2"
                >
                  <span className="text-[#f0c14b] mt-1.5 text-xs">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-gray-600">
            <h4 className="text-[#f0c14b] font-semibold text-sm xxs:text-base mb-2">
              Technologies Used:
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 xxs:px-3 py-1 bg-[#f0c14b]/10 text-[#f0c14b] text-xs xxs:text-sm rounded-full border border-[#f0c14b]/20 hover:bg-[#f0c14b]/20 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
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

const Experiences = memo(() => {
  return (
    <div className="w-full relative pb-8 xxs:pb-12 xs:pb-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/50 via-transparent to-transparent pointer-events-none"></div>

      <div className="relative">
        <div className="text-center space-y-3 xxs:space-y-4 xs:space-y-6 mb-6 xxs:mb-8 xs:mb-10 px-2 xxs:px-4">
          <h1 className="font-poppins mx-auto w-full xs:w-[90%] text-2xl xxs:text-3xl xs:text-4xl font-bold tracking-wider text-white lg:text-5xl">
            Professional <span className="text-[#f0c14b]">Experience</span>
          </h1>
          <p className="text-[#a3a3a3] text-sm">
            A journey through my professional career, showcasing the diverse
            roles and
            <span className="text-[#f0c14b]"> impactful projects</span> that
            have shaped my expertise in full-stack development, AI/ML
            engineering, SDET, and DevOps.
          </p>
        </div>

        <div className="mx-auto mb-6 xxs:mb-8 xs:mb-10 w-[96%] xxs:w-[94%] xs:w-[90%]">
          <div className="grid grid-cols-1 gap-4 xxs:gap-6 xs:gap-8 sm:mb-8 xxs:mb-10">
            {UserData.experiences.map((experience, index) => (
              <ExperienceCard
                key={index}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto w-full xxs:w-[94%] xs:w-[90%] mt-4 xxs:mt-6 xs:mt-8 text-center">
          <div className="inline-flex items-center gap-2 xxs:gap-2.5 xs:gap-3 bg-gradient-to-r from-[#1a1a2e] to-[#2a2a4e] px-3 xxs:px-4 xs:px-6 py-1.5 xxs:py-2 xs:py-3 rounded-lg border border-[#f0c14b] text-xs xxs:text-sm xs:text-base">
            <span className="text-white font-semibold">
              Always Learning, Always Growing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

Experiences.displayName = "Experiences";

export default Experiences;
