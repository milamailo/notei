const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
  },
  Mutation: {
    addUser: async (parent, { firstname, lastname, email, password }) => {
      const user = await User.create({ firstname, lastname, email, password });
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
