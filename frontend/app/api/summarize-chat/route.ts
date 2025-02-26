// app/api/summarize-chat/route.js
import { NextRequest } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure your OpenAI key is set in .env.local
});

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    // Format chat messages for summarization
    const formattedMessages = messages
      .map(
        (msg: { role: string; content: any }) =>
          `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`,
      )
      .join("\n");

    // Generate the summary using the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Summarize the following conversation in Markdown format, including any tables and providing a clear, concise summary:\n\n${formattedMessages}\n\nSummary (Markdown format):`,
        },
      ],
      temperature: 0.7,
    });

    // @ts-ignore
    const summary = response.choices[0].message.content.trim();

    return new Response(JSON.stringify({ summary }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating summary:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate summary" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
