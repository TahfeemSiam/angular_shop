const multer = require("multer");
const connection = require("./../mysql");
const Product = require("./../models/product");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "./uploads");
    cb(null, "./../public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
  },
});

exports.upload = multer({ storage: storage });

exports.addProduct = (req, res) => {
  const product = new Product(
    req.body.product_name,
    req.body.product_price,
    req.body.product_condition,
    req.body.product_category,
    req.body.product_sub_category,
    req.body.product_available,
    req.body.image_1,
    req.body.image_2,
    req.body.image_3,
    req.body.max_quantity,
    req.body.search
  );

  const query =
    "INSERT INTO products(product_name, product_price, product_condition, product_category, product_sub_category, product_available, image_1, image_2, image_3, max_quantity, search) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  connection.query(
    query,
    [
      product.product_name,
      product.product_price,
      product.product_condition,
      product.product_category,
      product.product_sub_category,
      product.product_available,
      product.image_1,
      product.image_2,
      product.image_3,
      product.max_quantity,
      product.search,
    ],
    (error, result) => {
      res.status(201).json({
        message: "Product Added",
        data: result,
      });

      console.log(result);
    }
  );
};

exports.ImageUpload = (req, res) => {
  res.status(200).json({
    message: "Image Uploaded",
    images: req.files,
    // image1: req.files[0].filename,
    // image2: req.files[1].filename,
    // image3: req.files[2].filename,
  });
};

exports.deleteProduct = (req, res) => {
  const query = "DELETE FROM products WHERE product_id = ?";

  connection.query(query, [req.params.id], (error, result) => {
    res.status(200).json({
      message: "Product Deleted Succesfully",
      data: result,
    });
  });
};

exports.confirmOrder = (req, res) => {
  const query =
    "UPDATE orders SET status = ? WHERE user_id = ? AND product_id = ?";

  connection.query(
    query,
    ["confirmed", req.params.userId, req.params.prodId],
    (error, result) => {
      res.status(200).json({
        message: "Order Confirmed Successfully",
        data: result,
      });
    }
  );
};
