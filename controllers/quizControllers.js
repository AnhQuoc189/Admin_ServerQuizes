import QuizModel from "../models/Quiz.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import constants from "../constants/httpStatus.js";

export const createQuiz = asyncHandler(async (req, res) => {
  // console.log(req.user.id);
  const {
    name,
    backgroundImage,
    description,
    creatorName,
    pointsPerQuestion,
    isPublic,
    tags,
    likesCount,
    questionList,
  } = req.body;
  console.log({
    name,
    backgroundImage,
    description,
    creatorName,
    pointsPerQuestion,
    isPublic,
    tags,
    likesCount,
    questionList,
  });
  const quiz = new QuizModel({
    name,
    backgroundImage,
    description,
    creatorId: req.user.id,
    creatorName,
    pointsPerQuestion,
    numberOfQuestions: questionList.length,
    isPublic,
    tags,
    likesCount,
    questionList,
    dateCreated: new Date().toISOString(),
  });
  console.log(quiz);
  try {
    const newQuiz = await quiz.save();
    console.log("TAHANHCONGROI");
    res.status(201).json(newQuiz);
  } catch (error) {
    console.log("loi");
    res.status(400).json({ message: error.message });
  }
});

export const getQuizes = asyncHandler(async (req, res) => {
  try {
    const quizes = await Quiz.find();
    res.status(constants.OK).json(quizes);
  } catch (error) {
    res.status(constants.SERVER_ERROR);
    throw new Error(error);
  }
});

export const deleteQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No quiz with id: ${id}`);
  }

  try {
    await Quiz.findByIdAndRemove(id);
    res.json({ message: "Quiz deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const updateQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No quiz with id: ${id}`);
  }

  const {
    name,
    backgroundImage,
    description,
    pointsPerQuestion,
    isPublic,
    tags,
    questionList,
  } = req.body;
  const quiz = new Quiz({
    _id: id,
    name,
    backgroundImage,
    description,
    pointsPerQuestion,
    numberOfQuestions: questionList.length,
    isPublic,
    tags,
    questionList,
    dateCreated: new Date().toISOString(),
  });

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, quiz, {
      new: true,
    });
    res.json(updatedQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
