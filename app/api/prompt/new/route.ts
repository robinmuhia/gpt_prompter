import { connectToDB } from "utils/database";
import Prompt from "models/prompt";

export const POST = async (req: Request) => {
  const { userId, prompt } = await req.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt });
    await newPrompt.save({ timestamps: true });
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
