const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");
const dateFormat = require("../utils/dateFormat");

const UserSchema = new Schema({
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
  username: {
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

UserSchema.pre("save", async function (next) {
  // Pre-save hook to fill the username field from the email
  if (!this.username) {
    this.username = this.email.split("@")[0].toLowerCase();
  }
  this.email = this.email.toLowerCase();
  this.firstname = this.firstname.toLowerCase();
  if (this.lastname) {
    this.lastname = this.lastname.toLowerCase();
  } else {
    this.lastname = "";
  }

  // set up pre-save middleware to create password
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Apply unique validator plugin
UserSchema.plugin(uniqueValidator);

// // compare the incoming password with the hashed password
UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// User model
const User = model("User", UserSchema);

module.exports = User;
