const { Configuration, OpenAIApi } = require("openai");
// apiKey MUST move to the .env file before repo being available to public
const config = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(config);

const textAnalize = async (_, { transcript }) => {
  const prompt = { transcript };
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 512,
      temperature: 0,
      prompt: prompt,
    });
    return completion;
  } catch (error) {
    throw new Error(`Failed to fatch notes -> ${error.message}`);
  }
};

module.exports = { textAnalize };
