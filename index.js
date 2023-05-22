import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

import errorHandler from "./middleware/errorHandler.js";

import userRoutes from "./routes/userRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import playerResultRoutes from "./routes/playerResultRoutes.js";

// data imports
// import User from "./models/User.js";
// import Product from "./models/Product.js";
// import ProductStat from "./models/ProductStat.js";
// import Transaction from "./models/Transaction.js";
// import OverallStat from "./models/OverallStat.js";
// import AffiliateStat from "./models/AffiliateStat.js";
// import {
//   dataUser,
//   dataProduct,
//   dataProductStat,
//   dataTransaction,
//   dataOverallStat,
//   dataAffiliateStat,
// } from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(errorHandler);

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// app.use('/api/auth', require('./routes/authRoutes'));
app.use("/api/users", userRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/playerResults", playerResultRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));
