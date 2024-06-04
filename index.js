import "dotenv/config";

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_TRAINING_KEY });

const res = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "You are a helpfu AI assistant.",
    },
    {
      role: "user",
      content: "Hi?",
    },
  ],
});

console.log("RES ", res.choices[0].message);
