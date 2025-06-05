import { ProjectsList } from "../data/ProjectsList";
import { FaSearch } from "react-icons/fa";
import { useState, useCallback, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import ArchiveProjectCard from "../components/ArchiveProjectCard";
import ProjectListHeader from "../components/ProjectListHeader";

/* Performance: Implement virtualization and optimizations */
function ArchiveProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [expandedDescriptions, setExpandedDescriptions] = useState(new Set());

  /* Performance: Memoize callbacks */
  const toggleDescription = useCallback((index) => {
    setExpandedDescriptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const handleTechClick = useCallback((tech) => {
    setSelectedTech(tech);
  }, []);

  /* Performance: Memoize derived data */
  const uniqueTechnologies = useMemo(
    () => [
      ...new Set(
        ProjectsList.projects.flatMap((project) => project.technologies)
      ),
    ],
    []
  );

  const filteredProjects = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return ProjectsList.projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower);
      const matchesTech =
        !selectedTech || project.technologies.includes(selectedTech);
      return matchesSearch && matchesTech;
    });
  }, [searchTerm, selectedTech]);

  return (
    <div className="min-h-screen relative">
      <Toaster />
      <ProjectListHeader />
      <div className="w-full pb-8 xs:pb-12 pt-24">
        <div className="mx-auto w-[94%] xs:w-[90%] space-y-4 xs:space-y-5">
          <div className="text-center space-y-2">
            <p className="text-[#a3a3a3] text-sm">
              Explore my complete collection of projects. For detailed
              information about any project,
              <span className="text-[#f0c14b] hover:underline cursor-pointer">
                feel free to contact me
              </span>
              . I&apos;m always happy to share more insights!
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
              <ArchiveProjectCard
                key={index}
                project={project}
                isExpanded={expandedDescriptions.has(index)}
                onToggle={() => toggleDescription(index)}
                onTechClick={handleTechClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArchiveProjects;
