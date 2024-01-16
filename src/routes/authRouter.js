const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const {validateUser} = require("../middlewares/validation");

authRouter.post("/signup",validateUser, authController.signUp);
authRouter.post("/login", authController.login);

module.exports = authRouter;