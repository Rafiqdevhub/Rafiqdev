import { GoogleGenerativeAI } from "@google/generative-ai";
import { getEnv } from "./env";
import { UserData } from "../data/UserData";
import { handleApiError, withRetry } from "./networkHandlers";

// Cache for the AI instance to avoid recreation
let genAIInstance = null;

/**
 * Initialize the Google Generative AI with API key from environment variables
 * Uses singleton pattern to avoid recreating the instance
 */
const initializeGenerativeAI = () => {
  if (genAIInstance) return genAIInstance;

  const apiKey = getEnv("VITE_GEMINI_API_KEY", "");
  if (!apiKey) {
    console.error("Gemini API Key is not defined in environment variables");
    return null;
  }

  genAIInstance = new GoogleGenerativeAI(apiKey);
  return genAIInstance;
};

/**
 * Prepare portfolio context data for the AI
 * @param {object} portfolioContext - Original portfolio context
 * @returns {string} - Stringified version with essential information
 */
const prepareContextData = (portfolioContext) => {
  try {
    // Enhance context with social media links
    const socialLinks = {};
    UserData.socialMedia.forEach((media) => {
      socialLinks[media.socialMediaName] = media.url;
    });

    // Include resume URL
    const resumeUrl = UserData.resumeUrl;

    // Create context for the AI with selective data to reduce token usage
    const streamlinedContext = {
      owner: portfolioContext.owner,
      skills: portfolioContext.skills,
      experience: {
        summary: portfolioContext.experience.summary,
        highlights: portfolioContext.experience.highlights.slice(0, 3),
      },
      education: portfolioContext.education,
      socialLinks: socialLinks,
      resumeUrl: resumeUrl,
      projects: portfolioContext.projects
        .slice(0, 8) // Limit to top 8 projects to save tokens
        .map((p) => ({
          name: p.name,
          description: p.description.substring(0, 120) + "...",
          technologies: p.technologies.slice(0, 5), // Limit technologies to 5 per project
          github: p.github || null,
        })),
    };

    return JSON.stringify(streamlinedContext);
  } catch (error) {
    console.error("Error preparing context data:", error);
    return JSON.stringify({
      owner: { name: UserData.name, role: "Full Stack Developer" },
      error: "Error preparing full context",
    });
  }
};

/**
 * Generate a response using Google's Gemini AI model with retry capability
 * @param {string} prompt - The user's message to generate a response for
 * @param {object} portfolioContext - Context about the portfolio to help generate relevant responses
 * @returns {Promise<string>} - The generated response
 */
export const generateGeminiResponse = async (prompt, portfolioContext) => {
  try {
    // Initialize with retry in case of network flakiness during initialization
    const genAI = await withRetry(initializeGenerativeAI);

    if (!genAI) {
      return "I'm currently experiencing technical difficulties. Please check back later or use the contact form to reach out directly.";
    }

    // Choose a model - use environment variable with fallback
    const modelName = getEnv("VITE_GEMINI_MODEL", "gemini-1.5-flash");
    const model = genAI.getGenerativeModel({
      model: modelName,
      // Add safety settings for production
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

    // Get context data
    const contextString = prepareContextData(portfolioContext);

    // Create the full prompt with context
    const fullPrompt = `
    You are a helpful virtual assistant for ${portfolioContext.owner.name}, a ${portfolioContext.owner.role}. 
    You're embedded on their portfolio website to help visitors learn about their skills, experience, and projects.
    
    When answering:
    - Be professional but conversational
    - Keep responses concise (under 130 words)
    - Be specific and refer to actual projects, skills, and experiences
    - If you don't know something specific, offer to connect the visitor with ${portfolioContext.owner.name} directly
    - Don't make up information that's not in the portfolio context
    - When asked about social media links or contact information, ALWAYS provide the actual links from the context
    - Emphasize that visitors can connect through various platforms like GitHub, LinkedIn, Twitter, or Instagram
    - Never provide personal contact details beyond what's in the portfolio context
    
    Here's the portfolio context (information about ${portfolioContext.owner.name}):
    ${contextString}
    
    User's message: ${prompt}
    
    Your helpful response:`;

    // Set a generation config with token limits for production efficiency
    const generationConfig = {
      maxOutputTokens: 250,
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
    };

    // Generate content with retry mechanism
    const generateWithRetry = async () => {
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
        generationConfig,
      });
      return result.response;
    };

    const response = await withRetry(generateWithRetry, 2, 1500);
    return response.text();
  } catch (error) {
    // Use standardized error handling - don't store the return value since we're
    // handling it inline with a friendly message
    handleApiError(error, "Gemini AI Response Generation");

    // Log more details in development
    if (import.meta.env.DEV) {
      console.error("Full error details:", error);
    }

    // Return a friendly message that doesn't expose technical details
    return "I'm sorry, but I encountered an issue processing your request. Please try again or contact directly through the contact form.";
  }
};
