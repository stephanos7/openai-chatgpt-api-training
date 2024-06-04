import { openai } from "./openai.js";
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const formatUserMessage = (userInput) => {
  console.log("formatting...and input is : ", userInput);
  return { role: "user", content: userInput };
};

const handleNewMessage = async (history, message) => {
  try {
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [...history, message],
    });
    return res.choices[0];
  } catch (error) {
    console.error("Error:", error);
    // Handle the error here
  }
};

const chat = () => {
  console.log(": in chat mode");
  const originStory = { role: "system", content: "You are a helpful chatbot." };
  const history = [originStory];

  const start = () => {
    console.log("history: ", history);

    return rl.question("YOU: ", async (userInput) => {
      if (userInput.toLowerCase() === "exit") {
        console.log("Goodbye!");
        rl.close();
        return;
      }
      const formattedUserMessage = formatUserMessage(userInput);
      console.log("final formatted message: ", formattedUserMessage);
      const openAIres = await handleNewMessage(history, formattedUserMessage);

      history.push(formattedUserMessage, openAIres.message);
      console.log(`\n\nBOT: `, openAIres);
      start();
    });
  };
  start();
};
console.log("chatbot initialised. Type 'exit' to quit.");
chat();
