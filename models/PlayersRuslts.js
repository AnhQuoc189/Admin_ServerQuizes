import mongoose from "mongoose";

const playerResultSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },
  score: {
    type: Number,
    default: 0,
  },
  answers: [
    {
      questionIndex: { type: Number },
      answered: {
        type: Boolean,
        default: false,
      },
      answers: [
        String,
        // {
        //   name: { type: String },
        //   body: { type: String },
        // },
      ],
      // correctAnswers: [
      //   {
      //     name: { type: String },
      //     body: { type: String },
      //   },
      // ],
      time: { type: Number },
      points: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const PlayerResultModel = mongoose.model("PlayerResult", playerResultSchema);
export default PlayerResultModel;
