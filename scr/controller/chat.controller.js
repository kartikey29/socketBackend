const Chat = require("../model/chat.model");

const createChat = async (req, res) => {
  try {
    const newChat = new Chat(req.body);
    await newChat.save();
    return res.send({ message: "chat inserted", chat: newChat });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

const getChat = async (req, res) => {
  try {
    const { senderId, recieverId } = req.params;
    const data = await Chat.find({
      $or: [
        { senderId: senderId, recieverId: recieverId },
        { senderId: recieverId, recieverId: senderId },
      ],
    }).sort({ createdAt: 1 });
    return res.send({ message: "data fetched", data });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

module.exports = { createChat, getChat };
