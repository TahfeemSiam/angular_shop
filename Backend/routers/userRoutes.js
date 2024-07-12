const express = require("express");
const userController = require("./../controllers/userController");

const userRouter = express.Router();

userRouter.route("/createUser").post(userController.createUser);
userRouter.route("/userLogin").post(userController.userLogin);
userRouter.route("/userLogout").get(userController.userLogout);

module.exports = userRouter;
