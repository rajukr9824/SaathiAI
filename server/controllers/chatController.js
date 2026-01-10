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

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ reply: "Message must be a non-empty string" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ reply: "User not found" });
    }

    // 1️⃣ Save user message
    await Message.create({
      userId,
      role: "user",
      content: message.trim(),
    });

    // 2️⃣ Extract & update lightweight memory
    const extracted = extractMemory(message);
    if (extracted.preferences?.length) {
      user.preferences = [
        ...new Set([...(user.preferences || []), ...extracted.preferences]),
      ];
    }
    if (extracted.lastMood) {
      user.lastMood = extracted.lastMood;
    }
    await user.save();

    // 3️⃣ Fetch recent history
    const recentMessages = await Message.find({ userId })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    const promptMessages = [
      { role: "system", content: systemPrompt },
      { role: "system", content: buildMemoryPrompt(user) },
      ...recentMessages.reverse().map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    // 4️⃣ Call LLM (may fallback)
    const { text, provider } = await callLLM(promptMessages);

    // 5️⃣ Save assistant reply
    await Message.create({
      userId,
      role: "assistant",
      content: text,
    });

    // 6️⃣ Background memory summary (SAFE)
    try {
      const chatText = recentMessages
        .map((m) => `${m.role}: ${m.content}`)
        .join("\n");

      const updatedMemory = await summarizeMemory(chatText, callLLM);

      // ✅ FIX: ensure memorySummary is ALWAYS a string
      user.memorySummary =
        typeof updatedMemory === "string"
          ? updatedMemory
          : updatedMemory?.text || user.memorySummary || "";

      await user.save();
    } catch (memErr) {
      console.error("Memory update failed:", memErr.message);
      // ❗ Do NOT crash chat for memory issues
    }

    // 7️⃣ Final response
    res.json({
      reply: text,
      provider,
    });
  } catch (error) {
    console.error("Chat Controller Error:", error);
    res.status(500).json({
      reply: "Sorry, I’m having trouble responding right now.",
      provider: "Error",
    });
  }
};
