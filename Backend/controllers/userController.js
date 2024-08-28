const connection = require("./../mysql");
const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("./../models/user");
const jwt = require("jsonwebtoken");

let generateToken = (id) => {
  return jwt.sign(
    {
      data: id,
    },
    "secret",
    { expiresIn: "86400000" }
  );
};

exports.createUser = (req, res) => {
  let query = "INSERT INTO users(username, email, password, user_role)";
  query += " VALUES(?, ?, ?, ?)";
  const user = new User(
    req.body.username,
    req.body.email,
    req.body.password,
    "user"
  );

  const saltRounds = 10;

  if (!validator.isEmail(user.email)) {
    res.status(400).json({
      message: "Enter A Valid Email",
    });
  } else if (
    user.username &&
    user.email &&
    user.password &&
    req.body.confirmPassword &&
    req.body.confirmPassword === user.password
  ) {
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      const userData = [user.username, user.email, hash, user.user_role];
      // Store hash in your password DB.
      connection.query(query, userData, (error, result) => {
        res.status(201).json({
          message: "User Created",
          data: result,
        });
      });
    });
  } else if (
    !req.body.confirmPassword ||
    !user.username ||
    !user.email ||
    !user.password
  ) {
    res.status(400).json({
      message: "You Must Include All Fields",
    });
  } else {
    res.status(400).json({
      message: "Passwords Do Not Match",
    });
  }
};

exports.userLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const query =
    "SELECT user_id, username, user_role, password FROM users WHERE email = ?";

  if (!validator.isEmail(email)) {
    res.status(400).json({
      message: "Enter A Valid Email",
    });
  } else if (!email || !password) {
    res.status(400).json({
      message: "Please Include All Fields",
    });
  } else {
    connection.query(query, [email], (error, result) => {
      if (result) {
        bcrypt.compare(password, result[0].password, function (err, correct) {
          if (correct) {
            let token = generateToken(result[0].user_id);
            res.cookie("jwt", token, {
              maxAge: 86400000,
              httpOnly: true,
            });
            res.status(200).json({
              message: "User Logged In",
              user_id: result[0].user_id,
              user_role: result[0].user_role,
              username: result[0].username,
              token: token,
            });
          } else {
            res.status(400).json({
              message: "Incorrect Password",
            });
          }
        });
      }
    });
  }
};

exports.checkIfValidToken = (req, res, next) => {
  try {
    const token = req.cookies.jwt ? req.cookies.jwt : req.headers.authorization;
    var decoded = jwt.verify(token, "secret");
    if (decoded) {
      next();
    }
  } catch (err) {
    // err
    return res.status(400).json({
      message: "Not Authorized",
    });
  }
};

exports.checkIfAdmin = (req, res, next) => {
  if (req.headers.admin) {
    next();
  } else {
    return res.status(401).json({
      message: "Login As Admin To Make The Request",
    });
  }
};

exports.userLogout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    message: "User Logged Out Successfully",
  });
};

exports.updateUserInfo = (req, res) => {
  const query =
    "UPDATE users SET username = ?, email = ?, password = ?, user_role = ? WHERE user_id = ?";
  const saltRounds = 10;
  let user = new User(
    req.body.username,
    req.body.email,
    req.body.password,
    "user"
  );
  // connection.query(
  //   query,
  //   [user.username, user.email, user.password, user.user_role, req.params.id],
  //   (error, result) => {
  //     res.status(200).json({
  //       message: "User Successfully Updated",
  //       data: result,
  //     });
  //   }
  // );
  bcrypt.hash(user.password, saltRounds, function (err, hash) {
    const userData = [
      user.username,
      user.email,
      hash,
      user.user_role,
      req.params.user_id,
    ];
    connection.query(query, userData, (error, result) => {
      res.status(200).json({
        message: "User Successfully Updated",
        data: result,
      });
    });
  });
};

exports.addReview = (req, res) => {
  const query =
    "INSERT INTO reviews(product_id, user_id, username, review, date) VALUES(?, ?, ?, ?, CURDATE())";
  connection.query(
    query,
    [req.params.id, req.body.user_id, req.body.username, req.body.review],
    (error, review) => {
      res.status(200).json({
        message: "Review Added",
        review,
      });
    }
  );
};
