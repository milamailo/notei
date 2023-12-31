const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const noteSchema = new Schema({
  title: {
    type: String,
    maxlength: 256,
    trim: true,
  },
  text: {
    type: String,
    trim: true,
  },
  summery: {
    type: String,
    trim: true,
  },
  audioFile: {
    type: String,
  },
  subNotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubNote",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Note = model("Note", noteSchema);

module.exports = Note;
