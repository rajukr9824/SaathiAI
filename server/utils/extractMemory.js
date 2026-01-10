export const extractMemory = (text) => {
  const memory = {
    name: null,
    preferences: [],
    mood: null,
  };

  // Name extraction
  const nameMatch = text.match(/\b(i am|i'm|my name is)\s+([A-Z][a-z]+)/i);
  if (nameMatch) {
    memory.name = nameMatch[2];
  }

  // Preferences extraction
  const prefPatterns = [
    /i (like|love|enjoy)\s+([a-zA-Z ]+)/gi,
  ];
  prefPatterns.forEach((pattern) => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      memory.preferences.push(match[2].trim());
    }
  });

  // Mood extraction
  const moods = ["stressed", "sad", "happy", "excited", "anxious", "tired"];
  moods.forEach((mood) => {
    if (text.toLowerCase().includes(mood)) {
      memory.mood = mood;
    }
  });

  return memory;
};
