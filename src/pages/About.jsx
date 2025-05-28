import { useState, useEffect, useMemo } from "react";
import { UserData } from "../data/UserData";
import { skillsData } from "../data/SkillsData";
import { skillsImage } from "../utils/SkillsImage";
import AboutImage from "../Assets/images/aboutImg.jpg";

function About() {
  const { about } = UserData;
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("frontend");
  const [animateSkills, setAnimateSkills] = useState(false);

  const skillCategories = useMemo(
    () => ({
      frontend: [
        "html",
        "CSS",
        "Javascript",
        "Typescript",
        "React",
        "Next JS",
        "ViteJS",
        "Tailwind",
        "Bootstrap",
        "MaterialUI",
      ],
      backend: [
        "NodeJS",
        "Express",
        "Python",
        "Django",
        "Flask",
        "FastAPI",
        "golang",
      ],
      database: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"],
      devOps: ["Git", "Github", "Docker", "Nginx", "Ubuntu"],
      tools: ["Figma", "Canva", "Stripe"],
    }),
    []
  );

  const skills = useMemo(
    () =>
      skillsData.map((skill, id) => ({
        id,
        name: skill,
        image: skillsImage(skill),
        category:
          Object.keys(skillCategories).find((category) =>
            skillCategories[category].includes(skill)
          ) || "other",
      })),
    [skillCategories]
  );

  const getAnimationDelay = (index) => {
    return `${index * 0.1}s`;
  };

  useEffect(() => {
    const img = new Image();
    img.src = AboutImage;
    img.onload = () => setIsLoaded(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
            if (entry.target.id === "skills-section") {
              setAnimateSkills(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    setTimeout(() => {
      setAnimateSkills(true);
    }, 800);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full pb-6 xxs:pb-8 xs:pb-10">
      <div className="mx-auto w-[96%] xxs:w-[94%] xs:w-[90%] rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#12122a] p-3 xxs:p-4 xs:p-6 sm:p-8 shadow-2xl border border-[#1a1a2e] hover:shadow-[0_0_20px_rgba(240,193,75,0.3)] transition-all duration-500">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6 lg:space-x-8">
          <div
            className="flex-1 space-y-3 xxs:space-y-4 xs:space-y-6 animate-on-scroll"
            style={{ animationDelay: "0.2s" }}
          >
            <h1 className="text-2xl xxs:text-3xl xs:text-4xl font-bold text-white mb-2 xxs:mb-3 xs:mb-4 relative">
              <span className="text-[#f0c14b] relative after:content-[''] after:absolute after:w-full after:h-[3px] after:bg-[#f0c14b] after:bottom-0 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                About
              </span>{" "}
              <span className="relative after:content-[''] after:absolute after:w-full after:h-[3px] after:bg-white after:bottom-0 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                Me
              </span>
            </h1>
            <p className="font-poppins text-sm xxs:text-base xs:text-lg leading-relaxed text-[#a3a3a3]">
              {about}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 xxs:gap-3 xs:gap-4 mt-3 xxs:mt-4 xs:mt-6">
              <div className="group relative p-2 xxs:p-3 xs:p-4 bg-[#12122a]/50 rounded-lg overflow-hidden transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-[#f0c14b]/10 to-[#3498db]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#f0c14b] to-[#e57e31] group-hover:scale-y-110 transition-transform duration-300 origin-center"></div>
                <div className="relative z-10 cursor-pointer">
                  <p className="font-poppins font-bold mb-0.5 xxs:mb-1 xs:mb-2 text-xs xxs:text-sm xs:text-base text-transparent bg-clip-text bg-gradient-to-r from-[#f0c14b] to-[#e57e31] group-hover:from-[#e57e31] group-hover:to-[#f0c14b] transition-all duration-500">
                    Full Stack Expert
                  </p>
                  <p className="text-[#a3a3a3] text-xs xxs:text-xs xs:text-sm group-hover:text-white transition-colors duration-300">
                    End-to-end development specialist
                  </p>
                </div>
              </div>

              <div className="group relative p-2 xxs:p-3 xs:p-4 bg-[#12122a]/50 rounded-lg overflow-hidden transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-[#3498db]/10 to-[#f0c14b]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#3498db] to-[#2980b9] group-hover:scale-y-110 transition-transform duration-300 origin-center"></div>
                <div className="relative z-10 cursor-pointer">
                  <p className="font-poppins font-bold mb-0.5 xxs:mb-1 xs:mb-2 text-xs xxs:text-sm xs:text-base text-transparent bg-clip-text bg-gradient-to-r from-[#3498db] to-[#2980b9] group-hover:from-[#2980b9] group-hover:to-[#3498db] transition-all duration-500">
                    Problem Solver
                  </p>
                  <p className="text-[#a3a3a3] text-xs xxs:text-xs xs:text-sm group-hover:text-white transition-colors duration-300">
                    Creative solutions architect
                  </p>
                </div>
              </div>

              <div className="group relative p-2 xxs:p-3 xs:p-4 bg-[#12122a]/50 rounded-lg overflow-hidden transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-[#9b59b6]/10 to-[#8e44ad]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#9b59b6] to-[#8e44ad] group-hover:scale-y-110 transition-transform duration-300 origin-center"></div>
                <div className="relative z-10 cursor-pointer">
                  <p className="font-poppins font-bold mb-0.5 xxs:mb-1 xs:mb-2 text-xs xxs:text-sm xs:text-base text-transparent bg-clip-text bg-gradient-to-r from-[#9b59b6] to-[#8e44ad] group-hover:from-[#8e44ad] group-hover:to-[#9b59b6] transition-all duration-500">
                    HR Professional
                  </p>
                  <p className="text-[#a3a3a3] text-xs xxs:text-xs xs:text-sm group-hover:text-white transition-colors duration-300">
                    Talent acquisition specialist
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`mt-4 xxs:mt-5 xs:mt-6 md:mt-0 md:w-[350px] lg:w-[400px] transition-all duration-700 ${
              isLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#f0c14b] to-[#3498db] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative">
                <img
                  className="rounded-lg shadow-2xl w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(240,193,75,0.3)]"
                  src={AboutImage}
                  alt="About Muhammad Rafiq"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="skills-section"
        className="mx-auto w-[96%] xxs:w-[94%] xs:w-[90%] rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#12122a] p-3 xxs:p-4 xs:p-6 sm:p-8 shadow-2xl hover:shadow-[0_0_25px_rgba(52,152,219,0.2)] transition-all duration-500 animate-on-scroll mt-6 xxs:mt-8 xs:mt-10"
      >
        <h2 className="text-xl xxs:text-2xl xs:text-3xl font-bold text-white mb-4 xxs:mb-5 xs:mb-6 lg:mb-8 relative inline-block">
          Technical{" "}
          <span className="text-[#f0c14b] relative">
            Expertise
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#f0c14b] to-[#3498db] transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
          </span>
          <div className="absolute -bottom-2 left-0 w-1/3 h-[3px] bg-gradient-to-r from-[#f0c14b] to-transparent animate-pulse"></div>
        </h2>
        <div className="flex flex-wrap gap-1.5 xxs:gap-2 xs:gap-4 mb-4 xxs:mb-5 xs:mb-6 lg:mb-8">
          {Object.keys(skillCategories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-1.5 xxs:px-2 xs:px-4 py-1 xxs:py-1.5 xs:py-2 rounded-full text-xs xxs:text-xs xs:text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg ${
                activeTab === category
                  ? "bg-[#f0c14b] text-[#1a1a2e] shadow-[0_0_10px_rgba(240,193,75,0.3)]"
                  : "bg-[#12122a] text-[#a3a3a3] hover:bg-[#f0c14b] hover:bg-opacity-20 hover:text-white"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 xxs:gap-3 xs:gap-4 lg:gap-6">
          {skills
            .filter((skill) => skill.category === activeTab)
            .map((skill, index) => (
              <div
                key={skill.id}
                className={`group flex flex-col items-center justify-center p-1.5 xxs:p-2 xs:p-4 bg-[#12122a]/50 rounded-lg hover:bg-[#2a2a4e] transition-all duration-500 shadow-md hover:shadow-[0_5px_15px_rgba(52,152,219,0.2)] hover:translate-y-[-5px] ${
                  animateSkills ? "animate-fadeIn" : "opacity-0"
                }`}
                style={{ animationDelay: getAnimationDelay(index) }}
              >
                <div className="relative w-10 h-10 xxs:w-12 xxs:h-12 xs:w-16 xs:h-16 mb-1 xxs:mb-2 xs:mb-3 lg:mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f0c14b] to-[#3498db] rounded-full blur opacity-25 group-hover:opacity-75 transition duration-300 group-hover:animate-pulse"></div>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      className="w-6 h-6 xxs:w-8 xxs:h-8 xs:w-10 xs:h-10 transition-all duration-500 group-hover:scale-110 group-hover:animate-spin-slow filter group-hover:drop-shadow-[0_0_8px_rgba(240,193,75,0.6)]"
                      src={skill.image}
                      alt={skill.name}
                      loading="lazy"
                    />
                  </div>
                </div>
                <p className="text-[#a3a3a3] text-[10px] xxs:text-xs xs:text-sm font-medium group-hover:text-white transition-colors duration-300 text-center truncate w-full px-1">
                  {skill.name}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default About;
