import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic = "", platform = "X", tone = "Profesional" } = body;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY not set" },
        { status: 500 }
      );
    }

    // Build a prompt for the model
    const prompt = `
    Eres un generador de contenido para redes sociales.
    Crea un post atractivo para la plataforma ${platform}, con tono ${tone}.
    Tema: ${topic}

    Responde en formato JSON con keys: title, content, hashtags (array of strings).
    `;
    // Call OpenAI completions or responses API (example using fetch)
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Eres un asistente que devuelve JSON con title, content, hashtags",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 400,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "OpenAI error", details: text },
        { status: 500 }
      );
    }

    const data = await res.json();
    const assistant =
      data.choices?.[0]?.message?.content || data.choices?.[0]?.text || "";
    let parsed = {};
    const parser = (content: any) => {
      content = content.replace(/```json|```/g, "").trim();
      const data = JSON.parse(content);
      console.log("Parsed data:", data);
      return data;
    };
    try {
      parsed = parser(assistant);
    } catch (e) {
      // If the assistant returned plain text, wrap it
      parsed = parser(`{${assistant}}`);
    }

    return NextResponse.json(parsed);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    );
  }
}
