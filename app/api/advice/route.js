import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const { meal } = await req.json();

    if (!meal) {
      return Response.json(
        { reply: "You didn't even tell me what you ate. Amazing." },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a sarcastic but loving mom nutrition advisor.
You roast gently.
You NEVER give medical diagnoses.
You avoid extreme diet advice.
Keep responses under 120 words.
End with one practical suggestion.
Tone: witty, dramatic, but safe.
          `
        },
        {
          role: "user",
          content: `My meal: ${meal}`
        }
      ]
    });

    return Response.json({
      reply: completion.choices[0].message.content
    });
  } catch {
    return Response.json(
      {
        reply:
          "Oh fantastic. Even the internet is disappointed. Try again."
      },
      { status: 500 }
    );
  }
}
