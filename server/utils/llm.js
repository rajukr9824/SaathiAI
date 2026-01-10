import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const buildPrompt = (input) => {
  if (Array.isArray(input)) {
    return input
      .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n\n");
  }

  if (typeof input === "string") {
    return input;
  }

  throw new Error("Invalid input type to callLLM");
};

export const callLLM = async (input) => {
  const prompt = buildPrompt(input);

  // 1️⃣ Try Gemini first
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (geminiError) {
    console.error("Gemini failed → Switching to ChatGPT:", geminiError.message);
  }

  // 2️⃣ Fallback to ChatGPT
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (openaiError) {
    console.error("ChatGPT Error:", openaiError.message);
    return "Sorry, both AI services are currently unavailable. Please try again later.";
  }
};
