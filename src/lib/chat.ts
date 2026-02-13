export interface Message {
  id: string;
  content: string;
  role: "user" | "ai";
}

export async function getAIResponse(userMessage: string): Promise<string> {
  try {
    const response = await fetch("https://n8n-latest-dftn.onrender.com/webhook-test/59edb265-54b5-49ff-843e-7311d4a03f6b", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro na requisição ao n8n");
    }

    const data = await response.json();

    return data.response; // precisa bater com o JSON que o n8n retorna
  } catch (error) {
    console.error("Erro ao comunicar com n8n:", error);
    return "Erro ao conectar com o servidor.";
  }
}
