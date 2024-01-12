const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please provide a user name, it's mandatory!"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email address, it's mandatory!"],
    unique: [true, "Email already taken"],
  },
  password: {
    type: String,
    required: [true, "Please add the user password, it's mandatory"],
  },
});

module.exports = mongoose.model("User", userSchema);
