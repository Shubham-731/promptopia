import connectDb from "@/utils/connectDb";
import Prompt from "@/models/Prompt";

export const POST = async (req) => {
  try {
    // Get payload
    const { userId, prompt, tag } = await req.json();

    // Connect to db
    await connectDb();

    // Create new prompt
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new prompt!", { status: 500 });
  }
};
