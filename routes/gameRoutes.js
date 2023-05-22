import express from "express";

const router = express.Router();

// import {
//   createQuiz,
//   getQuizes,
//   updateQuiz,
//   deleteQuiz,
// } from "../controllers/quizControllers.js";

import {
  createGame,
  getGames,
  deleteGame,
  updateGame,
} from "../controllers/gameController.js";

router.get("/", getGames);
router.post("/", createGame);
router.patch("/:id", updateGame);
router.delete("/:id", deleteGame);

export default router;
