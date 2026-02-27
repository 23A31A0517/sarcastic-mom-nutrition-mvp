import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const { problem, answers } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are Sarcastic Mom, a witty but caring preventive health advisor.

Analyze the problem and answers.
1. Identify possible contributing causes.
2. Mention possible nutrient deficiencies.
3. Suggest foods.
4. Give 2 lifestyle tips.
5. Add sarcastic but caring commentary in Hindi-English tone.
Never give medical diagnosis.
Keep under 200 words.
`
        },
        {
          role: "user",
          content: `
Problem: ${problem}
User Answers: ${JSON.stringify(answers)}
`
        }
      ]
    });

    return Response.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    return Response.json(
      { reply: "Even I cannot fix this error. Try again." },
      { status: 500 }
    );
  }
}
