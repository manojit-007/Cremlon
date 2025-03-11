const express = require("express");
const SendMessage = require("../Controllers/SendMessageController");
const SendMessageRoute = express.Router();


SendMessageRoute.post("/mail", SendMessage);

module.exports = SendMessageRoute;
