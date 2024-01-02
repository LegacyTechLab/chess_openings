const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const {validateUser} = require("../middlewares/validation");

authRouter.post("/api/signup",validateUser, authController.signUp);
authRouter.post("/api/login", authController.login);

module.exports = authRouter;