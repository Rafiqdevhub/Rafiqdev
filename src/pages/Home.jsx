import { useCallback, memo, useMemo, useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { FaCode, FaServer, FaDatabase, FaMobile } from "react-icons/fa";
import TypewriterText from "../components/TypewriterText";
import { UserData } from "../data/UserData";
import RafiqImageSrc from "../Assets/images/image.jpeg";
import PropTypes from "prop-types";
import OptimizedImage from "../components/OptimizedImage";

/* Performance: Lazy load Cards component since it's below the fold */
const Cards = lazy(() => import("../components/Cards"));

/* Performance: Memoize SkillItem to prevent re-renders */
const SkillItem = memo(({ icon: Icon, text, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  /* Performance: Memoize hover handlers */
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

/* Performance: Memoize static hero content */
const HeroContent = memo(() => (
  <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
    <div className="w-full md:w-1/2">
      <OptimizedImage
        src={RafiqImageSrc}
        alt={UserData.name}
        width={400}
        height={400}
        className="rounded-lg shadow-lg"
      />
    </div>
    <div className="w-full md:w-1/2 text-center md:text-left">
      <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
        {UserData.name}
      </h1>
      <TypewriterText />
      <p className="text-[#a3a3a3] text-sm xs:text-base">
        {UserData.description}
      </p>
    </div>
  </div>
));

HeroContent.displayName = "HeroContent";

function Home() {
  /* Performance: Use hooks outside of render */
  const navigate = useNavigate();

  /* Performance: Memoize navigation callback */
  const handleArchiveClick = useCallback(() => {
    navigate("/archive");
  }, [navigate]);

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
            <div className="text-wrap break-words max-w-full text-sm xxs:text-base xs:text-lg sm:text-xl lg:text-2xl">
              <TypewriterText options={UserData.typewriterOptions} />
            </div>
          </div>

          <div className="mt-4 xxs:mt-5 xs:mt-6 lg:mt-8">
            <div
              onClick={() => handleNavigate("/projectlist")}
              className="relative inline-block cursor-pointer group"
            >
              <div className="px-6 py-3 text-white font-bold overflow-hidden rounded-lg border border-[#f0c14b] shadow-lg relative z-10 transition-colors duration-300 group-hover:bg-[#1a1a2e]">
                <span className="relative z-20 text-[#f0c14b] group-hover:text-white transition-colors duration-300">
                  Discover My Portfolio
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#f0c14b] to-[#e57e31] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out z-10"></div>
              </div>
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
