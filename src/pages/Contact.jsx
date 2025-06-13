import { useState, useRef, useEffect, memo } from "react";
import { FaPaperPlane } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { getEnv, validateEnv } from "../utils/env";
import PropTypes from "prop-types";

const ServiceCard = memo(({ title, subtitle }) => (
  <div className="flex flex-col items-center gap-1 rounded-lg bg-[#1a1a2e] p-2 xxs:p-2.5 xs:p-3 w-[70px] xxs:w-[75px] xs:w-[80px]">
    <div className="text-[#f0c14b] text-xs xxs:text-sm xs:text-base font-medium leading-tight">
      {title}
    </div>
    <div className="text-[#a3a3a3] text-[8px] xxs:text-[9px] xs:text-[10px] leading-tight">
      {subtitle}
    </div>
  </div>
));

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

ServiceCard.displayName = "ServiceCard";

const SkillTag = memo(({ skill }) => (
  <div className="px-1.5 xxs:px-2 xs:px-3 py-0.5 xxs:py-0.75 xs:py-1 bg-[#12122a] rounded-lg text-[#a3a3a3] text-[10px] xxs:text-xs xs:text-sm">
    {skill}
  </div>
));

SkillTag.propTypes = {
  skill: PropTypes.string.isRequired,
};

SkillTag.displayName = "SkillTag";

const ServicesBox = memo(() => (
  <div className="h-[300px] xxs:h-[320px] xs:h-[360px] w-full rounded-lg bg-gradient-to-br from-[#12122a] via-[#1a1a2e] to-[#2a2a4e] flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.2)] relative overflow-hidden">
    <div className="absolute inset-0 bg-[#f0c14b]/5"></div>
    <div className="relative text-center p-4 xxs:p-5 xs:p-6 bg-[#0f0f1a]/80 backdrop-blur-sm rounded-lg w-[92%] xxs:w-[90%] xs:w-[88%] border border-[#2a2a4e]">
      <div className="absolute -top-2 -right-2 bg-[#f0c14b] text-[#0f0f1a] text-[10px] xxs:text-xs px-2 py-0.5 rounded-full font-bold transform -rotate-12">
        NEW
      </div>
      <h3 className="font-poppins text-base xxs:text-lg xs:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f0c14b] via-[#e57e31] to-[#f0c14b] animate-gradient mb-1 xxs:mb-2">
        AI & Development Services
      </h3>
      <p className="font-poppins text-[11px] xxs:text-xs xs:text-sm text-[#a3a3a3] mb-2 xxs:mb-3 group-hover:text-white transition-colors duration-300 max-w-[90%] mx-auto">
        Crafting cutting-edge solutions with AI integration and full-stack
        development.
      </p>
      <div className="flex flex-wrap justify-center gap-1.5 xxs:gap-2 xs:gap-2.5 mt-2 xxs:mt-3">
        {" "}
        {[
          {
            title: "AI Chatbot",
            subtitle: "Smart AI",
          },
          {
            title: "Web Dev",
            subtitle: "Full Stack",
          },
          {
            title: "API/ML",
            subtitle: "AI Tools",
          },
          {
            title: "Mobile",
            subtitle: "Apps",
          },
        ].map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            subtitle={service.subtitle}
          />
        ))}
      </div>
    </div>
  </div>
));

ServicesBox.displayName = "ServicesBox";

