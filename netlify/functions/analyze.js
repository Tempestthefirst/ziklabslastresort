export default async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  const body = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  // We add a system instruction to ensure the AI always returns JSON
  const systemInstruction = {
    parts: [{ text: "You are a lab equipment expert. Always respond in JSON format with equipmentName, issues (title/description), safety (title/description), usageSteps (array), and associated (array of 3 strings)." }]
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, systemInstruction }),
  });

  return new Response(await res.text(), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
};
