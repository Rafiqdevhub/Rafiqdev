import { ProjectsList } from "../data/ProjectsList";
import { FaSearch } from "react-icons/fa";
import { useState, useCallback, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import ArchiveProjectCard from "../components/ArchiveProjectCard";
import ProjectListHeader from "../components/ProjectListHeader";

function ArchiveProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [expandedDescriptions, setExpandedDescriptions] = useState(new Set());

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
    <div className="min-h-screen relative overflow-hidden">
      <Toaster />

      {/* Animated background orbs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#f0c14b]/10 to-[#e57e31]/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-[#f0c14b]/5 to-[#e57e31]/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <ProjectListHeader />

      <div className="w-full pb-8 xs:pb-12 pt-24 relative z-10">
        <div className="mx-auto w-[94%] xs:w-[90%] space-y-6 xs:space-y-8">
          {/* Header section with glassmorphism */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a2e]/60 to-[#16213e]/60 backdrop-blur-md p-6 xs:p-8 border border-[#f0c14b]/20">
            {/* Decorative top line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f0c14b] to-transparent"></div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#f0c14b]/30 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#f0c14b]/30 rounded-br-2xl"></div>

            <div className="relative z-10 text-center space-y-3">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#f0c14b] animate-pulse"></div>
                <span className="text-xs font-medium text-[#f0c14b]/70 uppercase tracking-wider">
                  Complete Project Archive
                </span>
                <div className="w-2 h-2 rounded-full bg-[#f0c14b] animate-pulse"></div>
              </div>

              <p className="text-slate-300 text-sm xs:text-base leading-relaxed max-w-3xl mx-auto">
                Explore my complete collection of projects. For detailed
                information about any project,{" "}
                <span className="text-[#f0c14b] hover:text-[#e57e31] font-semibold cursor-pointer transition-colors duration-300 relative group">
                  feel free to contact me
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#f0c14b] group-hover:w-full transition-all duration-300"></span>
                </span>
                . I&apos;m always happy to share more insights!
              </p>

              {/* Stats badges */}
              <div className="flex flex-wrap items-center justify-center gap-3 xs:gap-4 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0c14b]/10 border border-[#f0c14b]/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-xs xs:text-sm font-semibold text-slate-200">
                    {ProjectsList.projects.length} Projects
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0c14b]/10 border border-[#f0c14b]/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                  <span className="text-xs xs:text-sm font-semibold text-slate-200">
                    {uniqueTechnologies.length} Technologies
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0c14b]/10 border border-[#f0c14b]/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                  <span className="text-xs xs:text-sm font-semibold text-slate-200">
                    {filteredProjects.length} Showing
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters section with premium design */}
          <div className="flex flex-col md:flex-row gap-3 xs:gap-4 items-center">
            {/* Search input */}
            <div className="relative w-full md:flex-1 group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f0c14b]/70 text-sm z-10 group-focus-within:text-[#f0c14b] transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search projects by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 backdrop-blur-sm text-white pl-11 pr-4 py-3 rounded-xl border border-[#f0c14b]/20 focus:border-[#f0c14b]/60 hover:border-[#f0c14b]/40 transition-all duration-300 outline-none text-sm placeholder:text-slate-500 shadow-lg focus:shadow-[0_0_20px_rgba(240,193,75,0.2)]"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f0c14b]/0 via-[#f0c14b]/5 to-[#f0c14b]/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>

            {/* Tech filter dropdown */}
            <div className="relative w-full md:w-80 group">
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="w-full bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 backdrop-blur-sm text-white px-4 py-3 rounded-xl border border-[#f0c14b]/20 focus:border-[#f0c14b]/60 hover:border-[#f0c14b]/40 transition-all duration-300 outline-none cursor-pointer text-sm appearance-none shadow-lg focus:shadow-[0_0_20px_rgba(240,193,75,0.2)]"
              >
                <option value="" className="bg-[#1a1a2e] text-white">
                  All Technologies
                </option>
                {uniqueTechnologies.map((tech) => (
                  <option
                    key={tech}
                    value={tech}
                    className="bg-[#1a1a2e] text-white"
                  >
                    {tech}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#f0c14b]/70">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Results count */}
          {searchTerm || selectedTech ? (
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#1a1a2e]/40 backdrop-blur-sm border border-[#f0c14b]/10">
              <span className="text-sm text-slate-400">
                Found{" "}
                <span className="text-[#f0c14b] font-semibold">
                  {filteredProjects.length}
                </span>{" "}
                project{filteredProjects.length !== 1 ? "s" : ""}
              </span>
              {(searchTerm || selectedTech) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTech("");
                  }}
                  className="text-xs text-[#f0c14b] hover:text-[#e57e31] font-medium transition-colors duration-300"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : null}

          {/* Projects grid */}
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

          {/* No results message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16 px-4">
              <div className="relative inline-block">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#f0c14b]/20 to-[#e57e31]/20 border border-[#f0c14b]/30 flex items-center justify-center">
                  <FaSearch className="text-3xl text-[#f0c14b]/50" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#f0c14b]/10 to-[#e57e31]/10 rounded-full blur-xl"></div>
              </div>
              <h3 className="font-tinos text-xl font-bold text-white mb-2">
                No Projects Found
              </h3>
              <p className="text-slate-400 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTech("");
                }}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#f0c14b] to-[#e57e31] text-[#0f0f23] font-semibold hover:scale-105 transition-transform duration-300"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArchiveProjects;
