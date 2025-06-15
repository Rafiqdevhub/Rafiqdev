import { useState, useMemo } from "react";
import { UserData } from "../data/UserData";
import { skillsData } from "../data/SkillsData";

function About() {
  const { about } = UserData;
  const [activeTab, setActiveTab] = useState("languages");
  const [animateSkills] = useState(false);
  const skillCategories = useMemo(
    () => ({
      languages: ["Javascript", "Typescript", "Python", "golang"],
      frontend: [
        "html",
        "CSS",
        "React",
        "Next JS",
        "Tailwind",
        "MaterialUI",
        "Radix UI",
        "Shadcn UI",
        "Headless UI",
        "NativeWind",
        "Chart.js",
        "react-chartjs-2",
      ],
      backend: [
        "NodeJS",
        "Express",
        "FastAPI",
        "Flask",
        "Django",
        "Mongoose",
        "Pydantic",
      ],
      mobile: [
        "React Native",
        "Expo",
        "Expo Router",
        "React Native Reanimated",
        "AsyncStorage",
      ],
      database: [
        "MongoDB",
        "PostgreSQL",
        "Supabase",
        "Firebase",
        "appwrite",
        "Prisma ORM",
        "neondb",
      ],
      "AI/ML": [
        "pandas",
        "NumPy",
        "TensorFlow",
        "PyTorch",
        "OpenAI",
        "Google Gemini",
        "Hugging Face",
        "LangChain",
        "Claude AI",
        "Deepseek r1",
        "OpenCV",
        "Ultralytics",
        "FAISS",
        "Sentence Transformer",
        "Ollama",
      ],
      devOps: ["Git", "Github", "Docker", "Ubuntu", "Sentry", "Upstash"],
      tools: [
        "ViteJS",
        "Figma",
        "Canva",
        "Stripe",
        "Nginx",
        "Postman",
        "JWT",
        "Clerk Auth",
        "Arcjet",
        "Nodemailer",
        "PyAutoGUI",
        "Pillow",
        "PyWhatKit",
        "QRcode",
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

  const paragraphs = about.split("\n").filter((p) => p.trim());

  return (
    <div className="min-h-screen w-full pb-20 xs:pb-24">
      <div className="flex flex-col items-center justify-center pt-24 xs:pt-28">
        <h1 className="font-poppins text-3xl xs:text-4xl font-bold text-white md:text-5xl mb-4">
          About
        </h1>
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
          <div className="relative mb-16">
            <h2 className="text-center font-poppins text-2xl xs:text-3xl md:text-4xl font-bold text-white">
              Professional <span className="text-[#f0c14b]">Skillset</span>
            </h2>
            <div className="absolute left-1/2 -bottom-4 w-24 h-1 bg-gradient-to-r from-transparent via-[#f0c14b] to-transparent transform -translate-x-1/2"></div>
          </div>
          <div className="relative mb-12 flex flex-wrap justify-center gap-3 px-4">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f0c14b]/5 to-transparent rounded-2xl blur-3xl -z-10"></div>
            {Object.keys(skillCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`group relative rounded-xl px-6 py-3 text-sm xs:text-base font-medium transition-all duration-300 
                  ${
                    activeTab === category
                      ? "bg-gradient-to-r from-[#f0c14b] to-[#e6a323] text-[#1a1a2e] shadow-lg shadow-[#f0c14b]/30 scale-105"
                      : "bg-[#1a1a2e]/80 text-[#a3a3a3] hover:bg-[#252538] hover:text-[#f0c14b] hover:shadow-md hover:shadow-[#f0c14b]/10"
                  }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  {activeTab === category && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1a1a2e] animate-pulse"></span>
                  )}
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f0c14b]/20 to-[#e6a323]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                {activeTab === category && (
                  <span className="absolute -bottom-1.5 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full bg-[#f0c14b] shadow-glow"></span>
                )}
              </button>
            ))}
          </div>
          <div
            className={`grid grid-cols-2 gap-5 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 ${
              animateSkills ? "animate-fade-in" : ""
            }`}
          >
            {skills
              .filter((skill) => skill.category === activeTab)
              .map((skill) => (
                <div
                  key={skill.id}
                  className="group relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#252538] p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#f0c14b]/20 cursor-pointer"
                >
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#f0c14b]/20 to-[#e6a323]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="relative text-center text-base xs:text-lg font-medium tracking-wide text-[#a3a3a3] transition-colors duration-300 group-hover:text-white">
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
