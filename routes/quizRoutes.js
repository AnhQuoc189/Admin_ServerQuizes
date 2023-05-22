import express from "express";

const router = express.Router();

import {
  createQuiz,
  getQuizes,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quizControllers.js";

router.get("/", getQuizes);
router.post("/", createQuiz);
router.patch("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);

export default router;
