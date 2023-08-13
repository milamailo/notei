const { Note, User } = require("../../../models");
const { AuthenticationError } = require("apollo-server-express");

const addNote = async (_, { title, text, summery, audioFile }, context) => {
  try {
    if (context.user) {
      const note = await Note.create({
        title,
        text,
        summery,
        audioFile,
      });

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { notes: note._id } }
      );
      return note;
    }
    throw new AuthenticationError("You need to be logged in!");
  } catch (error) {
    throw new Error(`Failed to create note ->  ${error.message}`);
  }
};

module.exports = { addNote };
