const express = require("express");

const messageController = require("../controllers/messageController");
const { requireAdminKey, validateMessage } = require("../middleware/validate");

const router = express.Router();

router.post("/", validateMessage, messageController.createMessage);
router.get("/", requireAdminKey, messageController.getMessages);

module.exports = router;
