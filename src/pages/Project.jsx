import Cards from "../components/Cards";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Project() {
  const navigate = useNavigate();

  return (
    <div className="w-full relative pb-8 xxs:pb-12 xs:pb-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/50 via-transparent to-transparent pointer-events-none"></div>

      <div className="relative">
        <div className="text-center space-y-3 xxs:space-y-4 xs:space-y-6 mb-6 xxs:mb-8 xs:mb-10 px-2 xxs:px-4">
          <h1 className="font-poppins mx-auto w-full xs:w-[90%] text-2xl xxs:text-3xl xs:text-4xl font-bold tracking-wider text-white lg:text-5xl">
            Featured <span className="text-[#f0c14b]">Projects</span>
          </h1>
          <p className="text-[#a3a3a3] max-w-2xl mx-auto px-2 xxs:px-4 text-xs xxs:text-sm xs:text-base">
            Discover some of my recent work and innovative solutions. Each
            project demonstrates my commitment to creating impactful digital
            experiences.
          </p>
        </div>
        <div className="mx-auto mb-6 xxs:mb-8 xs:mb-10 w-[96%] xxs:w-[94%] xs:w-[90%]">
          <div className="grid grid-cols-1 gap-4 xxs:gap-6 xs:gap-8 sm:mb-8 xxs:mb-10 md:grid-cols-2 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#42403b] to-[#49260b] rounded-lg opacity-20 blur-lg group-hover:opacity-30 transition duration-500"></div>

            <Cards />
          </div>
        </div>
        <div className="mx-auto w-full xxs:w-[94%] xs:w-[90%] mt-4 xxs:mt-6 xs:mt-8 text-center">
          <button
            onClick={() => navigate("/projectlist")}
            className="group flex items-center gap-2 xxs:gap-2.5 xs:gap-3 mx-auto bg-gradient-to-r from-[#1a1a2e] to-[#2a2a4e] px-3 xxs:px-4 xs:px-6 py-1.5 xxs:py-2 xs:py-3 rounded-lg border border-[#f0c14b] hover:shadow-[0_8px_30px_rgba(240,193,75,0.15)] transition-all duration-300 text-xs xxs:text-sm xs:text-base"
          >
            <span className="text-white font-semibold">
              View Full Project Archive
            </span>
            <FaArrowRight className="text-[#f0c14b] group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Project;
