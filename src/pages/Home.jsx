import { useMemo, useCallback, memo, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { UserData } from "../data/UserData";
import { useNavigate } from "react-router-dom";
import {
  FaCode,
  FaDatabase,
  FaServer,
  FaMobile,
  FaLinkedinIn,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import RafiqImageSrc from "../Assets/images/RafiqImage.svg";

const TypewriterText = lazy(() => import("../components/TypewriterText"));

const socialMediaIcons = {
  AiFillGithub,
  FaLinkedinIn,
  AiFillInstagram,
  FaSquareXTwitter,
};

const SocialMediaButton = memo(({ icon: IconComponent, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center rounded-full border border-[#f0c14b] p-2 bg-transparent hover:bg-[#f0c14b] hover:bg-opacity-10 hover:border-[#e57e31] transition-all duration-300"
  >
    <IconComponent className="icon text-[#f0c14b] hover:text-[#e57e31] transition-colors duration-300" />
  </a>
));

SocialMediaButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  url: PropTypes.string.isRequired,
};
SocialMediaButton.displayName = "SocialMediaButton";

const SkillItem = memo(({ icon: Icon, text }) => (
  <div className="flex items-center gap-2">
    <Icon className="text-[#f0c14b]" />
    <span>{text}</span>
  </div>
));

SkillItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
};
SkillItem.displayName = "SkillItem";

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
        />
      </div>
    </div>
  );
});

ProfileImage.displayName = "ProfileImage";

function Home() {
  const navigate = useNavigate();
  const socialMedia = useMemo(() => UserData.socialMedia, []);

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
        <div className="w-full max-w-content-md sm:max-w-lg">
          <h2 className="text-lg xxs:text-xl xs:text-2xl font-semibold leading-tight text-white lg:text-2xl">
            Welcome <span className="wave">👋</span>
          </h2>
          <h2 className="pt-1 text-lg xxs:text-xl xs:text-2xl font-semibold leading-tight text-[#f0c14b]">
            I&apos;m {UserData.name}
          </h2>

          <Suspense
            fallback={<div className="h-[24px] xxs:h-[30px] xs:h-[36px]"></div>}
          >
            <TypewriterText />
          </Suspense>

          <div className="mt-3 xxs:mt-4 xs:mt-5 flex gap-3 xxs:gap-4">
            {socialMedia.map((data, index) => (
              <SocialMediaButton
                key={index}
                icon={socialMediaIcons[data.icon]}
                url={data.url}
              />
            ))}
          </div>

          <div className="mt-3 xxs:mt-4 xs:mt-5 flex flex-wrap gap-2 xs:gap-3">
            <button
              onClick={() => handleNavigate("/contact")}
              className="button-UI px-3 xxs:px-4 xs:px-5 py-1.5 xs:py-2 rounded-lg font-bold text-[#0f0f1a] shadow-xl transition-all duration-300 hover:opacity-90 hover:shadow-[0_8px_30px_rgba(240,193,75,0.15)] text-xs xxs:text-sm"
            >
              Hire Me
            </button>

            <button
              onClick={() => handleNavigate("/projectlist")}
              className="px-3 xxs:px-4 xs:px-5 py-1.5 xs:py-2 rounded-lg font-bold text-white border border-[#f0c14b] shadow-xl transition-all duration-300 hover:bg-[#f0c14b] hover:bg-opacity-10 hover:border-[#e57e31] text-xs xxs:text-sm"
            >
              View Projects
            </button>
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
