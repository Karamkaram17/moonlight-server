const express = require("express");
const app = express();
const itemsRouter = require("./routes/items-routes");
const connectDB = require("./db/connect");
require("dotenv").config();
const cors = require("cors");

var port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.use("/data", itemsRouter);

app.all("*", (req, res) => {
  res.status(404).send("<h1>root does not exist</h1>");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port);
  } catch (error) {
    console.log(error);
  }
};

start();
