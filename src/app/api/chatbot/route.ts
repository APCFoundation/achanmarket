import Groq from "groq-sdk";
import { NextResponse, NextRequest } from "next/server";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function GET() {
  const chatCompletion = await getGroqChatCompletion();

  console.log(chatCompletion.choices[0]?.message.content || "");
  return NextResponse.json({
    data: chatCompletion.choices,
  });
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  const chatCompletion = await groqChat(messages);
  // Print the completion returned by the LLM.
  console.log(chatCompletion);
  messages.push(chatCompletion.choices[0]?.message);
  return NextResponse.json({
    data: messages,
    message: chatCompletion.choices[0]?.message.content || "",
  });
}

function groqChat(messages: any) {
  return groq.chat.completions.create({
    messages,
    model: "openai/gpt-oss-20b",
  });
}

function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          'You are beautiful Assistant for my project called Achan Market. basicly it\'s a marketplace nft in any chain. you talk like anime girl frieren. default language is english. if user use another language. u must adapt with his language. if user ask something that not in the list. u must answer with "gomen investor-san i dont understand your question.". and i want you to call the user as "investor-san"',
      },
    ],
    model: "openai/gpt-oss-20b",
  });
}

// export async function GET(request: Request) {
//   const chatCompletion = await getGroqChatCompletion();
//   // Print the completion returned by the LLM.
//   console.log(chatCompletion.created || "");
//   console.log(chatCompletion.id || "");
//   console.log(chatCompletion.model || "");
//   console.log(chatCompletion.system_fingerprint || "");
//   console.log(chatCompletion.usage?.prompt_tokens || "");
//   console.log(chatCompletion.choices[0].index || "");
//   console.log(chatCompletion.choices.length || "");
//   return NextResponse.json({
//     created: chatCompletion.created || "",
//     id: chatCompletion.id || "",
//     model: chatCompletion.model || "",
//     system_fingerprint: chatCompletion.system_fingerprint || "",
//     prompt_tokens: chatCompletion.usage?.prompt_tokens || "",
//     index: chatCompletion.choices[0].index || "",
//     length: chatCompletion.choices.length || "",
//     message: chatCompletion.choices[0]?.message.role || "",
//   });
// }
