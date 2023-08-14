const { Note } = require("../../../models");
const { getUser } = require("../User/query");

const allNotes = async (_, { username, email }) => {
  const params = { username, email };
  try {
    const userInfo = await getUser(null, {
      username,
      email,
    });
    if (!userInfo) {
      throw new Error("User not found.");
    }

    return userInfo.notes;
  } catch (error) {
    throw new Error(`Failed to fatch notes -> ${error.message}`);
  }
};
const getNote = async (_, { noteId }) => {
  try {
    const note = await Note.findOne({ _id: noteId });

    return note;
  } catch (error) {
    throw new Error(`Failed to fatch note -> ${error.message}`);
  }
};

module.exports = { allNotes, getNote };
