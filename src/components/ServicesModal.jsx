import PropTypes from "prop-types";
import { useMemo } from "react";

const ServicesModal = ({ isOpen, onClose }) => {
  const services = useMemo(
    () => [
      "Full-stack web application development with Next.js 15 and React",
      "Cross-platform mobile app development with React Native",
      "AI/ML integration and development",
      "Custom chatbot and AI assistant development",
      "Frontend design and modern UI implementation",
      "Backend API development and optimization",
      "Database design and cloud infrastructure",
      "Technical consultation and solution architecture",
      "Performance optimization and scaling solutions",
    ],
    []
  );

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl border border-[#f0c14b]/20 bg-gradient-to-br from-[#11121a] to-[#1a1b26] shadow-2xl">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 m-2 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/80 hover:bg-white/10 z-10"
        >
          Close
        </button>

        <div className="p-5 xs:p-6 pb-0">
          <h2 className="text-xl xs:text-2xl font-bold text-white">
            Services I Offer
          </h2>
          <p className="text-xs text-[#a3a3a3] mt-1">
            Here’s how I can help your project succeed
          </p>
        </div>

        <div className="overflow-y-auto px-5 xs:px-6 pb-6 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((svc, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#252538] p-4 border border-[#242442] transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-[#f0c14b]/20"
              >
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#f0c14b]/15 to-[#e6a323]/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#2a2a4e] text-[#f0c14b] ring-1 ring-[#f0c14b]/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-3.5 w-3.5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-7.5 9.5a.75.75 0 01-1.08.095l-4-3.75a.75.75 0 111.028-1.092l3.42 3.205 7.005-8.872a.75.75 0 011.052-.138z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <p className="font-poppins text-sm xs:text-base text-[#a3a3a3] group-hover:text-white transition-colors duration-300 leading-relaxed">
                    {svc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-lg border border-[#242442] bg-[#1a1a2e]/70 p-4 text-xs text-[#a3a3a3]">
            Looking for something specific? I’m flexible and can tailor
            solutions to your needs. Reach out via the Contact form to discuss
            your project.
          </div>
        </div>
      </div>
    </div>
  );
};

ServicesModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ServicesModal;
