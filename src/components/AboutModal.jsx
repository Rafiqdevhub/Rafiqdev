import { useMemo, useState } from "react";
import { UserData } from "../data/UserData";
import { skillsData } from "../data/SkillsData";
import profileImg from "../Assets/images/profile.png";
import PropTypes from "prop-types";

const AboutModal = ({ isOpen, onClose }) => {
  const { about } = UserData;
  const [activeTab, setActiveTab] = useState("languages");
  const [animateSkills] = useState(false);

  const skillCategories = useMemo(
    () => ({
      languages: ["JavaScript", "TypeScript", "Python"],
      frontend: ["HTML", "CSS", "JavaScript", "React.js", "Next.js"],
      backend: [
        "Node.js",
        "Express.js",
        "Python",
        "FastAPI",
        "Django",
        "Flask",
        "RESTful APIs",
        "Third-party APIs",
      ],
      mobile: ["React Native", "Expo"],
      database: ["MongoDB", "PostgreSQL", "MySQL"],

      "ai-ml": [
        "Machine Learning",
        "OpenAI",
        "Gemini API",
        "Hugging Face",
        "VAPI",
        "Retrieval-Augmented Generation",
        "LLM integration",
      ],
      "cloud-deployment": [
        "Supabase",
        "Firebase",
        "NeonDB",
        "Vercel",
        "Netlify",
      ],
      "sdet-devops": [
        "Test Automation",
        "Git",
        "GitHub",
        "CI/CD",
        "Docker",
        "Kubernetes",
        "Postman",
      ],
    }),
    []
  );

  const skills = useMemo(
    () =>
      skillsData.map((skill, id) => ({
        id,
        name: skill,
        category:
          Object.keys(skillCategories).find((category) =>
            skillCategories[category].includes(skill)
          ) || "other",
      })),
    [skillCategories]
  );

  const paragraphs = (about || "").split("\n").filter((p) => p.trim());

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-3 xs:px-4"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-full max-w-[95vw] sm:max-w-5xl h-[90dvh] sm:h-auto max-h-[90dvh] sm:max-h-[85vh] overflow-hidden rounded-none sm:rounded-2xl border border-[#f0c14b]/20 bg-gradient-to-br from-[#11121a] to-[#1a1b26] shadow-2xl flex flex-col">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 m-2 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/80 hover:bg-white/10 z-10"
        >
          Close
        </button>

        <div className="flex items-center gap-4 p-5 xs:p-6 pb-0">
          <img
            src={profileImg}
            alt="Profile"
            className="h-12 w-12 xs:h-14 xs:w-14 rounded-full object-cover ring-2 ring-[#f0c14b]/40"
            loading="lazy"
          />
          <div>
            <h2 className="text-xl xs:text-2xl font-bold text-white">
              About Me
            </h2>
            <p className="text-xs text-[#a3a3a3]">Quick intro</p>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-4 xs:px-6 pb-6 pt-4 space-y-8">
          <div className="prose prose-invert prose-lg max-w-none space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-sm xs:text-base text-[#a3a3a3] leading-relaxed tracking-wide p-3 xs:p-4 rounded-lg border border-[#242442] shadow-lg transition-all duration-500 ease-in-out hover:text-white hover:border-[#f0c14b]/30 hover:shadow-[#f0c14b]/10 hover:scale-[1.01] ${
                  index === 0
                    ? "bg-gradient-to-br from-[#1a1a2e]/80 to-[#252538]/80 backdrop-blur-sm"
                    : "bg-gradient-to-br from-[#1a1a2e]/50 to-[#252538]/50"
                }`}
              >
                {paragraph.trim()}
              </p>
            ))}
          </div>

          <div className="mx-auto w-full">
            <div className="relative mb-6">
              <h3 className="text-center font-poppins text-xl xs:text-2xl font-bold text-white">
                Professional <span className="text-[#f0c14b]">Skillset</span>
              </h3>
              <div className="absolute left-1/2 -bottom-3 w-24 h-1 bg-gradient-to-r from-transparent via-[#f0c14b] to-transparent transform -translate-x-1/2"></div>
            </div>
            <div className="relative mb-6 flex flex-wrap justify-center gap-2 px-1 xs:px-2">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f0c14b]/5 to-transparent rounded-2xl blur-3xl -z-10" />
              {Object.keys(skillCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`group relative rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-medium transition-all duration-300 ${
                    activeTab === category
                      ? "bg-gradient-to-r from-[#f0c14b] to-[#e6a323] text-[#1a1a2e] shadow-lg shadow-[#f0c14b]/30 scale-105"
                      : "bg-[#1a1a2e]/80 text-[#a3a3a3] hover:bg-[#252538] hover:text-[#f0c14b] hover:shadow-md hover:shadow-[#f0c14b]/10"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {category === "languages"
                      ? "Languages"
                      : category === "frontend"
                      ? "Frontend"
                      : category === "backend"
                      ? "Backend"
                      : category === "mobile"
                      ? "Mobile"
                      : category === "database"
                      ? "Database"
                      : category === "api-integration"
                      ? "API Integration"
                      : category === "ai-ml"
                      ? "AI/ML"
                      : category === "cloud-deployment"
                      ? "Cloud & Deployment"
                      : category === "sdet-devops"
                      ? "SDET & DevOps"
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                    {activeTab === category && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1a1a2e] animate-pulse"></span>
                    )}
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f0c14b]/20 to-[#e6a323]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  {activeTab === category && (
                    <span className="absolute -bottom-1.5 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-full bg-[#f0c14b] shadow-glow"></span>
                  )}
                </button>
              ))}
            </div>
            <div
              className={`grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ${
                animateSkills ? "animate-fade-in" : ""
              }`}
            >
              {skills
                .filter((skill) => skill.category === activeTab)
                .map((skill) => (
                  <div
                    key={skill.id}
                    className="group relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#252538] p-3 xs:p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#f0c14b]/20 cursor-pointer"
                  >
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#f0c14b]/20 to-[#e6a323]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <p className="relative text-center text-sm xs:text-base font-medium tracking-wide text-[#a3a3a3] transition-colors duration-300 group-hover:text-white">
                      {skill.name}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;

AboutModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
