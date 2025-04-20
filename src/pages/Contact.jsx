import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaArrowLeft } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { getEnv, validateEnv } from "../utils/env";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [envError, setEnvError] = useState(false);

  // Validate required env variables on component mount
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (envError) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId = getEnv("VITE_EMAILJS_SERVICE_ID");
    const templateId = getEnv("VITE_EMAILJS_TEMPLATE_ID");
    const publicKey = getEnv("VITE_EMAILJS_PUBLIC_KEY");

    try {
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      if (result.text === "OK") {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          message: "",
        });

        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
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
    <div className="w-full pb-6 xxs:pb-10 xs:pb-16">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="ml-[5%] hidden gap-2 pt-4 xxs:pt-6 xs:pt-8 text-gray-200 hover:text-white lg:flex lg:items-center cursor-pointer"
      >
        <FaArrowLeft />
        <span>Portfolio</span>
      </div>

      <div className="text-center pb-4 xxs:pb-5 xs:pb-6 mt-4 xxs:mt-6 xs:mt-8">
        <p className="text-2xl xxs:text-3xl xs:text-4xl font-semibold text-[#f0c14b] mb-2 xxs:mb-3 xs:mb-4">
          💬
        </p>
        <p className="font-poppins mx-auto w-[94%] xxs:w-[90%] md:w-[70%] lg:w-[50%] pt-1 xxs:pt-2 xs:pt-4 text-center text-lg xxs:text-xl xs:text-2xl tracking-wider text-white lg:text-3xl">
          Let&apos;s Work Together
        </p>
      </div>

      <div className="mx-auto flex w-[96%] xxs:w-[94%] xs:w-[90%] flex-col justify-between rounded-lg bg-[#1a1a2e] p-3 xxs:p-4 xs:p-6 sm:p-8 border border-[#2a2a4e] hover:border-[#543e07] hover:shadow-[0_8px_30px_rgba(240,193,75,0.15)] transition-all duration-500 transform hover:-translate-y-1 md:flex-row md:items-start lg:w-[85%] xl:w-[80%] mt-2 xxs:mt-3 xs:mt-4">
        <div className="w-full md:w-[45%]">
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
                Error sending message. Please try again or contact directly via
                email.
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
                Contact form is currently unavailable. Please reach out directly
                via email.
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

        <div className="hidden md:block md:w-[50%] lg:w-[45%] md:pl-6 lg:pl-8">
          <div className="h-[260px] xxs:h-[280px] xs:h-[320px] w-full rounded-lg bg-gradient-to-br from-[#12122a] to-[#2a2a4e] flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300">
            <div className="text-center p-4 xxs:p-5 xs:p-6 sm:p-8 bg-[#0f0f1a] bg-opacity-50 backdrop-blur-sm rounded-lg w-[90%] xxs:w-[85%] xs:w-[85%]">
              <h3 className="font-poppins text-lg xxs:text-xl xs:text-2xl font-bold text-[#f0c14b] mb-1.5 xxs:mb-2 xs:mb-3">
                Development Services
              </h3>
              <p className="font-poppins text-xs xxs:text-xs xs:text-sm text-[#a3a3a3] mb-2 xxs:mb-3 xs:mb-4">
                I offer a full range of web and mobile development services,
                tailored to your specific needs and business goals.
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 xxs:gap-2 xs:gap-3 mt-2 xxs:mt-3 xs:mt-4 sm:mt-6">
                <div className="bg-[#f0c14b] bg-opacity-20 hover:bg-opacity-30 p-1.5 xxs:p-2 xs:p-3 rounded-lg transition-all duration-300 w-[60px] xxs:w-[65px] xs:w-[80px]">
                  <div className="text-[#f0c14b] text-sm xxs:text-base xs:text-xl mb-0.5 xxs:mb-0.5 xs:mb-1">
                    Web Apps
                  </div>
                  <div className="text-white text-[8px] xxs:text-[10px] xs:text-xs">
                    Full Stack
                  </div>
                </div>
                <div className="bg-[#f0c14b] bg-opacity-20 hover:bg-opacity-30 p-1.5 xxs:p-2 xs:p-3 rounded-lg transition-all duration-300 w-[60px] xxs:w-[65px] xs:w-[80px]">
                  <div className="text-[#f0c14b] text-sm xxs:text-base xs:text-xl mb-0.5 xxs:mb-0.5 xs:mb-1">
                    API Dev
                  </div>
                  <div className="text-white text-[8px] xxs:text-[10px] xs:text-xs">
                    APIs
                  </div>
                </div>
                <div className="bg-[#f0c14b] bg-opacity-20 hover:bg-opacity-30 p-1.5 xxs:p-2 xs:p-3 rounded-lg transition-all duration-300 w-[60px] xxs:w-[65px] xs:w-[80px]">
                  <div className="text-[#f0c14b] text-sm xxs:text-base xs:text-xl mb-0.5 xxs:mb-0.5 xs:mb-1">
                    Mobile
                  </div>
                  <div className="text-white text-[8px] xxs:text-[10px] xs:text-xs">
                    Cross-Platform
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 xxs:mt-4 xs:mt-6 text-center">
            <p className="font-poppins text-sm xxs:text-base xs:text-lg font-semibold text-white mb-1.5 xxs:mb-2">
              Development Expertise
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 xxs:gap-2">
              <div className="px-1.5 xxs:px-2 xs:px-3 py-0.5 xxs:py-0.75 xs:py-1 bg-[#12122a] rounded-lg text-[#a3a3a3] text-[10px] xxs:text-xs xs:text-sm">
                React
              </div>
              <div className="px-1.5 xxs:px-2 xs:px-3 py-0.5 xxs:py-0.75 xs:py-1 bg-[#12122a] rounded-lg text-[#a3a3a3] text-[10px] xxs:text-xs xs:text-sm">
                Node.js
              </div>
              <div className="px-1.5 xxs:px-2 xs:px-3 py-0.5 xxs:py-0.75 xs:py-1 bg-[#12122a] rounded-lg text-[#a3a3a3] text-[10px] xxs:text-xs xs:text-sm">
                Python
              </div>
              <div className="px-1.5 xxs:px-2 xs:px-3 py-0.5 xxs:py-0.75 xs:py-1 bg-[#12122a] rounded-lg text-[#a3a3a3] text-[10px] xxs:text-xs xs:text-sm">
                MongoDB
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
