import { memo } from "react";
import { UserData } from "../data/UserData";
import ExperienceCard from "../components/ExperienceCard";

const Experiences = memo(() => {
  return (
    <div className="w-full relative pb-8 xxs:pb-12 xs:pb-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/50 via-transparent to-transparent pointer-events-none"></div>

      <div className="relative">
        <div className="text-center space-y-3 xxs:space-y-4 xs:space-y-6 mb-6 xxs:mb-8 xs:mb-10 px-2 xxs:px-4">
          <h1 className="font-tinos mx-auto w-full xs:w-[90%] text-2xl xxs:text-3xl xs:text-4xl font-bold tracking-wider text-white lg:text-5xl">
            Professional <span className="text-[#f0c14b]">Experience</span>
          </h1>
          <p className="text-[#a3a3a3] text-sm">
            A journey through my professional career, showcasing the diverse
            roles and
            <span className="text-[#f0c14b]"> impactful projects</span> that
            have shaped my expertise in full-stack development, AI/ML
            engineering, SDET, and DevOps.
          </p>
        </div>

        <div className="mx-auto mb-6 xxs:mb-8 xs:mb-10 w-[96%] xxs:w-[94%] xs:w-[90%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xxs:gap-6 xs:gap-8 sm:mb-8 xxs:mb-10">
            {UserData.experiences.map((experience, index) => (
              <ExperienceCard
                key={index}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto w-full xxs:w-[94%] xs:w-[90%] mt-4 xxs:mt-6 xs:mt-8 text-center">
          <div className="inline-flex items-center gap-2 xxs:gap-2.5 xs:gap-3 bg-gradient-to-r from-[#1a1a2e] to-[#2a2a4e] px-3 xxs:px-4 xs:px-6 py-1.5 xxs:py-2 xs:py-3 rounded-lg border border-[#f0c14b] text-xs xxs:text-sm xs:text-base">
            <span className="text-white font-semibold">
              Always Learning, Always Growing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

Experiences.displayName = "Experiences";

export default Experiences;
