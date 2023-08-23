// const { addNote } = require("../Note/query");
const { Configuration, OpenAIApi } = require("openai");
// apiKey MUST move to the .env file before repo being available to public
const config = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(config);

const textAnalize = async (_, { transcript }) => {
  // const ts = `tell me a joke`; //summerize the text: ${transcript}
  const prompt = `${transcript}. (determine a title and summarize the text in {title: "title" , summery: "summery"})`;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 50,
      temperature: 0.7,
      prompt: prompt,
    });
    const res = completion.data.choices[0].text;

    console.log(res);
    return res;
  } catch (error) {
    throw new Error(`No response from ai server -> ${error.message}`);
  }
};

module.exports = { textAnalize };
