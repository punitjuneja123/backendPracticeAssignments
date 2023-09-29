const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { userModel } = require("../model/user.model");

const userRouter = express.Router();

// regestering user
userRouter.post("/api/register", async (req, res) => {
  let { name, email, password, address } = req.body;

  // checking if emil exists already
  let userExists = await userModel.find({ email });

  if (userExists.length != 0) {
    res.status(409).send({ msg: "email already exists" });
  } else {
    //   hashing the password
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        console.log(err);
        res.send({ error: "something went wrong while saving password" });
      } else {
        let data = new userModel({ name, email, password: hash, address });
        await data.save();
        res.send({ msg: "user registered" });
      }
    });
  }
});

// logging user
userRouter.post("/api/login", async (req, res) => {
  let { email, password } = req.body;
  let userData = await userModel.find({ email });

  if (userData.length > 0) {
    //   checking password
    bcrypt.compare(password, userData[0].password, (err, result) => {
      if (result) {
        let token = jwt.sign({ userID: userData[0]._id }, process.env.key);
        res.send({
          msg: "user login successful",
          token: token,
          userID: userData[0]._id,
        });
      } else {
        res.status(401).send({ err: "wrong password" });
      }
    });
  } else {
    res.status(401).send({ err: "wrong credentials" });
  }
});

//reset password
userRouter.patch("/api/user/:id/reset", async (req, res) => {
  let id = req.params.id;
  let { password, newPassword } = req.body;

  let userData = await userModel.find({ _id: id });
  if (userData.length > 0) {
    //   checking previous password
    bcrypt.compare(password, userData[0].password, (err, result) => {
      if (result) {
        // hashing new password
        bcrypt.hash(newPassword, 5, async (err, hash) => {
          if (err) {
            console.log(err);
            res.send({
              error: "something went wrong while saving password",
            });
          } else {
            await userModel.findByIdAndUpdate({ _id: id }, { password: hash });
            res.send({ msg: "password changed successfully" });
          }
        });
      } else {
        res.status(401).send({ err: "wrong password" });
      }
    });
  } else {
    res.status(401).send({ err: "wrong credentials" });
  }
});

module.exports = { userRouter };
