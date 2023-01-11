const express = require("express");
const app = express();
const dataRouter = require("./routes/items-route");
const userRouter = require("./routes/user-route");
const loginRouter = require("./routes/login-route");
const dataEditerRoute = require("./routes/data-editer-route");
const userEditerRoute = require("./routes/users-editor-route");
const connectDB = require("./db/connect");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
var port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("./public"));
app.use("/data", dataRouter);
app.use("/users", userRouter);
app.use("/checklogin", loginRouter);
app.use("/data-editer", dataEditerRoute);
app.use("/users-editer", userEditerRoute);

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
