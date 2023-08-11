const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = User.find(); //.populate("notes");
        return users;
      } catch (error) {
        throw new Error(`Failed to fetch users ->  error.message`);
      }
    },
    // userByEmailOrUserName: async (parent, { usernameOrEmail }) => {
    //   try {
    //     let user;
    //     if (usernameOrEmail.includes("@")) {
    //       const email = usernameOrEmail;
    //       user = User.findOne({ email }); //.populate("notes");
    //     } else {
    //       const username = usernameOrEmail;
    //       user = User.findOne({ username }); //.populate("notes");
    //     }
    //     return user;
    //   } catch (error) {
    //     throw new Error(
    //       `Failed to fetch : ${usernameOrEmail} ->  ${error.message}`
    //     );
    //   }
    // },
    userByEmailOrUserName: async (parent, { username, email }) => {
      try {
        const user = await User.findOne({
          $or: [{ username }, { email }],
        });
        return user;
      } catch (error) {
        throw new Error(
          `Failed to fetch : ${username && email} ->  ${error.message}`
        );
      }
    },
  },
  Mutation: {
    addUser: async (parent, { firstname, lastname, email, password }) => {
      try {
        const user = await User.create({
          firstname,
          lastname,
          email,
          password,
        });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error(`Failed to create ->  ${error.message}`);
      }
    },
    updateUser: async (
      parent,
      { firstname, lastname, username, email, password }
    ) => {
      try {
        const user = await User.updateOne();
      } catch (error) {
        throw new Error(`Failed to update ->  ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
