const messageModel = require("../models/messageModel");

async function getMessages(_req, res, next) {
  try {
    const messages = await messageModel.getAllMessages();

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
}

async function createMessage(req, res, next) {
  try {
    const messageId = await messageModel.createMessage(req.body);

    res.status(201).json({
      success: true,
      message: "Your message has been saved successfully.",
      data: { id: messageId },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMessages,
  createMessage,
};
