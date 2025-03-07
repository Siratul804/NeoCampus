import { NextResponse } from "next/server";
import { clubsData } from "@/data/ClubData";

const allEvents = clubsData.flatMap((club) => club.events || []);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function aiEventRecommend(input) {
  const systemPrompt = `You are an AI expert tasked with providing eventRecommend, easily understandable responses on the best events.`;

  // Request Groq API to generate answers
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Generate answers` },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    max_tokens: 1000,
    top_p: 0.8,
    stream: false,
  });

  const aiResponse = chatCompletion.choices[0].message.content;

  // console.log(aiResponse); // Log the AI response for debugging

  return aiResponse; // Return the response directly as JSON
}

export async function POST(req) {
  try {
    const { tag } = await req.json();

    if (!tag || typeof tag !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'tag' in request body." },
        { status: 400 }
      );
    }

    // Filter events based on the provided tag (case-insensitive)
    const filteredEvents = allEvents.filter((event) => {
      return (
        event.title.toLowerCase().includes(tag.toLowerCase()) ||
        event.description.toLowerCase().includes(tag.toLowerCase())
      );
    });

    // Ensure we return exactly 3 events
    const recommendedEvents = filteredEvents.slice(0, 3);

    return NextResponse.json({ events: recommendedEvents });
  } catch (err) {
    console.error("Error processing request:", err);
    return NextResponse.json(
      { error: "Failed to process the request." },
      { status: 500 }
    );
  }
}
