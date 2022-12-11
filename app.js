const express = require("express");
const app = express();
const itemsRouter = require("./routes/items-routes");
const cors = require("cors");

var port = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());

app.use(express.static("./moonlight-menu"));

app.use("/menu/data", itemsRouter);

app.all("*", (req, res) => {
  res.status(404).send("<h1>no sutch root</h1>");
});

app.listen(port);
