export async function requestGigaChatScene(prompt: string): Promise<string> {
  const response = await fetch("http://192.168.0.157:3000/gigachat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "GigaChat",
      messages: [
        {
          role: "system",
          content:
            "Ты — движок визуальной новеллы RPG, генерируй сцены в JSON формате без лишних объяснений.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      repetition_penalty: 1,
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}
