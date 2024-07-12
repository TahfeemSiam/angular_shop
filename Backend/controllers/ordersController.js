const connection = require("./../mysql");
const Order = require("./../models/order");

exports.getAllOrders = (req, res) => {
  const query = "SELECT * FROM orders";
  connection.query(query, (error, result) => {
    res.status(200).json({
      message: "Fetched All Orders Sucessfully",
      data: result,
    });
  });
};

exports.placeOrder = (req, res) => {
  let order = new Order(
    req.body.user_id,
    req.body.product_id,
    req.body.product_name,
    req.body.price,
    req.body.image,
    req.body.quantity
  );

  let query =
    "INSERT INTO orders(user_id, product_id, product_name, price, image, quantity, status) VALUES(?, ?, ?, ?, ?, ?, ?) ";

  connection.query(
    query,
    [
      req.body.user_id,
      req.body.product_id,
      req.body.product_name,
      req.body.price,
      req.body.image,
      req.body.quantity,
      req.body.status,
    ],
    (error, result) => {
      res.status(200).json({
        message: "Order Created",
        data: result,
      });
    }
  );
};

exports.getOrdersByUserId = (req, res) => {
  const query = "SELECT * FROM orders WHERE user_id = ?";
  connection.query(query, [req.params.userId], (error, result) => {
    res.status(200).json({
      message: "Pending Orders For A User Fetched",
      data: result,
    });
  });
};
