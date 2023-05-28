import Prompt from "@/models/Prompt";
import connectDb from "@/utils/connectDb";

export const GET = async (req, { params }) => {
  try {
    await connectDb();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found!", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts!", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    const { prompt, tag } = await req.json();

    await connectDb();

    const existingPrompt = await Prompt.findById(params.id);
    if (!prompt) return new Response("Prompt not found!", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(existingPrompt, { status: 200 });
  } catch (error) {
    return new Response("Failed to update the prompt!", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectDb();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted!", { status: 200 });
  } catch (error) {
    return new Response("Failed to update the prompt!", { status: 500 });
  }
};
