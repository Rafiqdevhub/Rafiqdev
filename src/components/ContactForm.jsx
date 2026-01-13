import { memo } from "react";
import PropTypes from "prop-types";
import { FaPaperPlane } from "react-icons/fa";
import { useForm } from "@formspree/react";

const ContactForm = memo(({ formId = import.meta.env.VITE_FORMSPREE_ID }) => {
  const cleanFormId = formId?.split("/").pop() || formId;
  const [state, handleSubmit] = useForm(cleanFormId);

  if (!formId) {
    return (
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
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
        Contact form is currently unavailable. Please reach out directly via
        email.
      </div>
    );
  }

  if (state.succeeded) {
    return (
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
    );
  }

  return (
    <form
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
          required
          rows="4"
          placeholder="Tell me about your project"
          className="font-poppins w-full rounded-lg bg-[#12122a] px-2 xxs:px-3 xs:px-4 py-1.5 xxs:py-2 xs:py-3 text-xs xxs:text-xs xs:text-sm text-white placeholder-[#a3a3a3] outline-none border border-[#2a2a4e] focus:border-[#f0c14b] transition-all duration-300 resize-none"
          aria-label="Your message"
        ></textarea>
      </div>

      {state.errors && state.errors.length > 0 && (
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
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          Error sending message. Please try again or contact directly via email.
        </div>
      )}

      <button
        type="submit"
        disabled={state.submitting}
        className="send-button button-UI flex h-8 xxs:h-10 xs:h-12 w-full items-center justify-center gap-1.5 xxs:gap-2 xs:gap-3 rounded-lg px-3 xxs:px-4 xs:px-6 py-1 xxs:py-1.5 xs:py-2 font-bold tracking-wider text-[#0f0f1a] shadow-xl transition-all duration-300 hover:opacity-90 hover:shadow-2xl disabled:opacity-70 text-xs xxs:text-xs xs:text-sm"
        aria-label="Send message"
      >
        {state.submitting ? (
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
  );
});

ContactForm.propTypes = {
  formId: PropTypes.string,
};

ContactForm.displayName = "ContactForm";

export default ContactForm;
