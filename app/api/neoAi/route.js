import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Initialize Groq SDK with API key
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Main POST function to handle the request
export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const input = body?.input; // Extract 'input' from request body

    // Validate the 'tag' field
    if (!input) {
      return NextResponse.json(
        { error: "Missing or invalid 'input' in request body." },
        { status: 400 }
      );
    }

    // Function to generate quiz based on the 'tag' and 'input'
    async function generateQuiz(input) {
      const systemPrompt = `You are an AI expert tasked with providing high-quality, easily understandable responses on Digital Education. Please limit your answer to 1-3 sentences.`;

      // Request Groq API to generate answers
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Generate answers for : ${input}` },
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

    // Generate the quiz answers
    const aiResponse = await generateQuiz(input);

    // Return the AI response as a JSON response
    return NextResponse.json({ answer: aiResponse });
  } catch (err) {
    // Handle errors during the process
    console.error("Error invoking Groq:", err);
    return NextResponse.json(
      { error: "Failed to fetch the response from Groq." },
      { status: 500 }
    );
  }
}
