const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const subNoteSchema = new Schema({
  title: {
    type: String,
    maxlength: 256,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const SubNote = model("SubNote", subNoteSchema);

module.exports = SubNote;
