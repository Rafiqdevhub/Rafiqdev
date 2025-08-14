import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaTrash } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { UserData } from "../data/UserData";
import { ProjectsList } from "../data/ProjectsList";
import { processUserMessage } from "../utils/chatbotResponses";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: `Hi there! I'm ${UserData.name}'s virtual assistant. How can I help you today?`,
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showPopupHint, setShowPopupHint] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPopupHint(true);
        setTimeout(() => setShowPopupHint(false), 5000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const portfolioContext = useMemo(
    () => ({
      owner: {
        name: UserData.name,
        email: UserData.email,
        role: "Full Stack Developer",
        expertise: [
          "Frontend Development with React and Next.js",
          "Backend Development with Node.js and Python",
          "Cloud Services (AWS, GCP)",
          "Database Management (SQL and NoSQL)",
          "API Development and Integration",
          "Mobile App Development",
          "DevOps and CI/CD",
        ],
        biography: UserData.about,
      },
      skills: {
        frontend: [
          "React",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "HTML",
          "CSS",
          "Tailwind CSS",
          "Material UI",
        ],
        backend: [
          "Node.js",
          "Express",
          "Python",
          "Django",
          "FastAPI",
          "Flask",
          "Go",
        ],
        database: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
        cloud: ["AWS", "GCP", "Azure", "Netlify", "Vercel"],
        devops: ["Docker", "GitHub Actions", "CI/CD", "Nginx"],
        other: [
          "Git",
          "RESTful APIs",
          "GraphQL",
          "Stripe",
          "Authentication Systems",
        ],
      },
      experience: {
        summary:
          "Experienced in developing scalable web applications, implementing responsive designs, and optimizing application performance. Strong focus on clean code, user experience, and modern development practices.",
        highlights: [
          "Developed enterprise-level applications with 99.9% uptime",
          "Reduced application load times by 60% through optimization techniques",
          "Built secure payment processing systems integrated with Stripe",
          "Implemented OAuth and JWT-based authentication systems",
          "Created RESTful APIs consumed by thousands of users daily",
        ],
      },
      education: {
        degree: "Bachelor of Science in Computer Science",
        certifications: [
          "AWS Certified Solutions Architect",
          "Google Cloud Professional Developer",
          "MongoDB Certified Developer",
        ],
      },
      projects: ProjectsList.projects.map((project) => ({
        name: project.name,
        description: project.description,
        technologies: project.technologies,
        link: project.projectLink || "",
      })),
    }),
    []
  );

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChatbot = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    if (inputText.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: "user" },
    ]);

    const userMessage = inputText;
    setInputText("");

    setIsTyping(true);

    try {
      const timeoutId = setTimeout(async () => {
        try {
          const response = await processUserMessage(
            userMessage,
            portfolioContext
          );

          if (!response || response.trim() === "") {
            throw new Error("Empty response received");
          }

          setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
        } catch (error) {
          console.error("Error processing message:", error);
          setMessages((prev) => [
            ...prev,
            {
              text: "I'm having trouble processing your request right now. Please try again later or contact me directly through the contact form.",
              sender: "bot",
            },
          ]);
        } finally {
          setIsTyping(false);
        }
      }, 1200);

      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.error("Error in handleSend:", error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, there was an unexpected error. Please try again or use the contact form.",
          sender: "bot",
        },
      ]);
    }
  }, [inputText, portfolioContext]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSend();
      }
    },
    [handleSend]
  );

  const clearConversation = useCallback(() => {
    setMessages([
      {
        text: `Hi there! I'm ${UserData.name}'s virtual assistant. How can I help you today?`,
        sender: "bot",
      },
    ]);
  }, []);

  return (
    <div className="fixed bottom-4 right-4" style={{ zIndex: 1001 }}>
      <button
        onClick={toggleChatbot}
        className={`flex h-12 w-12 xs:h-14 xs:w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-gradient-to-r from-[#e57e31] to-[#f0c14b]"
            : "bg-gradient-to-r from-[#4158d0] to-[#c850c0] animate-pulse-slow"
        }`}
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <FaTimes className="text-white text-lg xs:text-xl" />
        ) : (
          <div className="relative">
            <FaRobot className="text-white text-lg xs:text-xl" />
            <HiSparkles className="absolute -top-1 -right-1 text-[#f0c14b] text-xs animate-bounce" />
          </div>
        )}
      </button>

      {showPopupHint && !isOpen && (
        <div className="absolute bottom-16 right-0 bg-gradient-to-r from-[#4158d0] to-[#c850c0] text-white text-xs xs:text-sm rounded-lg px-3 py-2 shadow-lg animate-fade-in">
          <span className="flex items-center">
            <HiSparkles className="mr-1 text-[#f0c14b]" />
            Have questions? Chat with me!
          </span>
        </div>
      )}

      {isOpen && (
        <div
          ref={chatContainerRef}
          className="absolute bottom-16 xs:bottom-20 right-0 h-[350px] xs:h-[400px] w-[280px] xs:w-[300px] sm:w-[350px] overflow-hidden rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] animate-slide-in"
          style={{
            boxShadow: "0 10px 25px rgba(65, 88, 208, 0.3)",
          }}
        >
          <div className="bg-gradient-to-r from-[#4158d0] to-[#c850c0] flex h-12 xs:h-14 items-center justify-between px-3 xs:px-4 border-b border-indigo-500/30">
            <div className="flex items-center">
              <FaRobot className="text-white mr-2 text-sm xs:text-base" />
              <p className="font-poppins text-sm xs:text-base font-semibold text-white truncate">
                {UserData.name}&#39;s AI Assistant
              </p>
            </div>
            <div className="flex items-center space-x-2 xs:space-x-3">
              <button
                onClick={clearConversation}
                className="text-white/80 hover:text-white transition-colors duration-300"
                aria-label="Clear conversation"
                title="Clear conversation"
              >
                <FaTrash className="text-xs xs:text-sm" />
              </button>
              <button
                onClick={toggleChatbot}
                className="text-white/80 hover:text-white transition-colors duration-300"
                aria-label="Close chatbot"
              >
                <FaTimes className="text-xs xs:text-sm" />
              </button>
            </div>
          </div>

          <div
            className="flex h-[260px] xs:h-[300px] flex-col overflow-y-auto p-3 xs:p-4"
            style={{
              backgroundColor: "rgba(17, 24, 39, 0.85)",
              backdropFilter: "blur(10px)",
              backgroundImage:
                "radial-gradient(at 20% 80%, rgba(76, 29, 149, 0.1) 0px, transparent 50%), radial-gradient(at 80% 10%, rgba(59, 130, 246, 0.1) 0px, transparent 50%)",
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 xs:mb-4 max-w-[85%] animate-fade-slide-in ${
                  message.sender === "user" ? "ml-auto" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`flex items-start ${
                    message.sender === "user" ? "justify-end" : ""
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="rounded-full bg-gradient-to-r from-[#4158d0] to-[#c850c0] p-1.5 mr-2 flex-shrink-0">
                      <FaRobot className="text-white text-xs" />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl px-3 xs:px-4 py-2 xs:py-2.5 shadow-sm ${
                      message.sender === "user"
                        ? "bg-gradient-to-br from-[#4158d0] to-[#6f42c1] text-white"
                        : "bg-white/10 text-white border border-white/10"
                    }`}
                  >
                    <p className="font-poppins text-xs xs:text-sm whitespace-pre-line">
                      {message.text}
                    </p>
                  </div>

                  {message.sender === "user" && (
                    <div className="rounded-full bg-[#6f42c1] p-1.5 ml-2 flex-shrink-0">
                      <span className="text-white text-xs">You</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="mb-3 xs:mb-4 max-w-[85%] animate-fade-in flex items-start">
                <div className="rounded-full bg-gradient-to-r from-[#4158d0] to-[#c850c0] p-1.5 mr-2">
                  <FaRobot className="text-white text-xs" />
                </div>
                <div className="rounded-2xl bg-white/10 border border-white/10 px-4 py-3">
                  <div className="flex space-x-1.5">
                    <div className="h-2 w-2 rounded-full bg-white animate-bounce"></div>
                    <div
                      className="h-2 w-2 rounded-full bg-white animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="h-2 w-2 rounded-full bg-white animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex h-[45px] xs:h-[52px] items-center border-t border-white/10 bg-black/30 backdrop-blur-md px-3 xs:px-4">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-full bg-white/10 border border-white/10 px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm text-white placeholder-white/50 outline-none focus:ring-1 focus:ring-[#c850c0] transition-all duration-300"
            />
            <button
              onClick={handleSend}
              disabled={inputText.trim() === ""}
              className={`ml-2 flex h-8 w-8 xs:h-9 xs:w-9 items-center justify-center rounded-full transition-all duration-300 ${
                inputText.trim() === ""
                  ? "bg-white/20 text-white/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#4158d0] to-[#c850c0] text-white hover:shadow-lg hover:shadow-purple-500/20"
              }`}
            >
              <FaPaperPlane className="text-xs xs:text-sm" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
