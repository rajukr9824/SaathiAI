export const extractMemory = (text) => {
  const memory = {
    preferences: [],
    lastMood: null,
  };

  // Preferences
  const prefPatterns = [
    /i (like|love|enjoy)\s+([a-zA-Z ]+)/gi,
  ];

  prefPatterns.forEach((pattern) => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      memory.preferences.push(match[2].trim());
    }
  });

  // Mood
  const moods = ["stressed", "sad", "happy", "excited", "anxious", "tired"];
  moods.forEach((mood) => {
    if (text.toLowerCase().includes(mood)) {
      memory.lastMood = mood;
    }
  });

  return memory;
};
