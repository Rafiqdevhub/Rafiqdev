import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser";
import { getEnv, validateEnv } from "../utils/env";
import ContactForm from "./ContactForm";

const ContactModal = ({ isOpen, onClose }) => {
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
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
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
    } else {
      setEnvError(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitStatus(null), 5000);
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
      <div className="relative w-full max-w-xl rounded-2xl border border-[#f0c14b]/20 bg-gradient-to-br from-[#11121a] to-[#1a1b26] p-5 xs:p-6 shadow-2xl">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/80 hover:bg-white/10"
        >
          Close
        </button>

        <h2 className="mb-4 text-xl xs:text-2xl font-bold text-white">
          Get in Touch
        </h2>

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

        <div className="mt-4 border-t border-[#2a2a4e] pt-3">
          <p className="font-poppins mb-1.5 text-xs text-[#a3a3a3] flex items-center">
            <svg
              className="w-3 h-3 mr-2 text-[#f0c14b]"
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
            className="font-poppins flex items-center text-[#f0c14b] hover:text-[#e57e31] transition-colors duration-300 text-xs"
            aria-label="Email me"
          >
            rafkhan9323@gmail.com
            <svg
              className="w-3 h-3 ml-2"
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
    </div>
  );
};

ContactModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ContactModal;
