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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-purple-500/25 via-pink-500/20 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s" }}
        ></div>

        <div
          className="absolute top-20 left-[15%] w-2 h-2 bg-cyan-400/60 rounded-full animate-float"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-40 right-[20%] w-3 h-3 bg-purple-400/50 rounded-full animate-float"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-[25%] w-2 h-2 bg-pink-400/60 rounded-full animate-float"
          style={{ animationDuration: "5s", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-[30%] w-2 h-2 bg-blue-400/50 rounded-full animate-float"
          style={{ animationDuration: "4.5s", animationDelay: "0.5s" }}
        ></div>

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/40 to-slate-950/60 pointer-events-none"></div>

      <div className="relative flex-1 flex flex-col z-10">
        <div className="text-center space-y-4 xxs:space-y-5 xs:space-y-7 mb-8 xxs:mb-10 xs:mb-12 px-2 xxs:px-4 pt-8 xs:pt-12">
          <div
            className="inline-flex mx-auto items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-400/30 backdrop-blur-md shadow-lg shadow-cyan-500/10 animate-pulse"
            style={{ animationDuration: "3s" }}
          >
            <HiSparkles
              className="text-cyan-300 animate-spin"
              style={{ animationDuration: "3s" }}
            />
            <span className="text-xs xxs:text-sm text-cyan-200 font-bold tracking-wide">
              AI-POWERED INTELLIGENCE
            </span>
            <HiSparkles
              className="text-purple-300 animate-spin"
              style={{ animationDuration: "3s", animationDirection: "reverse" }}
            />
          </div>

          <h1
            className="font-tinos mx-auto w-full xs:w-[95%] text-3xl xxs:text-4xl xs:text-5xl lg:text-6xl font-bold text-white leading-tight relative"
            style={{ fontFamily: "'Tinos', serif" }}
          >
            <span className="relative inline-block">
              Experience
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 blur-2xl opacity-30 -z-10"></div>
            </span>{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient inline-block">
              Next-Gen AI
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent animate-gradient">
              Conversation
            </span>
          </h1>

          <p className="text-slate-300 text-sm xxs:text-base xs:text-lg max-w-3xl mx-auto leading-relaxed font-light">
            Dive into an intelligent conversation about{" "}
            <span className="text-cyan-300 font-semibold">
              {UserData.name}&apos;s
            </span>{" "}
            expertise, projects, and skills. Powered by advanced AI trained on
            comprehensive portfolio data.
          </p>
        </div>

        <div className="mx-auto w-full max-w-6xl flex justify-center items-center px-2 xxs:px-4 flex-1">
          <div className="w-full relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition duration-500"></div>

            <div
              className="w-full min-h-[650px] md:min-h-[750px] rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl border border-white/20 relative"
              style={{
                background:
                  "linear-gradient(145deg, rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.7))",
                boxShadow:
                  "0 30px 60px rgba(0,0,0,0.5), 0 0 80px rgba(6, 182, 212, 0.15), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.5)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"></div>

              <div className="relative flex h-24 items-center justify-between px-6 xs:px-8 border-b border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
                <div className="absolute inset-0 backdrop-blur-xl"></div>

                <div className="flex items-center space-x-4 relative z-10">
                  <div className="relative group/avatar">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-ping opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl opacity-50 group-hover/avatar:opacity-75 transition duration-300"></div>

                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/50 transform transition-transform group-hover/avatar:scale-110 group-hover/avatar:rotate-12">
                      <FaRobot className="text-white text-xl drop-shadow-lg" />
                    </div>

                    <div className="absolute -bottom-1 -right-1 flex items-center justify-center">
                      <div className="absolute w-5 h-5 bg-emerald-400 rounded-full animate-ping opacity-50"></div>
                      <div className="relative w-5 h-5 bg-gradient-to-br from-emerald-300 to-emerald-500 rounded-full border-3 border-slate-900 shadow-lg shadow-emerald-500/50"></div>
                    </div>
                  </div>

                  <div>
                    <p className="font-bold text-white text-sm xs:text-base truncate flex items-center gap-2">
                      {UserData.name}&apos;s AI Assistant
                      <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                        Pro
                      </span>
                    </p>
                    <div className="flex items-center gap-2 text-white/70 text-xs">
                      <div className="relative flex items-center">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                      </div>
                      <span className="font-medium">
                        Online • Instant Response
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={clearConversation}
                  className="group/clear relative p-3 rounded-xl text-white/60 hover:text-white transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-white/20 backdrop-blur-sm"
                  aria-label="Clear conversation"
                  title="Clear conversation"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl opacity-0 group-hover/clear:opacity-20 transition duration-300 blur-lg"></div>
                  <FaTrash className="text-base relative z-10 transform group-hover/clear:scale-110 transition-transform" />
                </button>
              </div>

              <div className="flex h-[450px] md:h-[550px] flex-col overflow-y-auto p-4 xs:p-6 space-y-5 custom-scrollbar">
                {messages.length === 1 && !isTyping && (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-6 max-w-md">
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-3xl opacity-50 animate-pulse"></div>
                        <HiSparkles
                          className="text-6xl text-transparent bg-gradient-to-br from-cyan-300 via-blue-400 to-purple-400 bg-clip-text relative animate-bounce"
                          style={{ animationDuration: "2s" }}
                        />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">
                          Ready to Assist!
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                          Ask me anything about skills, experience, projects, or
                          technologies. I&apos;m here to provide instant,
                          intelligent responses.
                        </p>
                      </div>
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
                      <div className="relative flex-shrink-0 group/msg">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-md opacity-40 group-hover/msg:opacity-60 transition"></div>
                        <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                          <FaRobot className="text-white text-sm" />
                        </div>
                      </div>
                    )}

                    <div
                      className={`relative max-w-[75%] xs:max-w-[70%] rounded-2xl px-5 py-3.5 shadow-xl backdrop-blur-md border transform transition-all duration-300 hover:scale-[1.02] ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-cyan-500/90 via-blue-500/90 to-blue-600/90 text-white border-cyan-300/30 rounded-br-md shadow-cyan-500/30"
                          : "bg-gradient-to-br from-slate-800/60 to-slate-700/40 text-white border-white/20 rounded-bl-md shadow-slate-900/50"
                      }`}
                    >
                      {message.sender === "user" && (
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl blur-xl opacity-30 -z-10"></div>
                      )}

                      <p className="text-sm leading-relaxed whitespace-pre-line break-words">
                        {message.text}
                      </p>

                      <span
                        className={`text-[10px] mt-1 block ${message.sender === "user" ? "text-cyan-100/70" : "text-white/50"}`}
                      >
                        {new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {message.sender === "user" && (
                      <div className="flex-shrink-0 relative group/user">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full blur-md opacity-50 group-hover/user:opacity-70 transition"></div>
                        <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 via-rose-500 to-red-500 flex items-center justify-center shadow-lg border-2 border-white/20">
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
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-md opacity-40"></div>
                      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <FaRobot className="text-white text-sm" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/40 border border-white/20 rounded-2xl px-5 py-4 backdrop-blur-md rounded-bl-md shadow-xl">
                      <div className="flex space-x-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-bounce"></div>
                        <div
                          className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-white/10 bg-gradient-to-t from-slate-900/50 to-transparent backdrop-blur-xl px-4 xs:px-6 py-5">
                {messages.length === 1 && !isTyping && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    <p className="w-full text-xs text-white/50 mb-2 font-medium">
                      Quick Start:
                    </p>
                    {suggestedQuestions.map((question, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setInputText(question);
                        }}
                        className="group/btn relative text-xs px-4 py-2 rounded-xl bg-gradient-to-r from-slate-700/50 to-slate-600/50 hover:from-cyan-500/20 hover:to-blue-500/20 text-white/70 hover:text-white border border-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105 flex items-center gap-2 backdrop-blur-sm"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-0 group-hover/btn:opacity-10 transition blur-sm"></div>
                        <FaLightbulb className="text-yellow-400 group-hover/btn:animate-pulse" />
                        <span className="relative">{question}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div
                  className={`flex h-14 items-center gap-4 rounded-2xl border px-5 transition-all duration-300 backdrop-blur-md ${
                    isFocused
                      ? "border-cyan-400/60 shadow-xl shadow-cyan-500/20 bg-gradient-to-r from-slate-800/80 to-slate-700/80"
                      : "border-white/20 bg-slate-800/40"
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Type your message here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-sm font-medium"
                  />
                  <button
                    onClick={handleSend}
                    disabled={inputText.trim() === ""}
                    className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 transform flex-shrink-0 group/send ${
                      inputText.trim() === ""
                        ? "bg-slate-700/50 text-white/30 cursor-not-allowed"
                        : "bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50 hover:shadow-cyan-500/60 hover:scale-110 active:scale-95"
                    }`}
                  >
                    {inputText.trim() !== "" && (
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur-lg opacity-50 group-hover/send:opacity-75 transition"></div>
                    )}
                    <FaPaperPlane className="text-sm relative z-10 transform group-hover/send:translate-x-0.5 group-hover/send:-translate-y-0.5 transition-transform" />
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
