const express = require("express");
const router = express.Router();
const { loginController } = require("../controller/index");

router.post("/login", loginController);

module.exports = router;
