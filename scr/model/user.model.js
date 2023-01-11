const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.passwordMatch = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
