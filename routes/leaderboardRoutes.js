import express from "express";
const router = express.Router();

import {
  createLeaderboard,
  deleteLeaderboard,
} from "../controllers/leaderboardController.js";

export default router;
