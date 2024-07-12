const express = require("express");
const adminRouter = express.Router();
const adminController = require("./../controllers/adminController");
const userController = require("./../controllers/userController");

adminRouter.post(
  "/upload",
  userController.checkIfAdmin,
  userController.checkIfValidToken,
  adminController.upload.array("images", 3),
  adminController.ImageUpload
);

adminRouter.post(
  "/addProduct",
  userController.checkIfAdmin,
  userController.checkIfValidToken,
  adminController.addProduct
);

adminRouter.delete(
  "/deleteProduct/:id",
  userController.checkIfAdmin,
  userController.checkIfValidToken,
  adminController.deleteProduct
);

adminRouter.patch(
  "/confirmOrder/:userId/:prodId",
  userController.checkIfAdmin,
  userController.checkIfValidToken,
  adminController.confirmOrder
);

module.exports = adminRouter;
