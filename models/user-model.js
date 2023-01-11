const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    maxlength: [25, "name cannot be more than 25 characters"],
    minlength: [5, "username cannot be less than 5 characters"],
  },
  password: {
    type: String,
    required: [true, "must provide a password"],
    trim: true,
    minlength: [5, "password cannot be less than 5 characters"],
  },
  role: {
    type: String,
    required: [true, "must provide a role"],
    trim: true,
    maxlength: [5, "role should be either 'admin' or 'user'"],
    minlength: [4, "role should be either 'admin' or 'user'"],
    lowercase: true,
  },
});

const user = mongoose.model("users", UsersSchema);

module.exports = user;
