export const summarizeMemory = async (chatHistory, llm) => {
  const prompt = `
Summarize the important personal details about the user.
Include:
- Name
- Preferences
- Emotional state
Keep it short (3–4 lines).
Do not invent anything.

Conversation:
${chatHistory}
`;

  const response = await llm(prompt);
  return response;
};
