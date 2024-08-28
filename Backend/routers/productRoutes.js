const express = require("express");
const productRouter = express.Router();
const productController = require("./../controllers/productController");

productRouter.get("/getProducts", productController.getProducts);
productRouter.get("/featuredProducts", productController.getFeaturedProducts);
productRouter.get("/:id", productController.getProductById);
productRouter.get("/review/:id", productController.getProductReviewsById);

module.exports = productRouter;
