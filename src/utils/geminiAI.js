import { GoogleGenerativeAI } from "@google/generative-ai";
import { getEnv } from "./env";
import { UserData } from "../data/UserData";

// Initialize the Google Generative AI with API key from environment variables
const initializeGenerativeAI = () => {
  const apiKey = getEnv("VITE_GEMINI_API_KEY", "");
  if (!apiKey) {
    console.error("Gemini API Key is not defined in environment variables");
    return null;
  }

  return new GoogleGenerativeAI(apiKey);
};

/**
 * Generate a response using Google's Gemini AI model
 * @param {string} prompt - The user's message to generate a response for
 * @param {object} portfolioContext - Context about the portfolio to help generate relevant responses
 * @returns {Promise<string>} - The generated response
 */
export const generateGeminiResponse = async (prompt, portfolioContext) => {
  try {
    const genAI = initializeGenerativeAI();

    if (!genAI) {
      return "I'm currently experiencing technical difficulties. Please check back later or use another way to contact.";
    }

    // Choose a model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Enhance context with social media links
    const socialLinks = {};
    UserData.socialMedia.forEach((media) => {
      socialLinks[media.socialMediaName] = media.url;
    });

    // Include resume URL
    const resumeUrl = UserData.resumeUrl;

    // Create context for the AI
    const contextString = JSON.stringify({
      owner: portfolioContext.owner,
      skills: portfolioContext.skills,
      experience: portfolioContext.experience,
      education: portfolioContext.education,
      socialLinks: socialLinks,
      resumeUrl: resumeUrl,
      projects: portfolioContext.projects.map((p) => ({
        name: p.name,
        description: p.description.substring(0, 150) + "...",
        technologies: p.technologies,
        github: p.github || null,
      })),
    });

    // Create the full prompt with context
    const fullPrompt = `
    You are a helpful virtual assistant for ${portfolioContext.owner.name}, a ${portfolioContext.owner.role}. 
    You're embedded on their portfolio website to help visitors learn about their skills, experience, and projects.
    
    When answering:
    - Be professional but conversational
    - Keep responses concise (under 150 words)
    - Be specific and refer to actual projects, skills, and experiences
    - If you don't know something specific, offer to connect the visitor with ${portfolioContext.owner.name} directly
    - Don't make up information that's not in the portfolio context
    - When asked about social media links or contact information, ALWAYS provide the actual links from the context
    - Emphasize that visitors can connect through various platforms like GitHub, LinkedIn, Twitter, or Instagram
    
    Here's the portfolio context (information about ${portfolioContext.owner.name}):
    ${contextString}
    
    User's message: ${prompt}
    
    Your helpful response:`;

    // Generate content
    const result = await model.generateContent(fullPrompt);
    const response = result.response;

    return response.text();
  } catch (error) {
    console.error("Error generating Gemini response:", error);
    return "I'm sorry, but I encountered an error processing your request. Please try again or contact directly through the contact form.";
  }
};
