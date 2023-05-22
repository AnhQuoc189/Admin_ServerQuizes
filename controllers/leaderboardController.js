import mongoose from "mongoose";
import LeaderboardModel from "../models/Leaderboard.js";
import QuizModel from "../models/Quiz.js";
import GameModel from "../models/Game.js";

export const createLeaderboard = async (req, res) => {
  const { gameId, playerResultList, pin } = req.body;

  let game = await GameModel.findById(gameId);
  let quiz = await QuizModel.findById(game.quizId);

  const leaderboard = new LeaderboardModel({
    gameId,
    playerResultList,
    pin,
  });

  quiz.questionList.forEach((question) => {
    leaderboard.questionLeaderboard.push({
      questionIndex: question.questionIndex,
      questionResultList: [],
    });
    leaderboard.currentLeaderboard.push({
      questionIndex: question.questionIndex,
      leaderboardList: [],
    });
  });

  try {
    const newLeaderboard = await leaderboard.save();
    res.status(201).json(newLeaderboard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteLeaderboard = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No leaderboard with id: ${id}`);
  }

  try {
    await LeaderboardModel.findByIdAndRemove(id);
    res.json({ message: "Leaderboard deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLeaderboard = async (req, res) => {
  let leaderboard;
  try {
    leaderboard = await LeaderboardModel.findById(req.params.id);
    if (leaderboard == null) {
      return res.status(404).json({ message: "Leaderboard not found" });
    }
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addPlayerResult = async (req, res) => {
  const { leaderboardId } = req.params;
  const { playerResultId } = req.body;
  let leaderboard;

  try {
    leaderboard = await LeaderboardModel.findById(leaderboardId);
    leaderboard.playerResultList.push(playerResultId);
    const newLeaderboard = await leaderboard.save();
    res.status(201).json(newLeaderboard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateQuestionLeaderboard = async (req, res) => {
  const { leaderboardId } = req.params;
  const { questionIndex, playerId, playerPoints } = req.body;
  let leaderboard;

  try {
    leaderboard = await LeaderboardModel.findById(leaderboardId);
    leaderboard.questionLeaderboard[questionIndex - 1].questionResultList.push({
      playerId,
      playerPoints,
    });

    const newLeaderboard = await leaderboard.save();
    res.status(201).json(newLeaderboard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCurrentLeaderboard = async (req, res) => {
  const { leaderboardId } = req.params;
  const { questionIndex, playerId, playerCurrentScore } = req.body;
  let leaderboard;
  try {
    leaderboard = await LeaderboardModel.findById(leaderboardId);
    leaderboard.currentLeaderboard[questionIndex - 1].leaderboardList.push({
      playerId,
      playerCurrentScore,
    });

    const newLeaderboard = await leaderboard.save();
    res.status(201).json(newLeaderboard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
