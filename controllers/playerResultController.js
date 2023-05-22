import mongoose from "mongoose";
import PlayerResultModel from "../models/PlayersRuslts.js";
import QuizModel from "../models/Quiz.js";
import GameModel from "../models/Game.js";

export const createPlayerResult = async (req, res) => {
  const { playerId, gameId, score, answers } = req.body;
  const playerResult = new PlayerResultModel({
    playerId,
    gameId,
    score,
    answers,
  });

  const playerExist = await PlayerResultModel.findOne({ playerId });
  const gameIdExist = await PlayerResultModel.findOne({ gameId });

  try {
    if (!(playerExist && gameIdExist)) {
      const newPlayerResult = await playerResult.save();
      res.status(201).json(newPlayerResult);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPlayerResults = async (req, res) => {
  try {
    const playerResults = await PlayerResultModel.find();
    res.status(200).send(playerResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePlayerResults = async (req, res) => {
  try {
    const playerResults = await PlayerResultModel.find();
    res.status(200).send(playerResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePlayerResults = async (req, res) => {
  try {
    const playerResults = await PlayerResultModel.find();
    res.status(200).send(playerResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
