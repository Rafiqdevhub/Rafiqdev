import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { FaRobot, FaPaperPlane, FaTrash, FaLightbulb } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { UserData } from "../data/UserData";
import { ProjectsList } from "../data/ProjectsList";
import { processUserMessage } from "../utils/chatbotResponses";

function ChatbotSection() {
  const getInitialMessages = () => {
    try {
      const savedMessages = localStorage.getItem("portfolio-chatbot-messages");
      if (savedMessages) {
        return JSON.parse(savedMessages);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
    return [
      {
        text: `Hi there! I'm ${UserData.name}'s virtual assistant. How can I help you today?`,
        sender: "bot",
      },
    ];
  };

  const [messages, setMessages] = useState(getInitialMessages);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(
        "portfolio-chatbot-messages",
        JSON.stringify(messages),
      );
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  }, [messages]);

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
    [],
  );

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
      setTimeout(async () => {
        try {
          const response = await processUserMessage(
            userMessage,
            portfolioContext,
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
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const clearConversation = useCallback(() => {
    const defaultMessage = [
      {
        text: `Hi there! I'm ${UserData.name}'s virtual assistant. How can I help you today?`,
        sender: "bot",
      },
    ];
    setMessages(defaultMessage);
    try {
      localStorage.setItem(
        "portfolio-chatbot-messages",
        JSON.stringify(defaultMessage),
      );
    } catch (error) {
      console.error("Error clearing chat history:", error);
    }
  }, []);

  const suggestedQuestions = [
    "What are your key skills?",
    "Tell me about your projects",
    "What's your experience?",
  ];

  return (
    <div className="w-full relative pb-12 xxs:pb-16 xs:pb-20 min-h-screen flex flex-col overflow-hidden">
      {" "}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-pink-500/10 to-transparent rounded-full blur-3xl animate-float"></div>

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(124, 58, 219, .05) 25%, rgba(124, 58, 219, .05) 26%, transparent 27%, transparent 74%, rgba(124, 58, 219, .05) 75%, rgba(124, 58, 219, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(124, 58, 219, .05) 25%, rgba(124, 58, 219, .05) 26%, transparent 27%, transparent 74%, rgba(124, 58, 219, .05) 75%, rgba(124, 58, 219, .05) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/40 pointer-events-none"></div>
      <div className="relative flex-1 flex flex-col z-10">
        <div className="text-center space-y-4 xxs:space-y-5 xs:space-y-7 mb-10 xxs:mb-12 xs:mb-14 px-2 xxs:px-4 pt-8 xs:pt-12">
          <div className="inline-flex mx-auto items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 backdrop-blur-sm">
            <span className="text-xs xxs:text-sm text-indigo-300 font-semibold">
              AI-Powered Assistant
            </span>
          </div>

          <h1
            className="font-tinos mx-auto w-full xs:w-[95%] text-3xl xxs:text-4xl xs:text-5xl lg:text-6xl font-bold text-white leading-tight"
            style={{ fontFamily: "'Tinos', serif" }}
          >
            Chat with My{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent animate-gradient">
              Intelligent Assistant
            </span>
          </h1>

          <p className="text-slate-300 text-sm xxs:text-base xs:text-lg max-w-3xl mx-auto leading-relaxed font-light">
            Have questions about {UserData.name}&apos;s work, skills, or
            experience? Chat with an AI assistant trained on their portfolio
            data to get instant answers!
          </p>
        </div>

        <div className="mx-auto w-full max-w-6xl flex justify-center items-center px-2 xxs:px-4 flex-1">
          <div className="w-full relative">
            <div
              className="w-full min-h-[650px] md:min-h-[750px] rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl border border-white/10 relative"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                boxShadow:
                  "0 25px 50px rgba(0,0,0,0.3), 0 0 40px rgba(79, 70, 229, 0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-50"></div>

              <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 flex h-20 items-center justify-between px-6 xs:px-8 border-b border-white/20 backdrop-blur-md">
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center shadow-lg">
                      <FaRobot className="text-white text-lg" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
                  </div>

                  <div>
                    <p className="font-bold text-white text-sm xs:text-base truncate">
                      {UserData.name}&apos;s AI Assistant
                    </p>
                    <div className="flex items-center gap-1 text-white/70 text-xs">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span>Active & Ready</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={clearConversation}
                  className="group relative p-2 rounded-full text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10"
                  aria-label="Clear conversation"
                  title="Clear conversation"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-20 transition duration-300 blur"></div>
                  <FaTrash className="text-lg relative z-10" />
                </button>
              </div>

              <div className="flex h-[450px] md:h-[550px] flex-col overflow-y-auto p-4 xs:p-6 space-y-4">
                {messages.length === 1 && !isTyping && (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="text-4xl animate-bounce">
                        <HiSparkles className="text-yellow-300 mx-auto" />
                      </div>
                      <p className="text-white/70 text-sm max-w-xs">
                        Start a conversation! Try asking about skills, projects,
                        or experience.
                      </p>
                    </div>
                  </div>
                )}

                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-end gap-3 animate-fade-slide-in ${
                      message.sender === "user"
                        ? "flex-row-reverse"
                        : "flex-row"
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {message.sender === "bot" && (
                      <div className="relative flex-shrink-0">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg">
                          <FaRobot className="text-white text-sm" />
                        </div>
                      </div>
                    )}

                    <div
                      className={`max-w-[70%] xs:max-w-[65%] rounded-2xl px-4 xs:px-5 py-3 shadow-lg backdrop-blur-sm border transform transition-all duration-200 hover:scale-105 ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-400/50 rounded-br-none"
                          : "bg-white/15 text-white border-white/30 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line break-words">
                        {message.text}
                      </p>
                    </div>

                    {message.sender === "user" && (
                      <div className="flex-shrink-0">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg border-2 border-white/20">
                          <span className="text-white text-xs font-bold">
                            You
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-end gap-3 animate-fade-in">
                    <div className="relative flex-shrink-0">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg">
                        <FaRobot className="text-white text-sm" />
                      </div>
                    </div>
                    <div className="bg-white/15 border border-white/30 rounded-2xl px-4 py-3 backdrop-blur-sm rounded-bl-none">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                        <div
                          className="w-2 h-2 rounded-full bg-white animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-white animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-white/20 bg-gradient-to-t from-black/5 to-transparent backdrop-blur-md px-4 xs:px-6 py-4">
                {messages.length === 1 && !isTyping && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setInputText(question);
                        }}
                        className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-1"
                      >
                        <FaLightbulb className="text-yellow-300" />
                        {question}
                      </button>
                    ))}
                  </div>
                )}

                <div
                  className={`flex h-12 items-center gap-3 rounded-full bg-white/10 border px-5 transition-all duration-300 ${
                    isFocused
                      ? "border-indigo-400/50 shadow-lg shadow-indigo-500/20 bg-white/15"
                      : "border-white/20 bg-white/10"
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Ask me anything..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-sm"
                  />
                  <button
                    onClick={handleSend}
                    disabled={inputText.trim() === ""}
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 transform flex-shrink-0 ${
                      inputText.trim() === ""
                        ? "bg-white/10 text-white/40 cursor-not-allowed"
                        : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-purple-500/50 hover:scale-110 active:scale-95"
                    }`}
                  >
                    <FaPaperPlane className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatbotSection;
