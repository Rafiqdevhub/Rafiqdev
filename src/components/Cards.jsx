import { useState, useMemo, memo, useCallback } from "react";
import PropTypes from "prop-types";
import { ProjectsList } from "../data/ProjectsList";
import { FaGithub } from "react-icons/fa";

// Memoized individual project card component
const ProjectCard = memo(({ project, index, isExpanded, onToggle }) => {
  return (
    <div className="relative mb-4 xs:mb-8 h-auto rounded-lg bg-[#1a1a2e] p-3 xs:p-4 shadow-md hover:shadow-[0_8px_30px_rgba(240,193,75,0.2)] transition-shadow duration-300">
      <div className="flex items-center justify-between mb-1 xs:mb-2">
        <h2 className="font-poppins text-sm xs:text-base sm:text-lg font-semibold text-white lg:text-xl">
          {project.name}
        </h2>
      </div>
      <p className="font-poppins text-xs xs:text-sm text-[#a3a3a3]">
        {isExpanded
          ? project.description
          : project.description.substring(0, 100)}
        <span
          className="ml-[5px] cursor-pointer text-[#f0c14b] hover:text-[#e57e31] transition-colors duration-300"
          onClick={() => onToggle(index)}
          aria-label={isExpanded ? "Show less" : "Show more"}
        >
          {isExpanded ? " Show less" : "...Read more"}
        </span>
      </p>
      <div className="mt-2 xs:mt-3 flex flex-wrap lg:mt-4">
        {project.technologies.map((tech, techIndex) => (
          <p
            key={techIndex}
            className="mb-1.5 xs:mb-2 mr-1.5 xs:mr-2 inline-block rounded-full bg-[#1a1a2e] border border-[#f0c14b] px-2 xs:px-3 py-0.5 xs:py-1 text-xs xs:text-sm font-semibold text-white shadow-sm hover:bg-[#f0c14b] hover:text-[#1a1a2e] transition-colors duration-300"
          >
            {tech}
          </p>
        ))}
      </div>

      {project.github && (
        <div className="mt-3 xs:mt-4 text-xs xs:text-sm text-[#a3a3a3]">
          <div className="flex items-center justify-between px-2 xs:px-4 py-1.5 xs:py-2">
            <span className="text-[#f0c14b] text-xs xs:text-sm">
              Explore the code on GitHub
            </span>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-[#1a1a2e] hover:bg-[#f0c14b] hover:bg-opacity-20 text-[#f0c14b] hover:text-[#e57e31] transition-all duration-300 cursor-pointer border border-[#f0c14b] hover:border-[#e57e31] hover:scale-110"
              title="View Source Code"
              style={{ zIndex: 10 }}
            >
              <FaGithub className="text-sm xs:text-base" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
});

ProjectCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    github: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

// Add display name for debugging purposes
ProjectCard.displayName = "ProjectCard";

function Cards() {
  const [showFullDescription, setShowFullDescription] = useState(null);

  // Memoize the projects to display
  const projectsToDisplay = useMemo(
    () => ProjectsList.projects.slice(0, 4),
    []
  );

  const toggleDescription = useCallback((index) => {
    setShowFullDescription((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  return (
    <>
      {projectsToDisplay.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          index={index}
          isExpanded={showFullDescription === index}
          onToggle={toggleDescription}
        />
      ))}
    </>
  );
}

export default Cards;
