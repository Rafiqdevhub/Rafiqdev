import { generateGeminiResponse } from "./geminiAI";
import { UserData } from "../data/UserData";

/**
 * Generate contextual responses for the chatbot based on user input
 * @param {string} userMessage - The user's message in lowercase
 * @param {object} portfolioContext - The portfolio context data
 * @returns {string} - The generated response
 */
export const generateContextualResponse = (userMessage, portfolioContext) => {
  // Check for social media link requests first
  if (
    /\b(?:social media|github|linkedin|twitter|instagram|connect|links|profiles|contact)\b/i.test(
      userMessage
    ) &&
    /\b(?:share|give|links|url|profile|social media|handle|username|account)\b/i.test(
      userMessage
    )
  ) {
    return generateSocialMediaResponse();
  }

  // Check for resume request
  if (
    /\b(?:resume|cv)\b/i.test(userMessage) &&
    /\b(?:link|url|download|access|view|see)\b/i.test(userMessage)
  ) {
    return `You can view or download ${portfolioContext.owner.name}'s resume at: ${UserData.resumeUrl}`;
  }

  // Intent matching patterns with regular expressions
  const intents = [
    {
      patterns: [
        /\b(?:hi|hello|hey|greetings|howdy)\b/i,
        /\bstart\b/i,
        /\bgood (?:morning|afternoon|evening)\b/i,
      ],
      responses: [
        `Hello! I'm ${portfolioContext.owner.name}'s virtual assistant. How can I help you today?`,
        `Hi there! I'd be happy to tell you about ${portfolioContext.owner.name}'s skills, projects, or experience.`,
        `Welcome to ${portfolioContext.owner.name}'s portfolio! What would you like to know?`,
      ],
    },
    {
      patterns: [
        /\b(?:who|what|tell me about|describe) (?:is|are|about) (?:you|rafiq|your creator|developer)\b/i,
        /\b(?:who|what) (?:created|made|developed|built) (?:you|this website|this portfolio|this site)\b/i,
        /\babout\b/i,
      ],
      responses: [
        `${portfolioContext.owner.name} is a ${
          portfolioContext.owner.role
        } specializing in ${portfolioContext.owner.expertise[0]} and ${
          portfolioContext.owner.expertise[1]
        }. ${portfolioContext.owner.biography.substring(
          0,
          150
        )}... You can read more in the About section.`,
        `${
          portfolioContext.owner.name
        } is a passionate developer with expertise in ${portfolioContext.skills.frontend
          .slice(0, 3)
          .join(", ")} for frontend and ${portfolioContext.skills.backend
          .slice(0, 3)
          .join(", ")} for backend development.`,
        `${portfolioContext.owner.name} is a software developer with a focus on creating scalable, high-performance applications. Some career highlights include ${portfolioContext.experience.highlights[0]} and ${portfolioContext.experience.highlights[1]}.`,
      ],
    },
    {
      patterns: [
        /\b(?:skills|technologies|tech stack|what can you do|expertise|proficient|good at)\b/i,
        /\bwhat (?:languages|frameworks|tools) (?:does|do) (?:rafiq|he|she|they) (?:know|use|work with)\b/i,
      ],
      responseGenerator: () => {
        const frontendSkills = portfolioContext.skills.frontend
          .slice(0, 4)
          .join(", ");
        const backendSkills = portfolioContext.skills.backend
          .slice(0, 4)
          .join(", ");
        const otherSkills = [
          ...portfolioContext.skills.database.slice(0, 2),
          ...portfolioContext.skills.cloud.slice(0, 2),
        ].join(", ");

        return `${portfolioContext.owner.name} is skilled in various technologies including:
• Frontend: ${frontendSkills}
• Backend: ${backendSkills}
• Database & Cloud: ${otherSkills}
• And many more! Is there a specific technology you'd like to know about?`;
      },
    },
    {
      patterns: [
        /\b(?:projects|work|portfolio|what have you built|applications|apps)\b/i,
        /\bwhat (?:projects|apps|applications|websites) (?:has|have) (?:rafiq|he|she|they) (?:built|made|created|developed|worked on)\b/i,
      ],
      responseGenerator: () => {
        const projectCount = portfolioContext.projects.length;
        const featuredProjects = portfolioContext.projects
          .slice(0, 3)
          .map((p) => p.name)
          .join(", ");

        return `${
          portfolioContext.owner.name
        } has worked on ${projectCount} projects including ${featuredProjects}, and more. Here are a few highlights:
          
1. ${
          portfolioContext.projects[0].name
        }: ${portfolioContext.projects[0].description.substring(0, 100)}...
2. ${portfolioContext.projects[1]?.name || "Project 2"}: ${
          portfolioContext.projects[1]?.description.substring(0, 100) ||
          "Another exciting project"
        }...

You can explore all projects in the Projects section. Would you like details about a specific project?`;
      },
    },
    {
      patterns: [
        /\b(?:contact|email|reach out|connect|get in touch|hire)\b/i,
        /\bhow (?:can|do) i (?:contact|reach|email|connect with|hire|work with) (?:rafiq|you|him|her|them)\b/i,
      ],
      responses: [
        `You can connect with ${portfolioContext.owner.name} through the Contact section of this website, or directly via email at ${portfolioContext.owner.email}.`,
        `The best way to reach ${portfolioContext.owner.name} is through the Contact form on this website. You can also connect via LinkedIn (link in the footer).`,
        `If you'd like to discuss a project or opportunity, please use the Contact form on this website or send an email directly to ${portfolioContext.owner.email}.`,
      ],
    },
    {
      patterns: [
        /\b(?:resume|cv|download|experience)\b/i,
        /\bwhere (?:can|do) i (?:find|see|get|download|view) (?:your|rafiq's|the) (?:resume|cv)\b/i,
      ],
      responses: [
        `You can view and download ${portfolioContext.owner.name}'s resume by clicking the Resume button in the navigation bar.`,
        `${portfolioContext.owner.name}'s resume is available for download through the Resume button at the top of the page.`,
        `The Resume button in the navigation bar will let you view and download ${portfolioContext.owner.name}'s complete CV.`,
      ],
    },
    {
      patterns: [
        /\b(?:experience|work history|background|career)\b/i,
        /\bhow (?:much|long) experience\b/i,
        /\bwhat (?:is|was) (?:your|rafiq's) (?:experience|background|history)\b/i,
      ],
      responseGenerator: () => {
        return `${portfolioContext.owner.name} has extensive experience as a ${portfolioContext.owner.role}. Some notable achievements include:
• ${portfolioContext.experience.highlights[0]}
• ${portfolioContext.experience.highlights[1]}
• ${portfolioContext.experience.highlights[2]}

${portfolioContext.experience.summary}`;
      },
    },
    {
      patterns: [
        /\b(?:education|degree|university|college|school|study|studied)\b/i,
        /\bwhere (?:did|has) (?:you|rafiq) (?:study|go to school|learn|graduate|get your degree)\b/i,
      ],
      responseGenerator: () => {
        return `${portfolioContext.owner.name} has a ${
          portfolioContext.education.degree
        }. Additionally, professional certifications include ${portfolioContext.education.certifications
          .slice(0, 2)
          .join(" and ")}.`;
      },
    },
    {
      patterns: [
        /\b(?:services|offer|provide|help with|hire for|available for)\b/i,
        /\bwhat (?:services|help) (?:does|do) (?:rafiq|you) (?:offer|provide)\b/i,
        /\bcan (?:rafiq|you) (?:help|assist) (?:me|us) with\b/i,
      ],
      responseGenerator: () => {
        return `${portfolioContext.owner.name} offers the following services:
• Full-stack web application development
• Mobile app development
• Frontend design and implementation
• Backend API development
• Database design and optimization
• Performance optimization for existing applications
• Technical consultation and architecture planning

Feel free to reach out through the Contact form to discuss your specific project needs!`;
      },
    },
    {
      patterns: [/\b(?:thanks|thank you|helpful|appreciate|great|awesome)\b/i],
      responses: [
        `You're welcome! Feel free to ask if you have any other questions about ${portfolioContext.owner.name}'s portfolio, skills, or projects.`,
        `Happy to help! Is there anything else you'd like to know about ${portfolioContext.owner.name}'s work?`,
        `Glad I could assist. Don't hesitate to ask if you need any more information about ${portfolioContext.owner.name}'s background or projects.`,
      ],
    },
  ];

  // Check for specific skill inquiries
  const allSkills = [
    ...portfolioContext.skills.frontend,
    ...portfolioContext.skills.backend,
    ...portfolioContext.skills.database,
    ...portfolioContext.skills.cloud,
    ...portfolioContext.skills.devops,
    ...portfolioContext.skills.other,
  ];

  for (const skill of allSkills) {
    if (userMessage.includes(skill.toLowerCase())) {
      // Determine skill category
      let category = "technology";
      let projects = [];

      if (portfolioContext.skills.frontend.includes(skill))
        category = "frontend technology";
      else if (portfolioContext.skills.backend.includes(skill))
        category = "backend technology";
      else if (portfolioContext.skills.database.includes(skill))
        category = "database technology";
      else if (portfolioContext.skills.cloud.includes(skill))
        category = "cloud service";
      else if (portfolioContext.skills.devops.includes(skill))
        category = "DevOps tool";

      // Find projects using this skill
      portfolioContext.projects.forEach((project) => {
        if (project.technologies && project.technologies.includes(skill)) {
          projects.push(project.name);
        }
      });

      if (projects.length > 0) {
        return `Yes, ${
          portfolioContext.owner.name
        } is proficient in ${skill}, which is a ${category}. It was used in projects such as ${projects
          .slice(0, 2)
          .join(" and ")}${projects.length > 2 ? " and others" : ""}.`;
      } else {
        return `Yes, ${portfolioContext.owner.name} is proficient in ${skill}, which is a ${category}. You can see examples of work with this technology in the Projects section.`;
      }
    }
  }

  // Check for specific project inquiries
  for (const project of portfolioContext.projects) {
    if (userMessage.includes(project.name.toLowerCase())) {
      return `"${project.name}" is one of ${
        portfolioContext.owner.name
      }'s featured projects. ${
        project.description
      } It was built using technologies like ${
        project.technologies
          ? project.technologies.slice(0, 3).join(", ")
          : "various modern technologies"
      }. ${project.link ? `You can check it out here: ${project.link}` : ""}`;
    }
  }

  // Match intents
  for (const intent of intents) {
    for (const pattern of intent.patterns) {
      if (pattern.test(userMessage)) {
        if (intent.responseGenerator) {
          return intent.responseGenerator();
        } else {
          const responses = intent.responses;
          return responses[Math.floor(Math.random() * responses.length)];
        }
      }
    }
  }

  // Default response
  return `I'm here to help you learn more about ${portfolioContext.owner.name}'s skills, projects, and experience. Feel free to ask about specific technologies, projects, or professional background. You can also inquire about how to get in touch if you'd like to collaborate.`;
};

/**
 * Generates a response with social media links
 * @returns {string} - Response with social media links
 */
const generateSocialMediaResponse = () => {
  const { socialMedia, name } = UserData;

  let response = `Here are ${name}'s social media profiles where you can connect:\n\n`;

  socialMedia.forEach((media) => {
    response += `• ${
      media.socialMediaName.charAt(0).toUpperCase() +
      media.socialMediaName.slice(1)
    }: ${media.url}\n`;
  });

  response += `\nFeel free to reach out through any of these platforms!`;
  return response;
};

/**
 * Process user message and generate response using Gemini AI or fallback to rule-based responses
 * @param {string} userMessage - The user's message
 * @param {object} portfolioContext - The portfolio context data
 * @returns {Promise<string>} - The generated response
 */
export const processUserMessage = async (userMessage, portfolioContext) => {
  try {
    // Try generating a response with Gemini AI
    const geminiResponse = await generateGeminiResponse(
      userMessage,
      portfolioContext
    );

    // If we got a valid response from Gemini, use it
    if (geminiResponse && geminiResponse.length > 0) {
      return geminiResponse;
    }

    // Fallback to rule-based responses if Gemini fails
    return generateContextualResponse(userMessage, portfolioContext);
  } catch (error) {
    console.error("Error processing message with Gemini:", error);
    // Fallback to rule-based responses
    return generateContextualResponse(userMessage, portfolioContext);
  }
};
