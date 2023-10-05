const express = require("express");

const { listingModel } = require("../model/listing.model");

const listingRouter = express.Router();

listingRouter.post("/api/listings", async (req, res) => {
  let payload = req.body;
  try {
    let saveData = listingModel(payload);
    await saveData.save();
    res.status(201).send("listing added");
  } catch (error) {
    console.log(error);
    res.send("something went wrong");
  }
});

listingRouter.get("/api/listings", async (req, res) => {
  try {
    let data = await listingModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send("something went wrong");
  }
});

listingRouter.get("/api/listings/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let data = await listingModel.findOne({ _id: id });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send("something went wrong");
  }
});

listingRouter.delete("/api/listings/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let data = await listingModel.findByIdAndDelete({ _id: id });
    res.status(202).send("listing deleted");
  } catch (error) {
    console.log(error);
    res.send("something went wrong");
  }
});

module.exports = { listingRouter };
