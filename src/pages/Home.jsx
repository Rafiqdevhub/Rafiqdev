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
      className={`flex items-center rounded-md border border-[#242442] px-3 py-2 
                 hover:border-[#f0c14b] hover:shadow-[0_0_18px_rgba(240,193,75,0.35)]
                 transition-all duration-500 transform hover:scale-110
                 cursor-pointer relative z-10 overflow-hidden shadow-md shadow-black/30 text-sm`}
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
    <div className="min-h-[60vh] xxs:min-h-[65vh] md:min-h-[75vh] w-full flex items-center pt-4 pb-0">
      <div className="mx-auto mt-0 mb-0 xxs:mb-2 sm:mb-4 flex w-[94%] xxs:w-[92%] sm:w-[90%] flex-col items-center sm:flex-row lg:w-[85%] xl:w-[80%] lg:justify-between">
        <div className="w-full lg:w-[55%] flex flex-col lg:pr-8">
          <h1 className="font-poppins font-bold text-left text-xl xxs:text-2xl xs:text-3xl text-white lg:text-4xl xl:text-5xl">
            Hello, I&apos;m{" "}
            <span className="text-[#f0c14b]">{UserData.name}</span>
          </h1>
          <div className="h-[50px] xxs:h-[60px] xs:h-[70px] lg:h-[75px] xl:h-[85px] overflow-hidden">
            <div className="text-wrap break-words max-w-full text-sm xxs:text-base xs:text-lg sm:text-xl lg:text-2xl">
              <TypewriterText options={UserData.typewriterOptions} />
            </div>
          </div>
          <div className="mt-3 xxs:mt-4 xs:mt-5 flex flex-wrap gap-2 xxs:gap-3 text-[#a3a3a3] text-xs">
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
