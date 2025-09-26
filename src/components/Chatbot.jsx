import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaTrash } from "react-icons/fa";
import { HiSparkles, HiChatBubbleLeftRight } from "react-icons/hi2";
import { BsStars } from "react-icons/bs";
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
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Welcome animation on app load
    const welcomeTimer = setTimeout(() => {
      setShowWelcomeAnimation(false);
    }, 4000);

    // Popup hint after welcome animation
    const hintTimer = setTimeout(() => {
      if (!isOpen) {
        setShowPopupHint(true);
        setTimeout(() => setShowPopupHint(false), 6000);
      }
    }, 5000);

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(hintTimer);
    };
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
      {/* Welcome Animation Overlay */}
      {showWelcomeAnimation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-out">
          <div className="bg-indigo-600 rounded-2xl p-8 shadow-2xl animate-bounce-in">
            <div className="text-center">
              <div className="relative mb-4">
                <FaRobot className="text-6xl text-white mx-auto animate-pulse" />
                <HiSparkles className="absolute -top-2 -right-2 text-yellow-300 text-2xl animate-spin" />
                <BsStars className="absolute -bottom-2 -left-2 text-blue-300 text-xl animate-ping" />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">
                Welcome to My Portfolio!
              </h3>
              <p className="text-white/80 text-sm">
                Click the chat button to get started
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Chatbot Button */}
      <div className="relative group">
        {/* Floating particles */}
        <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full animate-float-1 opacity-70"></div>
        <div className="absolute -top-1 -right-3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-float-2 opacity-60"></div>
        <div className="absolute -bottom-2 -left-3 w-1 h-1 bg-blue-400 rounded-full animate-float-3 opacity-50"></div>

        <button
          onClick={toggleChatbot}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 ${
            isOpen
              ? "bg-red-500 rotate-180 shadow-red-500/30"
              : "bg-indigo-500 shadow-purple-500/40 hover:shadow-purple-500/60 animate-float"
          }`}
          aria-label="Toggle chatbot"
        >
          {/* Glow effect */}
          <div
            className={`absolute inset-0 rounded-full ${
              isOpen ? "bg-red-400" : "bg-indigo-400"
            } blur-md opacity-50 animate-pulse`}
          ></div>

          <div className="relative z-10">
            {isOpen ? (
              <FaTimes className="text-white text-xl animate-spin-once" />
            ) : (
              <div className="relative">
                <FaRobot className="text-white text-xl" />
                <HiSparkles className="absolute -top-1 -right-1 text-yellow-300 text-sm animate-bounce" />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Enhanced Popup Hint */}
      {showPopupHint && !isOpen && (
        <div className="absolute bottom-20 right-0 animate-slide-up-fade">
          <div className="relative bg-indigo-600 text-white text-sm rounded-2xl px-4 py-3 shadow-2xl border border-white/20 backdrop-blur-sm">
            {/* Arrow pointer */}
            <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-indigo-600"></div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <HiChatBubbleLeftRight className="text-xl text-yellow-300" />
                <HiSparkles className="absolute -top-1 -right-1 text-xs text-pink-300 animate-ping" />
              </div>
              <div>
                <p className="font-semibold text-sm">Need Help?</p>
                <p className="text-xs opacity-90">
                  Ask me anything about Rafiq!
                </p>
              </div>
            </div>

            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl bg-yellow-400 opacity-30 animate-border-flow"></div>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          ref={chatContainerRef}
          className="absolute bottom-20 right-0 h-[400px] w-[320px] sm:w-[380px] overflow-hidden rounded-3xl shadow-2xl animate-slide-in-up backdrop-blur-xl border border-white/10"
          style={{
            background: "rgba(79, 70, 229, 0.95)",
            boxShadow:
              "0 25px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          {/* Enhanced Header */}
          <div className="bg-indigo-600/90 flex h-16 items-center justify-between px-5 border-b border-white/20 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg">
                  <FaRobot className="text-white text-sm" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <p className="font-bold text-white text-sm truncate">
                  {UserData.name}&apos;s AI Assistant
                </p>
                <p className="text-white/70 text-xs">Online now</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearConversation}
                className="text-white/80 hover:text-white transition-all duration-300 p-2 rounded-full hover:bg-white/10"
                aria-label="Clear conversation"
                title="Clear conversation"
              >
                <FaTrash className="text-sm" />
              </button>
              <button
                onClick={toggleChatbot}
                className="text-white/80 hover:text-white transition-all duration-300 p-2 rounded-full hover:bg-white/10"
                aria-label="Close chatbot"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            className="flex h-[280px] flex-col overflow-y-auto p-4 space-y-3"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)",
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 animate-fade-slide-in ${
                  message.sender === "user" ? "justify-end space-x-reverse" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {message.sender === "bot" && (
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center shadow-md">
                      <FaRobot className="text-white text-xs" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
                  </div>
                )}

                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-lg backdrop-blur-sm border ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white border-blue-400/30"
                      : "bg-white/15 text-white border-white/20"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {message.text}
                  </p>
                </div>

                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center shadow-md flex-shrink-0">
                    <span className="text-white text-xs font-bold">You</span>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-2 animate-fade-in">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center shadow-md">
                    <FaRobot className="text-white text-xs" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white animate-pulse"></div>
                </div>
                <div className="bg-white/15 border border-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm">
                  <div className="flex space-x-1">
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

          {/* Input Area */}
          <div className="flex h-14 items-center border-t border-white/20 bg-black/20 backdrop-blur-md px-4">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            />
            <button
              onClick={handleSend}
              disabled={inputText.trim() === ""}
              className={`ml-3 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 transform hover:scale-105 ${
                inputText.trim() === ""
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-indigo-500 text-white shadow-lg hover:shadow-purple-500/30"
              }`}
            >
              <FaPaperPlane className="text-sm" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
