const express = require("express");
const orderRouter = express.Router();
const userController = require("./../controllers/userController");
const orderController = require("./../controllers/ordersController");

orderRouter.route("/").get(orderController.getAllOrders);
orderRouter
  .route("/placeOrder")
  .post(userController.checkIfValidToken, orderController.placeOrder);

orderRouter.route("/user/:userId").get(orderController.getOrdersByUserId);

module.exports = orderRouter;
