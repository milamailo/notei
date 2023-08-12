const { User } = require("../../../models");
const { signToken } = require("../../../utils/auth");

const addUser = async (_, { firstname, lastname, email, password }) => {
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
    throw new Error(`Failed to create -> ${error.message}`);
  }
};

module.exports = { addUser };
