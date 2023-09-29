const express = require("express");

const app = express();
app.use(express.json());

const { connection } = require("./config/db.config");
const { userRouter } = require("./routes/user.route");
const { authentication } = require("./middleware/auth.middleware");
const { restaurantRouter } = require("./routes/restaurant.route");
const { orderRouter } = require("./routes/order.route");

// init route
app.get("/", (req, res) => {
  res.send("welcome to food delivery app");
});
// other routes
app.use(userRouter);
app.use(authentication);
app.use(restaurantRouter);
app.use(orderRouter);

app.listen(4500, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log("server running at port 4500");
});
