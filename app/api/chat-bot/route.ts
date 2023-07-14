import { generateResponse } from "./pinecone/main";

export const POST = async (req: Request, { params }: any) => {
  try {
    const response = generateResponse(params.question);
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response("Failed to generate chat", { status: 500 });
  }
};
