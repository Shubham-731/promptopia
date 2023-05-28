import Prompt from "@/models/Prompt";
import connectDb from "@/utils/connectDb";

export const GET = async (req) => {
  try {
    await connectDb();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts!", { status: 500 });
  }
};
