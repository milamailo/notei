const { User, Note, SubNote } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const { userQuery, userMutation } = require("./Query/User/");

const resolvers = {
  Query: {
    users: userQuery.allUsers,
    userByEmailOrUserName: userQuery.getUser,
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
      { firstname, lastname, username, email, password, note }
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
        if (note) {
          userInfo.notes.push(note);
        }

        // Save the updated user
        const user = await userInfo.save();
        return user;
      } catch (error) {
        throw new Error(`Failed to update -> ${error.message}`);
      }
    },
    login: async (parent, { username, email, password }) => {
      try {
        // Call the userByEmailOrUserName query to check if the user exists
        const user = await resolvers.Query.userByEmailOrUserName(null, {
          username,
          email,
        });
        if (!user) {
          throw new AuthenticationError(
            `User NOT found with username/email: ${username && email} ->  ${
              error.message
            }`
          );
        }
        // Vrifying thr password
        chkPassword = await user.isCorrectPassword(password);
        if (!chkPassword) {
          throw new AuthenticationError(`Incorrect Credential!`);
        }

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        throw new Error(
          `Failed to login : ${username && email} ->  ${error.message}`
        );
      }
    },
  },
};

module.exports = resolvers;
