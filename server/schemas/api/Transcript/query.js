const { Note } = require("../../../models");
const { Configuration, OpenAIApi } = require("openai");
// apiKey MUST move to the .env file before repo being available to public
const config = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(config);

const textAnalize = async (_, { transcript }) => {
  // const ts = `tell me a joke`; //summerize the text: ${transcript}
  const prompt = `${transcript}. (determine a title and summarize the text then return in JSON format)`;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 50,
      temperature: 0.7,
      prompt: prompt,
    });
    const res = completion.data.choices[0].text
      .split("\n")
      .filter((cell) => cell !== "" && cell.length >= 1);

    const title = res[0]
      .split(" ")
      .filter((cell, index) => index != 0)
      .join(" ");
    const summery = res[1]
      .split(" ")
      .filter((cell, index) => index != 0)
      .join(" ");
    const text = transcript;
    const note = await Note.create({ title, summery, text });
    console.log(note);
    return note;
  } catch (error) {
    throw new Error(`No response from ai server -> ${error.message}`);
  }
};

module.exports = { textAnalize };
