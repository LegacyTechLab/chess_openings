const express = require("express");
const chessOpeningRouter = express.Router();
const chessOpeningController = require("../controllers/chessOpeningsController");
const {requireToken} = require("../middlewares/auth");
const {validateOpenings} = require("../middlewares/validation");

chessOpeningRouter.get("/api/openings", requireToken, chessOpeningController.getOpenings);
chessOpeningRouter.get("/api/opening/:id", requireToken, chessOpeningController.getOpening);
chessOpeningRouter.post("/api/opening", requireToken, validateOpenings, chessOpeningController.createOpening);
chessOpeningRouter.put("/api/opening/:id", requireToken, chessOpeningController.updateOpening);
chessOpeningRouter.delete("/api/opening/:id", requireToken, chessOpeningController.deleteOpening );


module.exports = chessOpeningRouter;