const { User } = require("../../../models");

const allUsers = async () => {
  try {
    const users = User.find().populate("notes");

    return users;
  } catch (error) {
    throw new Error(`Failed to fetch users ->  error.message`);
  }
};

const getUser = async ({ username, email }) => {
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

module.exports = { allUsers, getUser };
