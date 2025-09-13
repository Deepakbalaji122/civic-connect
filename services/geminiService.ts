
import { GoogleGenAI, Type } from "@google/genai";
import { Category, Priority } from '../types';

if (!process.env.API_KEY) {
  // A mock key is provided for demonstration purposes if the actual key is not set.
  // This allows the UI to function without a real API key.
  process.env.API_KEY = 'mock-api-key-for-testing';
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = 'gemini-2.5-flash';

const MOCK_RESPONSE = {
    category: Category.Pothole,
    priority: Priority.High
};

export const suggestCategoryAndPriority = async (description: string): Promise<{ category: Category; priority: Priority }> => {
  if (!description.trim()) {
    throw new Error("Description cannot be empty.");
  }
  
  // Return a mock response if the API key is the mock key.
  if (process.env.API_KEY === 'mock-api-key-for-testing') {
      console.log("Using mock Gemini API response.");
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      return MOCK_RESPONSE;
  }

  try {
    const prompt = `Analyze the following civic issue report and suggest the most appropriate category and priority level.
    
    Valid Categories: Pothole, Graffiti, Broken Streetlight, Waste Management, Traffic Signal Issue, Other.
    Valid Priorities: Low, Medium, High.
    
    Description: "${description}"
    
    Return the result as a JSON object with "category" and "priority" keys.`;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: {
              type: Type.STRING,
              enum: Object.values(Category),
              description: 'The suggested category for the issue.'
            },
            priority: {
              type: Type.STRING,
              enum: Object.values(Priority),
              description: 'The suggested priority for the issue.'
            }
          },
          required: ["category", "priority"]
        }
      }
    });

    const jsonString = response.text;
    const result = JSON.parse(jsonString);

    // Validate the response structure
    if (result.category && result.priority && Object.values(Category).includes(result.category) && Object.values(Priority).includes(result.priority)) {
      return result as { category: Category; priority: Priority };
    } else {
      throw new Error("Invalid response format from Gemini API.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get suggestions from AI. Please select manually.");
  }
};
