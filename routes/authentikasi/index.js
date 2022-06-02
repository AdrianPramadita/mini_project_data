const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/verifyToken");

const login = require("./login");

//USER MENU

router.post("/login", login);

module.exports = router;
