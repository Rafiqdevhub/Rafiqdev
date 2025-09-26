import { memo, useMemo, useState, useCallback } from "react";
import {
  FaCode,
  FaDatabase,
  FaMobile,
  FaTools,
  FaRocket,
  FaStar,
} from "react-icons/fa";
import { UserData } from "../data/UserData";
import RafiqImageSrc from "../Assets/images/profile.png";
import PropTypes from "prop-types";

const SkillItem = memo(({ icon: Icon, text, delay, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 
                 border border-slate-700/50 backdrop-blur-sm hover:border-yellow-400/50 
                 transition-all duration-500 cursor-pointer p-4 hover:shadow-2xl hover:shadow-yellow-400/10"
      style={{
        animationDelay: `${delay * 150}ms`,
        transform: isHovered
          ? "translateY(-8px) scale(1.02)"
          : "translateY(0) scale(1)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10 flex flex-col items-center text-center space-y-2">
        <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg group-hover:shadow-yellow-400/25 transition-all duration-300">
          <Icon className="text-white text-xl" />
        </div>
        <span className="text-white font-semibold text-sm tracking-wide">
          {text}
        </span>
        <span className="text-slate-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {description}
        </span>
      </div>
    </div>
  );
});

SkillItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  delay: PropTypes.number,
  description: PropTypes.string,
};

SkillItem.displayName = "SkillItem";

const AchievementBadge = memo(({ icon: Icon, text, delay }) => (
  <div
    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/10 to-orange-500/10 
               border border-yellow-400/20 backdrop-blur-sm animate-fadeInUp"
    style={{ animationDelay: `${delay}ms` }}
  >
    <Icon className="text-yellow-400 text-sm" />
    <span className="text-slate-300 text-sm font-medium">{text}</span>
  </div>
));

AchievementBadge.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  delay: PropTypes.number,
};

AchievementBadge.displayName = "AchievementBadge";

function Home() {
  const skillItems = useMemo(
    () => [
      {
        Icon: FaCode,
        text: "FULL-STACK",
        description: "Modern Web Development",
      },
      { Icon: FaDatabase, text: "DATABASE", description: "Scalable Solutions" },
      { Icon: FaMobile, text: "MOBILE", description: "Cross-Platform Apps" },
      { Icon: FaTools, text: "DEVOPS", description: "Cloud & Automation" },
    ],
    []
  );

  const achievements = useMemo(
    () => [
      { Icon: FaRocket, text: "Problem Solver", delay: 800 },
      { Icon: FaStar, text: "AI/ML Engineer", delay: 1000 },
      { Icon: FaCode, text: "Full-Stack Expert", delay: 1200 },
    ],
    []
  );

  return (
    <div className="relative min-h-screen w-full flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-yellow-400/3 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto w-[94%] xxs:w-[92%] sm:w-[90%] lg:w-[85%] xl:w-[80%] py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20 backdrop-blur-sm animate-fadeInUp">
              <span className="text-yellow-400 text-sm font-medium">
                👋 Welcome to my portfolio
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-poppins font-bold text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight">
                Hello, I&apos;m{" "}
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-300 bg-clip-text text-transparent">
                  {UserData.name.split(" ")[0]}
                </span>
              </h1>

              <div className="relative">
                <div className="absolute -left-4 top-1/2 w-1 h-12 bg-gradient-to-b from-yellow-400 to-orange-500 transform -translate-y-1/2 rounded-full opacity-60"></div>
                <div className="pl-6">
                  <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl text-slate-300 font-light leading-tight">
                    <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-300 bg-clip-text text-transparent font-semibold">
                      Full-Stack Developer
                    </span>{" "}
                    &{" "}
                    <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-300 bg-clip-text text-transparent font-semibold">
                      AI Engineer
                    </span>
                  </h2>
                  <p className="text-slate-400 text-lg sm:text-xl mt-2 font-light">
                    Transforming Ideas into Digital Reality
                  </p>
                </div>
              </div>
            </div>

            <p
              className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl animate-fadeInUp"
              style={{ animationDelay: "400ms" }}
            >
              Passionate about crafting exceptional digital experiences through
              innovative full-stack development and AI-powered solutions. I
              specialize in building scalable applications that drive business
              growth and user engagement.
            </p>

            <div
              className="flex flex-wrap justify-center lg:justify-start gap-3 animate-fadeInUp"
              style={{ animationDelay: "600ms" }}
            >
              {achievements.map((achievement, index) => (
                <AchievementBadge
                  key={index}
                  icon={achievement.Icon}
                  text={achievement.text}
                  delay={achievement.delay}
                />
              ))}
            </div>

            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fadeInUp"
              style={{ animationDelay: "600ms" }}
            >
              {skillItems.map((item, index) => (
                <SkillItem
                  key={index}
                  icon={item.Icon}
                  text={item.text}
                  description={item.description}
                  delay={index}
                />
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-2xl animate-pulse"></div>

              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border border-slate-700/50"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-full backdrop-blur-sm border border-slate-600/30"></div>

                <div className="absolute inset-6 rounded-full overflow-hidden border-4 border-gradient-to-br from-yellow-400/50 to-orange-500/50">
                  <img
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    src={RafiqImageSrc}
                    alt="Muhammad Rafiq - Full-Stack Developer & AI Engineer"
                    loading="eager"
                    decoding="async"
                    width="320"
                    height="320"
                  />
                </div>

                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <FaCode className="text-slate-900 text-sm" />
                </div>
                <div
                  className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-bounce"
                  style={{ animationDelay: "1s" }}
                >
                  <FaRocket className="text-white text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Home);
