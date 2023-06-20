import mongoose from "mongoose";
import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import constants from "../constants/httpStatus.js";

export const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await UserModel.find();
    let newUsers = users.map((user) => {
      delete user._doc.password;
      return user;
    });
    res.status(constants.OK).json(newUsers);
  } catch (error) {
    res.status(constants.BAD_REQUEST).json({ message: error.message });
  }
});

//@desc create a new user
//@route POST /api/users/
//@access private and admin role
export const createUser = asyncHandler(async (req, res) => {
  // console.log("Tao");
  const { userType, userName, mail, password } = req.body;
  console.log({ userType, userName, mail, password });

  const existUserName = await UserModel.findOne({ userName });
  if (existUserName) {
    return res
      .status(constants.UNPROCESSABLE_ENTITY)
      .json("userName already exists");
    // throw new Error("userName already exists");
  }

  const existMail = UserModel.findOne({ mail });
  if (existMail) {
    return res
      .status(constants.UNPROCESSABLE_ENTITY)
      .json("Email already exists");
    // throw new Error("Email already exists");
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new UserModel({
    userType,
    avatar: "",
    userName,
    mail,
    password: hashedPassword,
    isVerified: true,
    point: 0,
  });

  try {
    const newUser = await user.save();
    console.log(constants.CREATE);
    res.status(constants.CREATE).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(constants.BAD_REQUEST).json({ message: error.message });
  }
});

//@desc get a user with id
//@route GET /api/users/:id
//@access private
export const getUser = asyncHandler(async (req, res) => {
  // let user;
  // try {
  //   user = await UserModel.findById(req.params.id);
  //   if (user == null) {
  //     return res
  //       .status(constants.NOT_FOUND)
  //       .json({ message: "User not found" });
  //   }
  //   delete user._doc.password;
  //   res.json(user);
  // } catch (error) {
  //   res.status(constants.SERVER_ERROR).json({ message: error.message });
  // }
});
//@desc update a user with id
//@route POST /api/users/:id
//@access private
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No user with id: ${id}`);
  }
  // if (!req.user?.checkMySelf) {
  //     return res.status(constants.OK).json({ message: 'not myself' });
  // }
  // return res.status(constants.OK).json({ message: 'myself' });
  let oldUser;

  try {
    oldUser = await UserModel.findById(req.params.id);
    if (oldUser == null) {
      return res
        .status(constants.NOT_FOUND)
        .json({ message: "User not found" });
    }
  } catch (error) {
    res.status(constants.SERVER_ERROR).json({ message: error.message });
  }

  const { userType, isVerified, userName, mail, point } = req.body;

  // if (userType && userType == "Admin" && req.user.userType !== "Admin") {
  //   res.status(constants.FORBIDDEN);
  //   throw new Error("Admin is not a user type!");
  // }

  const user = new UserModel({
    _id: id,
    avatar: oldUser && oldUser.avatar,
    userType: userType || oldUser.userType,
    firstName: oldUser && oldUser.firstName,
    lastName: oldUser && oldUser.lastName,
    isVerified,
    userName,
    mail: mail || oldUser.mail,
    password: oldUser && oldUser.password,
    _v: oldUser._v,
    point,
  });

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, user, {
      new: true,
    });
    // delete updateUser._doc.password;
    res.json(updatedUser);
  } catch (error) {
    console.log(error.message);
    res.status(constants.BAD_REQUEST).json({ message: error.message });
  }
});
//@desc delete a user with id
//@route DELETE /api/users/:id
//@access private and admin role
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id) || !UserModel.findById(id)) {
    res.status(constants.NOT_FOUND);
    throw new Error(`No user with id: ${id}`);
  }
  try {
    const deleteUser = await UserModel.findById(id);
    await UserModel.findByIdAndRemove(id);
    res.json(deleteUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
