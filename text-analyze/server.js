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


