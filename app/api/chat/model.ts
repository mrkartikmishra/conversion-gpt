import { ChatOpenAI } from "@langchain/openai";

export const llmModel = new ChatOpenAI({
  model: "gpt-5-mini",
  apiKey: process.env.OPENAI_API_KEY,
});
