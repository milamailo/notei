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
        // Call the userByEmailOrUserName query to check if the user exists
        const userInfo = await resolvers.Query.userByEmailOrUserName(null, {
          username,
          email,
        });

        if (!userInfo) {
          throw new Error("User not found.");
        }

        // Update user properties
        if (firstname) {
          userInfo.firstname = firstname;
        }
        if (lastname) {
          userInfo.lastname = lastname;
        }
        if (username) {
          userInfo.username = username;
        }
        if (email) {
          userInfo.email = email;
        }
        if (password) {
          userInfo.password = password;
        }

        // Save the updated user
        const user = await userInfo.save();

        return user;
      } catch (error) {
        throw new Error(`Failed to update -> ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
