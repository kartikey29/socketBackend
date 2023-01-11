const mongoose = require("mongoose");

const connection = async () => {
  try {
    mongoose.connect(process.env.mongoDBURL, () => {
      console.log("Database connect successfully");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connection;
