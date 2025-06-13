import { useState, useMemo } from "react";
import { UserData } from "../data/UserData";
import { skillsData } from "../data/SkillsData";
import { skillsImage } from "../utils/SkillsImage";

function About() {
  const { about } = UserData;
  const [activeTab, setActiveTab] = useState("frontend");
  const [animateSkills] = useState(false);

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

  const paragraphs = about.split("\n\n").filter((p) => p.trim());

  return (
    <div className="min-h-screen w-full pb-20 xs:pb-24">
      <div className="flex flex-col items-center justify-center pt-24 xs:pt-28">
        <h1 className="font-poppins text-3xl xs:text-4xl font-bold text-white md:text-5xl mb-4">
          About
        </h1>{" "}
        <p className="text-[#a3a3a3] text-sm xs:text-base max-w-2xl text-center mb-8">
          Transforming ideas into elegant solutions, a passion for innovation
          and user-centric design
        </p>
        <div className="mx-auto w-[90%] max-w-4xl">
          <div className="prose prose-invert prose-lg max-w-none space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base xs:text-lg text-[#a3a3a3] leading-relaxed tracking-wide first-letter:text-xl first-letter:font-semibold first-letter:text-[#f0c14b] hover:text-white transition-colors duration-300"
              >
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-16 w-[94%] xs:w-[90%] sm:w-[85%] md:w-[80%]">
          <h2 className="mb-8 text-center font-poppins text-2xl xs:text-3xl font-bold text-white">
            Professional <span className="text-[#f0c14b]">Skillset</span>
          </h2>
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            {Object.keys(skillCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`rounded-full px-4 py-2 text-sm xs:text-base transition-all duration-300 ${
                  activeTab === category
                    ? "bg-[#f0c14b] text-[#1a1a2e]"
                    : "bg-[#1a1a2e] text-[#a3a3a3] hover:bg-[#f0c14b] hover:bg-opacity-20 hover:text-[#f0c14b]"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <div
            className={`grid grid-cols-2 gap-4 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 ${
              animateSkills ? "animate-fade-in" : ""
            }`}
          >
            {skills
              .filter((skill) => skill.category === activeTab)
              .map((skill) => (
                <div
                  key={skill.id}
                  className="group flex flex-col items-center gap-2 rounded-lg bg-[#1a1a2e] p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#f0c14b]/20"
                >
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <p className="text-center text-xs xs:text-sm text-[#a3a3a3] group-hover:text-[#f0c14b]">
                    {skill.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
