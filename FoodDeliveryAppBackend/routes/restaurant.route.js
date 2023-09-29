const express = require("express");

const { restaurantModel } = require("../model/restaurant.model");

const restaurantRouter = express.Router();

// getting all restaurants data
restaurantRouter.get("/api/restaurants", async (req, res) => {
  try {
    let restaurants = await restaurantModel.find();
    res.send(restaurants);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// adding restaurant data
restaurantRouter.post("/api/restaurants", async (req, res) => {
  let { name, address, menu } = req.body;
  try {
    let data = new restaurantModel({ name, address, menu });
    data.save();
    res.send("restaurant added");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// getting individual restaurant data
restaurantRouter.get("/api/restaurants/:id", async (req, res) => {
  let id = req.params.id;
  let restaurantData = await restaurantModel.find({ _id: id });
  if (restaurantData.length > 0) {
    res.send(restaurantData);
  } else {
    res.status(400).send("no restaurant found with this id");
  }
});

// getting menu of a restaurant
restaurantRouter.get("/api/restaurants/:id/menu", async (req, res) => {
  let id = req.params.id;
  let restaurantData = await restaurantModel.find({ _id: id });
  if (restaurantData.length > 0) {
    res.send({ menu: restaurantData[0].menu });
  } else {
    res.status(400).send("no restaurant found with this id");
  }
});

// adding a new item to menu
restaurantRouter.post("/api/restaurants/:id/menu", async (req, res) => {
  let payload = req.body;
  let id = req.params.id;

  restaurantModel
    .findById({ _id: id })
    .then((restaurant) => {
      if (!restaurant) {
        res.status(400).send("no restaurant found with this id");
      }

      restaurant.menu.push(payload);
      return restaurant.save();
    })
    .then(() => {
      res.status(201).send("item added successfully");
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
});

// deleting an item from menu
restaurantRouter.delete(
  "/api/restaurants/:resid/menu/:itemid",
  async (req, res) => {
    let menuID = req.params.resid;
    let itemID = req.params.itemid;

    restaurantModel
      .findById({ _id: menuID })
      .then((restaurant) => {
        if (!restaurant) {
          res.status(400).send("no restaurant found with this id");
        }
        const menuItemIndex = restaurant.menu.findIndex(
          (item) => item._id.toString() === itemID
        );

        if (menuItemIndex === -1) {
          res.status(400).send("no item in menu found with this id");
        }

        // Remove the menu item from the menu array
        restaurant.menu.splice(menuItemIndex, 1);

        // Save the updated restaurant document
        return restaurant.save();
      })
      .then(() => {
        res.status(201).send("item deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  }
);
module.exports = { restaurantRouter };
