import { memo, useMemo, useState, useCallback } from "react";
import { FaCode, FaDatabase, FaMobile, FaTools } from "react-icons/fa";
import TypewriterText from "../components/TypewriterText";
import { UserData } from "../data/UserData";
import RafiqImageSrc from "../Assets/images/profile.png";
import PropTypes from "prop-types";

const SkillItem = memo(({ icon: Icon, text, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      className={`flex items-center rounded-xl border border-[#242442] px-4 py-2.5 
                 hover:border-[#f0c14b] hover:shadow-[0_0_25px_rgba(240,193,75,0.25)]
                 transition-all duration-500 transform hover:scale-105
                 cursor-pointer relative z-10 overflow-hidden shadow-lg shadow-black/20 text-sm
                 backdrop-blur-sm bg-gradient-to-r from-[#1a1a2e]/80 to-[#242442]/80
                 before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#f0c14b]/0 before:to-[#f0c14b]/10 
                 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100`}
      style={{
        animationDelay: `${delay * 150}ms`,
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.3s ease-out",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon className="mr-2 text-[#f0c14b]" />
      <span className="text-[#a3a3a3]">{text}</span>
    </div>
  );
});

SkillItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  delay: PropTypes.number,
};

SkillItem.displayName = "SkillItem";

function Home() {
  const skillItems = useMemo(
    () => [
      { Icon: FaCode, text: "FULL-STACK" },
      { Icon: FaDatabase, text: "DATABASE" },
      { Icon: FaMobile, text: "MOBILE" },
      { Icon: FaTools, text: "DEVOPS" },
    ],
    []
  );

  return (
    <div className="relative min-h-[60vh] xxs:min-h-[65vh] md:min-h-[75vh] w-full flex items-center pt-4 pb-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0c14b]/5 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f0c14b10_0%,_transparent_50%)]"></div>

      <div className="mx-auto mt-0 mb-0 xxs:mb-2 sm:mb-4 flex w-[94%] xxs:w-[92%] sm:w-[90%] flex-col items-center sm:flex-row lg:w-[85%] xl:w-[80%] lg:justify-between relative">
        <div className="w-full lg:w-[55%] flex flex-col lg:pr-8">
          <h1 className="font-poppins font-bold text-left text-xl xxs:text-2xl xs:text-3xl text-white lg:text-4xl xl:text-5xl relative">
            Hello, I&apos;m
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f0c14b] to-[#e6a323] relative">
              {UserData.name}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#f0c14b] to-transparent"></span>
            </span>
          </h1>
          <div className="relative h-[50px] xxs:h-[60px] xs:h-[70px] lg:h-[75px] xl:h-[85px] overflow-hidden">
            <div className="text-wrap break-words max-w-full text-sm xxs:text-base xs:text-lg sm:text-xl lg:text-2xl">
              <div className="relative">
                <div className="absolute -left-2 top-1/2 w-1 h-1/2 bg-gradient-to-b from-[#f0c14b] to-transparent transform -translate-y-1/2"></div>
                <TypewriterText options={UserData.typewriterOptions} />
              </div>
            </div>
          </div>
          <div className="mt-6 xxs:mt-8 xs:mt-10 flex flex-wrap gap-3 xxs:gap-4 text-[#a3a3a3] text-xs">
            {skillItems.map((item, index) => (
              <SkillItem
                key={index}
                icon={item.Icon}
                text={item.text}
                delay={index}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 xxs:mt-6 sm:mt-8 lg:mt-4 relative max-w-[320px] w-full mx-auto">
          <div className="w-full pb-[100%] relative overflow-hidden rounded-full border-4 border-[#1a1a2e] hover:border-[#f0c14b] transition-all duration-300 shadow-2xl bg-[#1a1a2e]">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src={RafiqImageSrc}
              alt="Developer profile"
              loading="lazy"
              decoding="async"
              width="320"
              height="320"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Home);
