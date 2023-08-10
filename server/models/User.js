const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstname: {
    type: String,
    require: true,
    trim: true,
  },
  lastname: {
    type: String,
    require: false,
    trim: true,
  },
  userName: {
    type: String,
    required: false,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uniqueCaseInsensitive: true,
    validate: {
      validator: function (email) {
        // Email validation using a regular expression
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: "Invalid email format example@info.com",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
  //   notes: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "Note",
  //     },
  //   ],
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

// Combining pre-hooks into a single "save" middleware
userSchema.pre("save", async function (next) {
  if (!this.username) {
    this.username = this.email;
  }

  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
