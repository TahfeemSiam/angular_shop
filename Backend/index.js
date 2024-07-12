const express = require("express");
const server = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routers/adminRoutes");
const userRouter = require("./routers/userRoutes");
const productRouter = require("./routers/productRoutes");
const orderRouter = require("./routers/orderRoutes");

server.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
server.use(cookieParser());
server.use(express.json());

server.use((req, res, next) => {
  console.log(req.headers);
  console.log(req.cookies);
  next();
});

server.use("/", adminRouter);
server.use("/api/user", userRouter);
server.use("/api/product", productRouter);
server.use("/api/order", orderRouter);

server.listen(4000, function () {
  console.log("Listening On Port 4000");
});
