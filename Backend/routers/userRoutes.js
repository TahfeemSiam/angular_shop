const express = require("express");
const userController = require("./../controllers/userController");

const userRouter = express.Router();

userRouter.route("/createUser").post(userController.createUser);
userRouter.route("/userUpdate/:id").patch(userController.updateUserInfo);
userRouter.route("/userLogin").post(userController.userLogin);
userRouter.route("/userLogout").get(userController.userLogout);
userRouter
  .route("/addReview/:id")
  .post(userController.checkIfValidToken, userController.addReview);

module.exports = userRouter;
