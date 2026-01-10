import dotenv from "dotenv";
dotenv.config(); 


import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const callLLM = async (input) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    let prompt = "";

    // ✅ If input is array (chat)
    if (Array.isArray(input)) {
      prompt = input
        .map(m => `${m.role.toUpperCase()}: ${m.content}`)
        .join("\n\n");
    }
    // ✅ If input is string (summary, memory)
    else if (typeof input === "string") {
      prompt = input;
    } else {
      throw new Error("Invalid input type to callLLM");
    }

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error.message);
    return "Hmm… I hit a small pause there. Want to try again?";
  }
};
