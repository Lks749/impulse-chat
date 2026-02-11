export interface Message {
  id: string;
  content: string;
  role: "user" | "ai";
}

const simulatedResponses = [
  "Olá! Como posso ajudar você hoje?",
  "Essa é uma ótima pergunta! Deixe-me pensar...",
  "Entendi. Posso te ajudar com isso.",
  "Interessante! Conte-me mais sobre o que você precisa.",
  "Claro, estou aqui para ajudar!",
];

/** Simulates an AI response. Replace with a real API call later. */
export async function getAIResponse(_userMessage: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));
  return simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)];
}
