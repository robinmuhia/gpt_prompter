import { generateResponse } from "./pinecone/main";

export const POST = async (req: Request) => {
  const { question } = await req.json();
  try {
    const response = await generateResponse(question);
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response("Failed to generate chat", { status: 500 });
  }
};
