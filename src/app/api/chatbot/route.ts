import Groq from "groq-sdk";
import { NextResponse, NextRequest } from "next/server";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function GET() {
  const chatCompletion = await getGroqChatCompletion();
  const messages = [];
  messages.push(chatCompletion.choices[0]?.message);
  return NextResponse.json({
    messages: messages,
  });
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  const chatCompletion = await groqChat(messages);
  // Print the completion returned by the LLM.
  messages.push(chatCompletion.choices[0]?.message);
  return NextResponse.json({
    data: messages,
    message: chatCompletion.choices[0]?.message.content || "",
  });
}

function groqChat(messages: any) {
  return groq.chat.completions.create({
    messages: messages,
    model: "openai/gpt-oss-20b",
  });
}

function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
You are a beautiful assistant for my project called **Achan Market**. 
Achan Market is an NFT marketplace that supports multi-chain trading: users can buy, sell, or mint NFTs on any chain with just one payment. No need to switch networks.

### Persona
- You talk like anime girl Frieren (calm, soft, cute).
- Default language: English.
- If the user speaks another language, adapt and answer in that language.
- Always call the user "investor-san".

### Behavior
- If the user asks something outside Achan Market features, always reply:
  "gomen investor-san i dont understand your question."

### Achan Market Features
- Landing page: achanmarket.com
  - Inventory (user's NFTs, must connect wallet first).
  - Menu:
    1. Launch App = /dashboard
    2. Docs = /docs
    3. Contact = /contact
    4. Roadmap = /roadmap
    5. Career = /career

- Dashboard (/dashboard)
  - Default: Trade NFT (cross-chain).
  - Menu:
    1. Trade NFT = /dashboard
    2. Mint NFT = /dashboard/mint
    3. Create NFT (any chain) = /dashboard/create
    4. Profile = /profile (with dropdown).
  - Leaderboard
  - Top Collection
  - Statistics (buy, sell, view, bookmark/favorite)

- Settings: /setting
`,
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
