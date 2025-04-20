import { ProjectsList } from "../data/ProjectsList";
import { FaArrowLeft, FaGithub, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ArchiveProjects() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("");

  // Get unique technologies from all projects
  const uniqueTechnologies = [
    ...new Set(
      ProjectsList.projects.flatMap((project) => project.technologies)
    ),
  ].sort();

  // Filter projects based on search term and selected technology
  const filteredProjects = ProjectsList.projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech =
      !selectedTech || project.technologies.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  return (
    <div className="min-h-screen w-full pb-8 xs:pb-12">
      <div
        onClick={() => navigate(-1)}
        className="ml-[5%] flex gap-2 pt-4 xs:pt-5 text-gray-200 hover:text-[#c59629] transition-colors duration-300 items-center cursor-pointer"
      >
        <FaArrowLeft className="text-xs xs:text-base" />
        <span className="text-sm xs:text-base">Portfolio</span>
      </div>

      <div className="mx-auto w-[94%] xs:w-[90%] space-y-4 xs:space-y-5 pt-3 xs:pt-4">
        <div className="text-center space-y-1">
          <h1 className="font-poppins text-2xl xs:text-3xl font-bold text-white">
            Project <span className="text-[#f0c14b]">Archive</span>
          </h1>
          <p className="text-[#a3a3a3] text-xs xs:text-sm">
            Explore my complete collection of projects
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 xs:gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/2">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3a3a3] text-xs xs:text-sm" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1a1a2e] text-white pl-8 xs:pl-10 pr-3 xs:pr-4 py-2 rounded-lg border border-[#2a2a4e] focus:border-[#f0c14b] transition-all duration-300 outline-none text-xs xs:text-sm"
            />
          </div>

          <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="w-full md:w-1/3 bg-[#1a1a2e] text-white px-3 xs:px-4 py-2 rounded-lg border border-[#2a2a4e] focus:border-[#f0c14b] transition-all duration-300 outline-none cursor-pointer text-xs xs:text-sm"
          >
            <option value="">All Technologies</option>
            {uniqueTechnologies.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-[#1a1a2e] rounded-lg p-4 xs:p-6 border border-[#2a2a4e] shadow-md hover:shadow-[0_8px_30px_rgba(240,193,75,0.2)] transition-shadow duration-300"
            >
              <h2 className="font-poppins text-base xs:text-xl font-bold text-white mb-2 xs:mb-3">
                {project.name}
              </h2>

              <p className="text-[#a3a3a3] mb-3 xs:mb-4 line-clamp-3 text-xs xs:text-sm">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 xs:gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 xs:px-3 py-0.5 xs:py-1 text-xs font-medium text-white bg-[#2a2a4e] rounded-full hover:bg-[#f0c14b] hover:text-[#1a1a2e] transition-colors duration-300 cursor-pointer"
                    onClick={() => setSelectedTech(tech)}
                  >
                    {tech}
                  </span>
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
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-8 xs:py-12">
            <p className="text-[#a3a3a3] text-base xs:text-lg">
              No projects found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArchiveProjects;
