import { memo, useMemo, useState, useCallback, useEffect } from "react";
import {
  FaCode,
  FaDatabase,
  FaMobile,
  FaTools,
  FaRocket,
  FaDownload,
  FaPlay,
  FaStar,
  FaBriefcase,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import RafiqImageSrc from "../Assets/images/profile.png";
import ContactModal from "../components/ContactModal";
import PropTypes from "prop-types";

const FloatingParticles = memo(() => {
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 blur-sm animate-float"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
});

FloatingParticles.displayName = "FloatingParticles";

const CounterStat = memo(({ end, suffix = "", prefix = "", label, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setTimeout(() => {
      const counter = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, delay]);

  return (
    <div className="text-center p-6 rounded-xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 backdrop-blur-sm hover:border-yellow-400/50 transition-all duration-300 group">
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-slate-400 text-sm font-medium">{label}</div>
    </div>
  );
});

CounterStat.propTypes = {
  end: PropTypes.number.isRequired,
  suffix: PropTypes.string,
  prefix: PropTypes.string,
  label: PropTypes.string.isRequired,
  delay: PropTypes.number,
};

CounterStat.displayName = "CounterStat";

const SkillItem = memo(({ icon: Icon, text, delay, description, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 
                 border border-slate-700/50 backdrop-blur-sm hover:border-yellow-400/50 
                 transition-all duration-500 cursor-pointer p-6 hover:shadow-2xl hover:shadow-yellow-400/10"
      style={{
        animationDelay: `${delay * 150}ms`,
        transform: isHovered
          ? "translateY(-8px) scale(1.05)"
          : "translateY(0) scale(1)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      ></div>
      <div className="relative z-10 flex flex-col items-center text-center space-y-3">
        <div
          className={`p-4 rounded-xl bg-gradient-to-br ${color.replace(
            "/5",
            "/20",
          )} shadow-lg group-hover:shadow-yellow-400/25 transition-all duration-300`}
        >
          <Icon className="text-white text-2xl" />
        </div>
        <span className="text-white font-bold text-base tracking-wide">
          {text}
        </span>
        <span className="text-slate-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {description}
        </span>
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <HiSparkles className="text-yellow-400 text-lg animate-pulse" />
      </div>
    </div>
  );
});

SkillItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  delay: PropTypes.number,
  description: PropTypes.string,
  color: PropTypes.string,
};

SkillItem.displayName = "SkillItem";

const SocialButton = memo(({ icon: Icon, href, label, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`group relative p-3 rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 
                hover:border-${color}-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-${color}-400/20 hover:-translate-y-1`}
  >
    <Icon
      className={`text-slate-400 group-hover:text-${color}-400 text-xl transition-colors duration-300`}
    />
  </a>
));

SocialButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
};

SocialButton.displayName = "SocialButton";

const FeatureBadge = memo(({ icon: Icon, text }) => (
  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20 backdrop-blur-sm">
    <Icon className="text-yellow-400 text-sm" />
    <span className="text-slate-300 text-sm font-medium">{text}</span>
  </div>
));

FeatureBadge.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
};

FeatureBadge.displayName = "FeatureBadge";

function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = useCallback(() => {
    setIsContactModalOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setIsContactModalOpen(false);
  }, []);

  const skillItems = useMemo(
    () => [
      {
        Icon: FaCode,
        text: "FULL-STACK",
        description: "End-to-end web & mobile solutions",
        color: "from-yellow-400/5 to-orange-500/5",
      },
      {
        Icon: FaMobile,
        text: "SDET",
        description: "Quality-first test automation",
        color: "from-blue-400/5 to-cyan-500/5",
      },
      {
        Icon: FaTools,
        text: "DEVOPS",
        description: "Seamless CI/CD & deployment",
        color: "from-green-400/5 to-emerald-500/5",
      },
      {
        Icon: FaDatabase,
        text: "AI/ML",
        description: "Intelligent automation & insights",
        color: "from-purple-400/5 to-pink-500/5",
      },
    ],
    [],
  );

  const stats = useMemo(
    () => [
      { end: 15, suffix: "+", label: "Projects Completed", delay: 200 },
      { end: 2, suffix: "+", label: "Years Experience", delay: 400 },
      { end: 25, suffix: "+", label: "Technologies Mastered", delay: 600 },
      { end: 99, suffix: "%", label: "Client Satisfaction", delay: 800 },
    ],
    [],
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <FloatingParticles />
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="relative z-10 mx-auto w-[94%] xxs:w-[92%] sm:w-[90%] lg:w-[85%] xl:w-[80%] py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/30 backdrop-blur-sm animate-fadeInUp">
              <span className="text-yellow-400 text-sm font-semibold">
                Available for Hire | Open to Exciting Projects
              </span>
            </div>

            <div
              className="space-y-4 animate-fadeInUp"
              style={{ animationDelay: "100ms" }}
            >
              <h1 className="font-tinos font-bold text-4xl xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-tight">
                Hi, I&apos;m{" "}
                <span className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-300 bg-clip-text text-transparent animate-gradient">
                  Muhammad Rafiq
                </span>
              </h1>

              <div className="relative pl-6 border-l-4 border-gradient-to-b from-yellow-400 to-orange-500">
                <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl text-slate-300 font-light leading-tight">
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-300 bg-clip-text text-transparent font-semibold">
                    Full-Stack Developer
                  </span>
                  {" & "}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-300 bg-clip-text text-transparent font-semibold">
                    AI/ML Enthusiast
                  </span>
                </h2>
              </div>
            </div>

            <p
              className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl animate-fadeInUp"
              style={{ animationDelay: "300ms" }}
            >
              Transforming business challenges into elegant, scalable solutions.
              Specialized in building high-performance web and mobile
              applications that drive measurable results. From startup MVPs to
              enterprise systems, I deliver code that matters.
            </p>

            <div
              className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fadeInUp"
              style={{ animationDelay: "500ms" }}
            >
              <button
                onClick={openContactModal}
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold text-base shadow-lg hover:shadow-yellow-400/50 transition-all duration-300 hover:-translate-y-1 flex items-center space-x-2 cursor-pointer"
              >
                <span>Let&apos;s Talk</span>
                <FaPlay className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <a
                href="/Rafiq CV.pdf"
                download="Muhammad_Rafiq_CV.pdf"
                className="group relative px-8 py-4 rounded-xl bg-slate-800/60 border border-slate-700 text-white font-bold text-base backdrop-blur-sm hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-1 flex items-center space-x-2"
              >
                <FaDownload className="text-sm group-hover:animate-bounce" />
                <span>Download CV</span>
              </a>
            </div>

            <div
              className="flex gap-4 justify-center lg:justify-start animate-fadeInUp"
              style={{ animationDelay: "600ms" }}
            >
              <SocialButton
                icon={FaGithub}
                href="https://github.com/Rafiqdevhub"
                label="GitHub Profile"
                color="slate"
              />
              <SocialButton
                icon={FaLinkedin}
                href="https://www.linkedin.com/in/rafiqdevhub/"
                label="LinkedIn Profile"
                color="blue"
              />
              <SocialButton
                icon={FaInstagram}
                href="https://www.instagram.com/rafiqdevhub/"
                label="Instagram Profile"
                color="pink"
              />
            </div>
          </div>

          <div
            className="relative flex justify-center lg:justify-end animate-fadeInUp"
            style={{ animationDelay: "200ms" }}
          >
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-purple-500 rounded-full animate-spin-slow opacity-75"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-slate-900 to-slate-800 rounded-full"></div>

                <div className="absolute inset-3 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl"></div>

                <div className="absolute inset-6 rounded-full overflow-hidden border-4 border-slate-800/50 shadow-2xl">
                  <img
                    className="w-full h-full object-contain transform hover:scale-110 transition-transform duration-700"
                    src={RafiqImageSrc}
                    alt="Muhammad Rafiq - Full-Stack Developer & AI Engineer"
                    loading="eager"
                    decoding="async"
                    width="360"
                    height="360"
                    style={{ objectPosition: "center top" }}
                  />
                </div>

                <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                  <FaCode className="text-slate-900 text-xl" />
                </div>
                <div
                  className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-xl animate-bounce"
                  style={{ animationDelay: "1s" }}
                >
                  <FaRocket className="text-white text-xl" />
                </div>
                <div
                  className="absolute top-1/4 -left-8 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                  <FaStar className="text-white text-lg" />
                </div>
                <div
                  className="absolute top-1/3 -right-8 w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-xl animate-bounce"
                  style={{ animationDelay: "1.5s" }}
                >
                  <FaBriefcase className="text-white text-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20 animate-fadeInUp"
          style={{ animationDelay: "700ms" }}
        >
          {stats.map((stat, index) => (
            <CounterStat key={index} {...stat} />
          ))}
        </div>

        <div
          className="text-center mb-12 animate-fadeInUp"
          style={{ animationDelay: "800ms" }}
        >
          <h2 className="font-tinos text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Why{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Choose Me
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A comprehensive skill set delivering end-to-end solutions from
            concept to deployment
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeInUp"
          style={{ animationDelay: "900ms" }}
        >
          {skillItems.map((item, index) => (
            <SkillItem
              key={index}
              icon={item.Icon}
              text={item.text}
              description={item.description}
              color={item.color}
              delay={index}
            />
          ))}
        </div>
      </div>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
      />{" "}
    </div>
  );
}

export default memo(Home);
