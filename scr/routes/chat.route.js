const ChatRouter = require("express").Router();
const { verifyToken } = require("../middleware/jwt");
const { createChat, getChat } = require("../controller/chat.controller");
const validation = require("../middleware/validation");
const {
  createChatValidation,
  getChatValidation,
} = require("../validations/chat.validations");

ChatRouter.post("/", validation(createChatValidation), verifyToken, createChat);
ChatRouter.get(
  "/:senderId/:recieverId",
  validation(getChatValidation),
  verifyToken,
  getChat
);
module.exports = ChatRouter;
