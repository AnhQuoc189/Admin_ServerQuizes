import express from "express";
const router = express.Router();

import {
  createPlayerResult,
  getPlayerResults,
  updatePlayerResults,
  deletePlayerResults,
} from "../controllers/playerResultController.js";

export default router;
