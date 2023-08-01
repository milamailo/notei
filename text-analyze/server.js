const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAi } = require("openai");

// apiKey MUST move to the .env file before repo being available to public
const config = new Configuration({
  apiKey: "",
});

const openai = new OpenAi(config);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/text-analyze", async (req, res) => {
  const { prompt } = req.body;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 512,
    temperature: 0,
    prompt: prompt,
  });
  res.send(completion.data.choices[0].text);
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
