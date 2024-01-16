const express = require("express");
const router = express.Router();
const authRouter = require("./authRouter");
const chessRouter = require("./chessOpeningsRouter");


router.use("/auth", authRouter);
router.use("/openings", chessRouter);

module.exports = router;