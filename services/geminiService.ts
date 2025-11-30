import { GoogleGenAI, Type, Content } from "@google/genai";
import { Enchantment } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// Simple In-Memory Cache
const adviceCache: Record<string, { advice: string; synergy: string }> = {};
const buildCache: Record<string, string> = {};

export const getEnchantmentAdvice = async (
  enchantment: Enchantment, 
  context: string = "general usage"
): Promise<{ advice: string; synergy: string }> => {
  const cacheKey = `${enchantment.id}-${context}`;
  
  if (adviceCache[cacheKey]) {
      return adviceCache[cacheKey];
  }

  const client = getClient();
  if (!client) {
    return { 
      advice: "API Key missing. Unable to fetch arcane knowledge.", 
      synergy: "Unknown" 
    };
  }

  try {
    const prompt = `
      You are an expert Minecraft mechanic guide. 
      Analyze the enchantment "${enchantment.name}" (Max Level: ${enchantment.maxLevel}) for items: ${enchantment.items.join(', ')}.
      
      Context: ${context}.

      Provide:
      1. A short, pro-tip style advice on how to best use this enchantment.
      2. Synergy notes (what other enchants go well with it).
      
      Keep it brief, gamer-focused, and exciting.
    `;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            advice: { type: Type.STRING },
            synergy: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from oracle.");
    
    const result = JSON.parse(text);
    // Store in cache
    adviceCache[cacheKey] = result;
    return result;

  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      advice: "The arcane connection is disrupted. Try again later.",
      synergy: "Unknown"
    };
  }
};

export const getBuildStrategy = async (item: string): Promise<string> => {
    const normalizedItem = item.toLowerCase().trim();
    if (buildCache[normalizedItem]) {
        return buildCache[normalizedItem];
    }

    const client = getClient();
    if (!client) return "API Key missing.";

    try {
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `What is the absolute best "God" enchantment build for a Minecraft ${item} in the current version? List the specific enchantments and levels. Explain briefly why this combination is powerful.`,
        });
        const text = response.text || "No strategy found.";
        buildCache[normalizedItem] = text;
        return text;
    } catch (error) {
        console.error(error);
        return "Failed to retrieve build strategy.";
    }
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export const getChatResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
    const client = getClient();
    if (!client) return "I cannot connect to the arcane network (API Key Missing).";

    try {
        const chat = client.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "You are the Mystic Guide, an ancient and helpful AI specialized in Minecraft enchantments, mechanics, and builds. You are witty, concise, and use magical/gaming terminology. Keep answers short and helpful."
            },
            history: history.map(h => ({
                role: h.role,
                parts: [{ text: h.text }]
            }))
        });

        const response = await chat.sendMessage({ message: newMessage });
        return response.text || "The spirits are silent.";
    } catch (error) {
        console.error("Chat Error:", error);
        return "Something disturbed the magic. Please try asking again.";
    }
}