const jwt = require("jsonwebtoken");
require("dotenv").config();

let authentication = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.key, (err, decode) => {
      if (decode) {
        req.body.userID = decode.userID;
        next();
      } else {
        res.status(400).send("please provide correct token");
      }
    });
  } else {
    res.status(400).send("please provide a token");
  }
};
module.exports = { authentication };
