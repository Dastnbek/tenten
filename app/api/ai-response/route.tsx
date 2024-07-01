import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function POST(request: NextRequest) {
  const { prompt, systemPrompt } = await request.json();
  const openai = new OpenAI(process.env.OPENAI_KEY);
  const content = systemPrompt
    ? systemPrompt
    : "You're professional analytic that returns data in object in json {title: '', list: [{name: '', info: ''}]} format";

  console.log("system propmt", systemPrompt, "c", content);
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content,
      },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
  });

  return NextResponse.json(response.choices[0], { status: 201 });
}
