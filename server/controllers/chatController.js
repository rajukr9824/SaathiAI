import User from "../models/User.js";
import Message from "../models/Message.js";
import { systemPrompt } from "../prompts/systemPrompt.js";
import { buildMemoryPrompt } from "../prompts/memoryPrompt.js";
import { summarizeMemory } from "../utils/summarizeMemory.js";
import { extractMemory } from "../utils/extractMemory.js";
import { callLLM } from "../utils/llm.js";

export const chat = async (req, res) => {
  try {
    const userId = req.userId;
    const { message } = req.body;

    // 🔒 strict validation
    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        reply: "Message must be a non-empty string",
      });
    }

    // 1️⃣ Fetch authenticated user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ reply: "User not found" });
    }

    // 2️⃣ Save user message
    await Message.create({
      userId,
      role: "user",
      content: message.trim(),
    });

    // 3️⃣ Extract SAFE memory only (no identity fields)
    const extracted = extractMemory(message);

    // ✅ Preferences (safe)
    if (extracted.preferences?.length) {
      user.preferences = [
        ...new Set([...(user.preferences || []), ...extracted.preferences]),
      ];
    }

    // ✅ Mood (safe)
    if (extracted.lastMood) {
      user.lastMood = extracted.lastMood;
    }

    await user.save();

    // 4️⃣ Fetch recent messages
    const recentMessages = await Message.find({ userId })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    // 5️⃣ Build LLM prompt
    const messages = [
      { role: "system", content: systemPrompt },
      { role: "system", content: buildMemoryPrompt(user) },
      ...recentMessages.reverse().map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    // 6️⃣ Get LLM reply
    const reply = await callLLM(messages);

    // 7️⃣ Save assistant reply
    await Message.create({
      userId,
      role: "assistant",
      content: reply,
    });

    // 8️⃣ Update long-term memory summary
    const chatText = recentMessages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const updatedMemory = await summarizeMemory(chatText, callLLM);

    user.memorySummary = updatedMemory;
    await user.save();

    // 9️⃣ Respond
    res.json({ reply });
  } catch (error) {
    console.error("Chat Controller Error:", error);
    res.status(500).json({
      reply: "Sorry, I’m having trouble responding right now.",
    });
  }
};
