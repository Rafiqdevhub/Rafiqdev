import { useCallback, memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaCode, FaServer, FaDatabase, FaMobile } from "react-icons/fa";
import TypewriterText from "../components/TypewriterText";
import { UserData } from "../data/UserData";
import RafiqImageSrc from "../Assets/images/RafiqImage.svg";
import PropTypes from "prop-types";

// Optimized SkillItem component with memoization
const SkillItem = memo(({ icon: Icon, text }) => {
  return (
    <div className="flex items-center rounded-md border border-[#242442] px-2 py-1 hover:bg-[#f0c14b]/10 transition-all duration-300">
      <Icon className="mr-1.5 text-[#f0c14b]" />
      <span>{text}</span>
    </div>
  );
});

SkillItem.displayName = "SkillItem";
SkillItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
};

// Extracted and memoized ProfileImage component for better performance
const ProfileImage = memo(() => {
  return (
    <div className="mt-4 xxs:mt-6 sm:mt-8 lg:mt-4 relative max-w-[320px] w-full mx-auto">
      <div className="absolute -top-6 -right-6 bg-[#3498db] text-white font-bold text-sm p-3 rounded-full rotate-12 shadow-lg border-2 border-white hidden lg:block">
        Full Stack Dev
      </div>
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
  );
});

ProfileImage.displayName = "ProfileImage";

function Home() {
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  const skillItems = useMemo(
    () => [
      { Icon: FaCode, text: "FRONTEND" },
      { Icon: FaServer, text: "BACKEND" },
      { Icon: FaDatabase, text: "DATABASE" },
      { Icon: FaMobile, text: "MOBILE" },
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
            <TypewriterText options={UserData.typewriterOptions} />
          </div>

          <div className="mt-2 xxs:mt-3 xs:mt-4 lg:mt-6">
            <div
              onClick={() => handleNavigate("/projectlist")}
              className="relative inline-block cursor-pointer group"
            >
              <div className="px-6 py-3 text-white font-bold overflow-hidden rounded-lg border border-[#f0c14b] shadow-lg relative z-10">
                <span className="relative z-20 group-hover:text-white transition-colors duration-300">
                  Discover My Portfolio
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#f0c14b] to-[#e57e31] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out z-10"></div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#3498db] via-[#f0c14b] to-[#e57e31] rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-500"></div>

              <div className="absolute -top-6 -right-6 animate-bounce">
                <span className="inline-block px-3 py-1 bg-[#3498db] text-white text-xs rounded-full shadow-lg transform rotate-12">
                  Click me!
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 xxs:mt-4 xs:mt-5 flex flex-wrap gap-2 xxs:gap-3 text-[#a3a3a3] text-xs">
            {skillItems.map((item, index) => (
              <SkillItem key={index} icon={item.Icon} text={item.text} />
            ))}
          </div>
        </div>

        <ProfileImage />
      </div>
    </div>
  );
}

export default memo(Home);
