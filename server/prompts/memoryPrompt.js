export const buildMemoryPrompt = (user) => {
  if (!user) return "";

  return `
Known information about the user:
- Name: ${user.name || "Unknown"}
- Preferences: ${user.preferences?.join(", ") || "None"}
- Last known mood: ${user.lastMood || "Neutral"}
- Past summary: ${user.memorySummary || "No prior memory"}

Use this information naturally in conversation.
`;
};
