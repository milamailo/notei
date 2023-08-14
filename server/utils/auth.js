const jwt = require("jsonwebtoken");

const secret = "how know, who know";
const expiration = "1h";

module.exports = {
  authMiddleware: function ({ req }) {
    const token = req.headers.authorization || "";

    if (!token) {
      return {};
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return { user: data }; // Set the user data in the context
    } catch (error) {
      console.log("Invalid token", error.message);
      return {}; // Return an empty context if token is invalid
    }
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
