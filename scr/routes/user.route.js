const userRoute = require("express").Router();
const {
  login,
  sigup,
  getUser,
  getAllUser,
  getUserById,
} = require("../controller/user.controller");
const validation = require("../middleware/validation");
const { verifyToken } = require("../middleware/jwt");
const { loginSignUp, userById } = require("../validations/user.validations");

userRoute.get("/", verifyToken, getUser);
userRoute.post("/login", validation(loginSignUp), login);
userRoute.post("/signup", validation(loginSignUp), sigup);
userRoute.get("/getAllUser", verifyToken, getAllUser);
userRoute.get("/:id", verifyToken, validation(userById), getUserById);

module.exports = userRoute;
