const path = require("path");

const getEditItemsHtml = (req, res) => {
  if (req) {
    res
      .status(200)
      .sendFile(path.resolve(__dirname, "../data-editer/index.html"));
  } else {
    res.status(400).send("not authenticated");
  }
};

const getEditItemsCss = (req, res) => {
  if (req) {
    res
      .status(200)
      .sendFile(path.resolve(__dirname, "../data-editer/edit-items.css"));
  } else {
    res.status(400).send("not authenticated");
  }
};

const getEditItemsJs = (req, res) => {
  if (req) {
    res
      .status(200)
      .sendFile(path.resolve(__dirname, "../data-editer/edit-items.js"));
  } else {
    res.status(400).send("not authenticated");
  }
};

const getEditItemHtml = (req, res) => {
  if (req) {
    res
      .status(200)
      .sendFile(path.resolve(__dirname, "../data-editer/edit-item.html"));
  } else {
    res.status(400).send("not authenticated");
  }
};

const getEditItemCss = (req, res) => {
  if (req) {
    res
      .status(200)
      .sendFile(path.resolve(__dirname, "../data-editer/edit-item.css"));
  } else {
    res.status(400).send("not authenticated");
  }
};

const getEditItemJs = (req, res) => {
  if (req) {
    res
      .status(200)
      .sendFile(path.resolve(__dirname, "../data-editer/edit-item.js"));
  } else {
    res.status(400).send("not authenticated");
  }
};

module.exports = {
  getEditItemsCss,
  getEditItemsHtml,
  getEditItemsJs,
  getEditItemCss,
  getEditItemHtml,
  getEditItemJs,
};
