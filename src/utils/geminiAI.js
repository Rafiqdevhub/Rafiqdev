import { GoogleGenerativeAI } from "@google/generative-ai";
import { getEnv } from "./env";
import { UserData } from "../data/UserData";
import { ProjectsList } from "../data/ProjectsList";
import { handleApiError, withRetry } from "./networkHandlers";

/**
 * Singleton Gemini AI instance
 */
let genAIInstance = null;

/**
 * Initialize Gemini AI with API key from environment variables
 * Uses singleton pattern to avoid recreating the instance
 */
const initializeGenerativeAI = () => {
  if (genAIInstance) return genAIInstance;

  const apiKey = getEnv("VITE_GEMINI_API_KEY", "");
  if (!apiKey) {
    console.error("❌ Gemini API key missing in environment variables.");
    return null;
  }

  genAIInstance = new GoogleGenerativeAI(apiKey);
  return genAIInstance;
};

/**
 * Prepare complete portfolio context for AI understanding
 */
const prepareContextData = (portfolioContext) => {
  try {
    const socialLinks = {};
    UserData.socialMedia?.forEach((media) => {
      socialLinks[media.socialMediaName.toLowerCase()] = media.url;
    });

    const comprehensiveContext = {
      owner: {
        ...portfolioContext.owner,
        name: UserData.name,
        email: UserData.email,
        location: UserData.location,
        phone: UserData.phone,
        biography: UserData.about,
        resumeUrl: UserData.resumeUrl,
        typewriterOptions: UserData.typewriterOptions,
        socialLinks,
      },
      skills: UserData.skills,
      education: UserData.education,
      projects: ProjectsList.projects || [],
      experience: {
        summary: portfolioContext.experience?.summary,
        highlights: portfolioContext.experience?.highlights,
        workExperience: UserData.experiences || [],
      },
      contact: {
        email: UserData.email,
        phone: UserData.phone,
        location: UserData.location,
        socialMedia: socialLinks,
        resume: UserData.resumeUrl,
      },
      activities: UserData.activities,
      languages: UserData.languages,
    };

    return JSON.stringify(comprehensiveContext, null, 2);
  } catch (error) {
    console.error("⚠️ Error preparing context:", error);
    return JSON.stringify({
      owner: { name: UserData.name || "Rafiq", role: "Full Stack Developer" },
      error: "Context preparation failed",
    });
  }
};

/**
 * Verify and clean the AI response before returning it to the user
 */
const sanitizeAIResponse = (responseText) => {
  if (!responseText || responseText.trim() === "") {
    return "I don’t have that information.";
  }

  // Remove unnecessary phrases Gemini sometimes adds
  const cleanText = responseText
    .replace(/^Sure, /i, "")
    .replace(/^Here’s (the|a) link:?/i, "")
    .replace(/^(As an AI|I'm sorry).*$/i, "")
    .trim();

  return cleanText || "I don’t have that information.";
};

/**
 * Generate concise, context-aware portfolio responses
 */
export const generateGeminiResponse = async (prompt, portfolioContext) => {
  try {
    const genAI = await withRetry(initializeGenerativeAI);

    if (!genAI) {
      return "System unavailable. Please try again later.";
    }

    const modelName = getEnv("VITE_GEMINI_MODEL", "gemini-2.0-flash");
    const model = genAI.getGenerativeModel({
      model: modelName,
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    });

    const contextString = prepareContextData(portfolioContext);

    // 🔹 Prompt rules for precise and consistent responses
    const fullPrompt = `
You are Rafiq’s portfolio AI assistant.

Your strict rules:
1. Answer questions based only on the provided portfolio context.
2. Be specific and concise. Do not add extra information, commentary, or filler.
3. If asked for a link (GitHub, LinkedIn, resume, etc.), return ONLY the URL.
4. If asked for a list (projects, skills, experiences, etc.), provide the list clearly.
5. If asked about a specific project, reply in one short paragraph.
6. If the question is outside the portfolio context or you don't have info, reply only with: "I don't have that information."
7. Do not include greetings, sign-offs, or markdown.
8. No emojis, no polite fluff.

Response tone:
- Clean, factual, and minimal.

Portfolio Context (JSON):
${contextString}

User Message: ${prompt}
Response:
`;

    const generationConfig = {
      maxOutputTokens: 300,
      temperature: 0.5,
      topP: 0.9,
      topK: 40,
    };

    const result = await withRetry(async () => {
      const res = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
        generationConfig,
      });
      return res.response;
    });

    return sanitizeAIResponse(result.text());
  } catch (error) {
    handleApiError(error, "Gemini Portfolio Assistant");
    if (import.meta.env.DEV) console.error("Detailed error:", error);
    return "I encountered an issue processing your request. Please try again later.";
  }
};
