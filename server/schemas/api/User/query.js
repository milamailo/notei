const { User } = require("../../../models");
const { AuthenticationError } = require("apollo-server-express");

const allUsers = async () => {
  try {
    const users = User.find().populate("notes");

    return users;
  } catch (error) {
    throw new Error(`Failed to fetch users ->  error.message`);
  }
};

const getUser = async (parent, { username, email }) => {
  try {
    const user = await User.findOne({
      $or: [{ username }, { email }],
    }).populate("notes");

    return user;
  } catch (error) {
    throw new Error(
      `Failed to fetch : ${username && email} ->  ${error.message}`
    );
  }
};

const authUser = async (_, args, context) => {
  try {
    if (context.user) {
      const user = await User.findOne({ _id: context.user._id }).populate(
        "notes"
      );
      console.log(user);

      return user;
    }
    throw new AuthenticationError("You need to be logged in!");
  } catch (error) {
    throw new Error(`Failed to fetch: ${error.message}`);
  }
};

module.exports = { allUsers, getUser, authUser };
