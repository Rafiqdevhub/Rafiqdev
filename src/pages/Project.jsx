import { memo, useCallback, useState } from "react";
import { FaArrowRight, FaCode, FaRocket, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";

const Project = memo(() => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleViewArchive = useCallback(() => {
    navigate("/projectlist");
  }, [navigate]);

  return (
    <div className="w-full relative pb-12 xxs:pb-16 xs:pb-20 min-h-screen flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-yellow-400/3 to-orange-500/3 rounded-full blur-3xl animate-spin-slow"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-transparent to-slate-900/80 pointer-events-none"></div>

      <div className="relative flex-1 flex flex-col">
        <div className="text-center space-y-6 xxs:space-y-7 xs:space-y-8 mb-10 xxs:mb-12 xs:mb-16 px-4 xxs:px-6 pt-8">
          <div className="flex items-center justify-center gap-4 mb-4 animate-fadeInUp">
            <div className="h-px w-12 xxs:w-16 xs:w-20 bg-gradient-to-r from-transparent to-yellow-400/50"></div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-400/20 backdrop-blur-sm">
              <FaStar className="text-yellow-400 text-xs" />
              <span className="text-yellow-400 text-xs font-medium tracking-wider">
                PORTFOLIO SHOWCASE
              </span>
              <FaStar className="text-yellow-400 text-xs" />
            </div>
            <div className="h-px w-12 xxs:w-16 xs:w-20 bg-gradient-to-l from-transparent to-yellow-400/50"></div>
          </div>

          <div
            className="relative animate-fadeInUp"
            style={{ animationDelay: "100ms" }}
          >
            <h1 className="font-tinos mx-auto w-full xs:w-[90%] text-3xl xxs:text-4xl xs:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Featured{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-300 bg-clip-text text-transparent">
                  Projects
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400/0 via-yellow-400/50 to-yellow-400/0 rounded-full"></div>
              </span>
            </h1>

            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400/40 animate-bounce"></div>
              <div
                className="w-2 h-2 rounded-full bg-orange-400/40 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-yellow-400/40 animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>

          <div
            className="max-w-3xl mx-auto animate-fadeInUp"
            style={{ animationDelay: "200ms" }}
          >
            <p className="text-slate-400 text-sm xxs:text-base xs:text-lg leading-relaxed">
              Explore my complete collection of innovative projects. Each one
              represents a unique challenge solved with
              <span className="text-yellow-400 font-semibold">
                {" "}
                cutting-edge technology
              </span>{" "}
              and
              <span className="text-orange-400 font-semibold">
                {" "}
                creative thinking
              </span>
              .
            </p>
            <p className="text-slate-500 text-xs xxs:text-sm mt-3">
              Want to dive deeper?
              <span className="text-[#f0c14b] cursor-pointer hover:text-yellow-300 transition-colors ml-1 font-medium">
                Feel free to reach out
              </span>{" "}
              — I&apos;m always excited to share insights!
            </p>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-4 xxs:gap-6 xs:gap-8 pt-4 animate-fadeInUp"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm">
              <FaCode className="text-yellow-400" />
              <div className="text-left">
                <div className="text-white font-bold text-sm">10+</div>
                <div className="text-slate-400 text-xs">Projects</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm">
              <FaRocket className="text-orange-400" />
              <div className="text-left">
                <div className="text-white font-bold text-sm">Live</div>
                <div className="text-slate-400 text-xs">Production</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm">
              <FaStar className="text-yellow-400" />
              <div className="text-left">
                <div className="text-white font-bold text-sm">AI/ML</div>
                <div className="text-slate-400 text-xs">Powered</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mx-auto mb-10 xxs:mb-12 xs:mb-16 w-[96%] xxs:w-[94%] xs:w-[90%] animate-fadeInUp"
          style={{ animationDelay: "400ms" }}
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-yellow-400/20 rounded-2xl opacity-30 blur-xl animate-pulse"></div>

            <div className="relative grid grid-cols-1 gap-6 xxs:gap-7 xs:gap-8 md:grid-cols-2 p-1">
              <Cards />
            </div>
          </div>
        </div>

        <div
          className="mx-auto w-full xxs:w-[94%] xs:w-[90%] text-center animate-fadeInUp"
          style={{ animationDelay: "500ms" }}
        >
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl opacity-30 group-hover:opacity-50 blur-lg transition-opacity duration-500"></div>

            <button
              onClick={handleViewArchive}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative flex items-center gap-3 mx-auto bg-gradient-to-r from-[#1a1a2e] to-[#2a2a4e] px-6 xxs:px-8 xs:px-10 py-3 xxs:py-3.5 xs:py-4 rounded-xl border-2 border-[#f0c14b] text-sm xxs:text-base xs:text-lg font-semibold text-white shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 hover:scale-105 hover:border-yellow-300 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer"></div>

              <span className="relative z-10 flex items-center gap-3">
                <span className="bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent group-hover:from-yellow-100 group-hover:to-white transition-all duration-300">
                  View Full Project Archive
                </span>
                <FaArrowRight
                  className={`text-[#f0c14b] group-hover:text-yellow-300 transition-all duration-300 group-hover:translate-x-1 ${
                    isHovered ? "animate-pulse" : ""
                  }`}
                />
              </span>

              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-yellow-400/50 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-yellow-400/50 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-yellow-400/50 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-yellow-400/50 rounded-br-lg"></div>
            </button>
          </div>

          <p
            className="text-slate-500 text-xs mt-4 animate-fadeInUp"
            style={{ animationDelay: "600ms" }}
          >
            Discover the complete portfolio of innovation and creativity
          </p>
        </div>
      </div>
    </div>
  );
});

Project.displayName = "Project";

export default Project;
