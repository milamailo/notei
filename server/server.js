const express = require("express");
const { ApollpServer } = require("apollo-server-express");
const path = require("path");
const { resolvers, typeDefs } = require("./schemas");
const db = require("./config/connection");
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApollpServer({
  resolvers,
  typeDefs,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

