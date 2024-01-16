const express = require("express");
const chessOpeningRouter = express.Router();
const chessOpeningController = require("../../controllers/chessOpeningsController");
const {requireToken} = require("../middlewares/auth");
const {validateOpenings} = require("../middlewares/validation");

chessOpeningRouter.get("/", requireToken, chessOpeningController.getOpenings);
chessOpeningRouter.get("/:id", requireToken, chessOpeningController.getOpening);
chessOpeningRouter.post("/", requireToken, validateOpenings, chessOpeningController.createOpening);
chessOpeningRouter.put("/:id", requireToken, chessOpeningController.updateOpening);
chessOpeningRouter.delete("/:id", requireToken, chessOpeningController.deleteOpening );


module.exports = chessOpeningRouter;