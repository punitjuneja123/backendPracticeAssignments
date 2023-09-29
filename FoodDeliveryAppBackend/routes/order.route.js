const express = require("express");
const { orderModel } = require("../model/order.model");

const orderRouter = express.Router();

orderRouter.post("/api/orders", async (req, res) => {
  let payload = req.body;
  try {
    let data = new orderModel(payload);
    await data.save();
    res.status(201).send("order placed");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

orderRouter.get("/api/orders/:id", async (req, res) => {
  let id = req.params.id;
  let orderData = await orderModel.find({ _id: id });

  if (orderData.length > 0) {
    res.send(orderData);
  } else {
    res.status(400).send("no order found with this id");
  }
});

orderRouter.patch("/api/orders/:id", async (req, res) => {
  let id = req.params.id;
  let status = req.body.status;

  try {
    await orderModel.findByIdAndUpdate({ _id: id }, { status });
    res.send("status updated");
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

module.exports = { orderRouter };