const Services = memo(() => {
  const services = [
    { title: "AI Chatbot", subtitle: "Smart AI" },
    { title: "Web Dev", subtitle: "Full Stack" },
    { title: "AI/ML", subtitle: "Smart Sys" },
    { title: "Mobile", subtitle: "Cross-App" },
  ];

  return (
    <div className="hidden md:block md:w-[50%] lg:w-[45%] md:pl-6 lg:pl-8">
      <div className="h-[300px] xxs:h-[320px] xs:h-[360px] w-full rounded-lg bg-gradient-to-br from-[#12122a] via-[#1a2a4e] to-[#2a2a4e] flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300 relative overflow-hidden group">
        <div className="relative text-center p-4 xxs:p-5 xs:p-6 bg-[#0f0f1a]/80 backdrop-blur-sm rounded-lg w-[92%] xxs:w-[90%] xs:w-[88%] border border-[#2a2a4e] group-hover:border-[#f0c14b] transition-all duration-500">
          <h3 className="font-poppins text-base xxs:text-lg xs:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f0c14b] via-[#e57e31] to-[#f0c14b] animate-gradient mb-1 xxs:mb-2">
            AI & Development Services
          </h3>
          <p className="font-poppins text-[11px] xxs:text-xs xs:text-sm text-[#a3a3a3] mb-2 xxs:mb-3 group-hover:text-white transition-colors duration-300 max-w-[90%] mx-auto">
            Crafting cutting-edge solutions with AI integration and full-stack
            development.
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 xxs:gap-2 xs:gap-2.5 mt-2 xxs:mt-3">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                subtitle={service.subtitle}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

Services.displayName = "Services";

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [envError, setEnvError] = useState(false);

  useEffect(() => {
    const isValid = validateEnv([
      "VITE_EMAILJS_SERVICE_ID",
      "VITE_EMAILJS_TEMPLATE_ID",
      "VITE_EMAILJS_PUBLIC_KEY",
    ]);

    if (!isValid) {
      setEnvError(true);
      console.error(
        "Missing required environment variables for the contact form"
      );
    }
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setTimeout(() => {
      setSubmitStatus(null);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (envError) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await emailjs.sendForm(
        getEnv("VITE_EMAILJS_SERVICE_ID"),
        getEnv("VITE_EMAILJS_TEMPLATE_ID"),
        formRef.current,
        getEnv("VITE_EMAILJS_PUBLIC_KEY")
      );

      if (result.text === "OK") {
        setSubmitStatus("success");
        resetForm();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pb-6 xxs:pb-10 xs:pb-16 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/50 via-[#f0c14b]/5 to-[#1a1a2e]/50 pointer-events-none"></div>
      <div className="relative text-center pb-4 xxs:pb-5 xs:pb-6 mt-4 xxs:mt-6 xs:mt-8">
        <div>
          <p className="text-3xl xxs:text-4xl xs:text-5xl font-semibold text-[#f0c14b] mb-2 xxs:mb-3 xs:mb-4">
            👋
          </p>
        </div>
        <h1 className="font-poppins mx-auto w-[94%] xxs:w-[90%] md:w-[70%] lg:w-[50%] pt-1 xxs:pt-2 xs:pt-4 text-center text-2xl xxs:text-3xl xs:text-4xl tracking-wider font-bold text-[#f0c14b]">
          Let&apos;s Create Something Amazing
        </h1>
        <p className="font-poppins text-[#a3a3a3] text-sm xxs:text-base xs:text-lg mt-2 xxs:mt-3 xs:mt-4">
          I&apos;m excited to hear about your project and how we can collaborate
        </p>
      </div>
      <div className="relative mx-auto flex w-[96%] xxs:w-[94%] xs:w-[90%] flex-col justify-between rounded-lg bg-[#1a1a2e]/90 backdrop-blur-sm p-3 xxs:p-4 xs:p-6 sm:p-8 border border-[#2a2a4e] md:flex-row md:items-start lg:w-[85%] xl:w-[80%] mt-2 xxs:mt-3 xs:mt-4">
        <div className="w-full md:w-[45%]">
          <ContactForm
            formRef={formRef}
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            isSubmitting={isSubmitting}
            submitStatus={submitStatus}
            envError={envError}
          />
          <div className="mt-4 xxs:mt-5 xs:mt-6 border-t border-[#2a2a4e] pt-3 xxs:pt-4 xs:pt-5">
            <p className="font-poppins mb-1.5 xxs:mb-2 xs:mb-3 text-xs xxs:text-xs xs:text-sm text-[#a3a3a3] flex items-center">
              <svg
                className="w-2.5 h-2.5 xxs:w-3 xxs:h-3 xs:w-4 xs:h-4 mr-1 xxs:mr-1.5 xs:mr-2 text-[#f0c14b]"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              For direct inquiries:
            </p>
            <a
              href="mailto:rafkhan9323@gmail.com"
              className="font-poppins flex items-center text-[#f0c14b] hover:text-[#e57e31] transition-colors duration-300 text-xs xxs:text-xs xs:text-sm"
              aria-label="Email me"
            >
              rafkhan9323@gmail.com
              <svg
                className="w-2.5 h-2.5 xxs:w-3 xxs:h-3 xs:w-4 xs:h-4 ml-1 xxs:ml-1.5 xs:ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
              </svg>
            </a>
          </div>
        </div>
        <Services />
      </div>
    </div>
  );
};

const ContactForm = memo(
  ({
    formRef,
    handleSubmit,
    formData,
    handleChange,
    isSubmitting,
    submitStatus,
    envError,
  }) => (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-2 xxs:space-y-3 xs:space-y-5"
    >
      <div>
        <label
          htmlFor="name"
          className="font-poppins mb-1 xxs:mb-1.5 xs:mb-2 block text-xs xxs:text-xs xs:text-sm font-medium text-white"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter your name"
          className="font-poppins w-full rounded-lg bg-[#12122a] px-2 xxs:px-3 xs:px-4 py-1.5 xxs:py-2 xs:py-3 text-xs xxs:text-xs xs:text-sm text-white placeholder-[#a3a3a3] outline-none border border-[#2a2a4e] focus:border-[#f0c14b] transition-all duration-300"
          aria-label="Your full name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="font-poppins mb-1 xxs:mb-1.5 xs:mb-2 block text-xs xxs:text-xs xs:text-sm font-medium text-white"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
          className="font-poppins w-full rounded-lg bg-[#12122a] px-2 xxs:px-3 xs:px-4 py-1.5 xxs:py-2 xs:py-3 text-xs xxs:text-xs xs:text-sm text-white placeholder-[#a3a3a3] outline-none border border-[#2a2a4e] focus:border-[#f0c14b] transition-all duration-300"
          aria-label="Your email address"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="font-poppins mb-1 xxs:mb-1.5 xs:mb-2 block text-xs xxs:text-xs xs:text-sm font-medium text-white"
        >
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="4"
          placeholder="Tell me about your project"
          className="font-poppins w-full rounded-lg bg-[#12122a] px-2 xxs:px-3 xs:px-4 py-1.5 xxs:py-2 xs:py-3 text-xs xxs:text-xs xs:text-sm text-white placeholder-[#a3a3a3] outline-none border border-[#2a2a4e] focus:border-[#f0c14b] transition-all duration-300 resize-none"
          aria-label="Your message"
        ></textarea>
      </div>

      {submitStatus === "success" && (
        <div
          className="font-poppins rounded-lg bg-green-500 bg-opacity-20 px-2 xxs:px-3 xs:px-4 py-1.5 xxs:py-2 xs:py-3 text-xs xxs:text-xs xs:text-sm text-green-200 flex items-center"
          role="alert"
        >
          <svg
            className="w-3 h-3 xxs:w-3.5 xxs:h-3.5 xs:w-4 xs:h-4 mr-1.5 xxs:mr-1.5 xs:mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          Thank you! Your message has been sent successfully.
        </div>
      )}

      {submitStatus === "error" && (
        <div
          className="font-poppins rounded-lg bg-red-500 bg-opacity-20 px-2 xxs:px-3 xs:px-4 py-1.5 xxs:py-2 xs:py-3 text-xs xxs:text-xs xs:text-sm text-red-200 flex items-center"
          role="alert"
        >
          <svg
            className="w-3 h-3 xxs:w-3.5 xxs:h-3.5 xs:w-4 xs:h-4 mr-1.5 xxs:mr-1.5 xs:mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          Error sending message. Please try again or contact directly via email.
        </div>
      )}

      {envError && (
        <div
          className="font-poppins rounded-lg bg-yellow-500 bg-opacity-20 px-2 xxs:px-3 xs:px-4 py-1.5 xxs:py-2 xs:py-3 text-xs xxs:text-xs xs:text-sm text-yellow-200 flex items-center"
          role="alert"
        >
          <svg
            className="w-3 h-3 xxs:w-3.5 xxs:h-3.5 xs:w-4 xs:h-4 mr-1.5 xxs:mr-1.5 xs:mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          Contact form is currently unavailable. Please reach out directly via
          email.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || envError}
        className="send-button button-UI flex h-8 xxs:h-10 xs:h-12 w-full items-center justify-center gap-1.5 xxs:gap-2 xs:gap-3 rounded-lg px-3 xxs:px-4 xs:px-6 py-1 xxs:py-1.5 xs:py-2 font-bold tracking-wider text-[#0f0f1a] shadow-xl transition-all duration-300 hover:opacity-90 hover:shadow-2xl disabled:opacity-70 text-xs xxs:text-xs xs:text-sm"
        aria-label="Send message"
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-0.5 mr-1.5 h-3 w-3 xxs:h-4 xxs:w-4 xs:h-5 xs:w-5 text-[#0f0f1a]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          <>
            <span>Send Message</span>
            <FaPaperPlane className="text-xs xxs:text-sm xs:text-base group-hover:translate-x-1 transition-transform duration-300" />
          </>
        )}
      </button>
    </form>
  )
);

ContactForm.propTypes = {
  formRef: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  submitStatus: PropTypes.string,
  envError: PropTypes.bool.isRequired,
};

ContactForm.displayName = "ContactForm";

export default memo(Contact);
