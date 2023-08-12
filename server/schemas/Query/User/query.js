const { User } = require("../../../models");

const allUsers = async () => {
  try {
    const users = User.find().populate("notes");

    return users;
  } catch (error) {
    throw new Error(`Failed to fetch users ->  error.message`);
  }
};

module.exports = { allUsers };
