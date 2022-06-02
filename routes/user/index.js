const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/verifyToken");

const register = require("./register");

//USER MENU

router.post("/register", register);

module.exports = router;
