import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const buildPrompt = (input) => {
  if (Array.isArray(input)) {
    return input
      .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n\n");
  }
  if (typeof input === "string") return input;
  throw new Error("Invalid input type to callLLM");
};

export const callLLM = async (input) => {
  const prompt = buildPrompt(input);

  // 1️⃣ ATTEMPT GEMINI
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // Updated to existing 2.0 version
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    if (text) {
      return { text, provider: "Gemini" };
    }
  } catch (geminiError) {
    console.error("Gemini failed → Switching to ChatGPT:", geminiError.message);
  }

  // 2️⃣ FALLBACK TO CHATGPT
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return { 
      text: completion.choices[0].message.content, 
      provider: "ChatGPT" 
    };
  } catch (openaiError) {
    console.error("ChatGPT Error:", openaiError.message);
  }

  // 3️⃣ BOTH FAILED
  return { 
    text: "Both AI services are currently unavailable. Please try again later.", 
    provider: "None" 
  };
};