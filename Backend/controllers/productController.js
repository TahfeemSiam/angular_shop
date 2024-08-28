const connection = require("./../mysql");

exports.getProducts = (req, res) => {
  const query = "SELECT * FROM products";

  connection.query(query, (error, result) => {
    res.status(200).json({
      message: "Fetched All Products",
      data: result,
    });
  });
};

exports.getFeaturedProducts = (req, res) => {
  const query =
    "SELECT * FROM products WHERE product_category IN('Grocery', 'Mobiles', 'Fashion', 'Electronics', 'Home And Furniture', 'Appliances', 'Travel', 'Beauty, Toys And More', 'Bikes') LIMIT 9";

  connection.query(query, (error, result) => {
    res.status(200).json({
      message: "Featured Products",
      data: result,
    });
  });
};

exports.getProductById = (req, res) => {
  let productId = req.params.id;
  let query = "SELECT * FROM products WHERE product_id = ?";
  connection.query(query, [productId], (error, result) => {
    res.status(200).json({
      data: result,
    });
  });
};

exports.getProductReviewsById = (req, res) => {
  let productId = req.params.id;
  let query = "SELECT * FROM reviews WHERE product_id = ?";
  connection.query(query, [productId], (error, reviews) => {
    res.status(200).json({
      message: "Fetched All Reviews For A Product",
      reviews,
    });
  });
};
