const { User } = require("../../../models");
const { signToken } = require("../../../utils/auth");
const { getUser } = require("./query");

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

const updateUser = async (
  _,
  { firstname, lastname, username, email, password, note }
) => {
  try {
    const userInfo = await getUser(null, {
      username,
      email,
    });

    if (!userInfo) {
      throw new Error("User not found.");
    }

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

    const user = await userInfo.save();
    return user;
  } catch (error) {
    throw new Error(`Failed to update -> ${error.message}`);
  }
};

module.exports = { addUser, updateUser };
