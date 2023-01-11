const path = require("path");

const getUserEditorHtml = (req, res) => {
  if (req) {
    res
      .status(200)
      .sendFile(path.resolve(__dirname, "../users-editer/index.html"));
  } else {
    res.status(400).send("not authenticated");
  }
};

const getUserEditorCSS = (req, res) => {
  if (req) {
    res
      .status(200)
      .sendFile(path.resolve(__dirname, "../users-editer/style.css"));
  } else {
    res.status(400).send("not authenticated");
  }
};

const getUserEditorJs = (req, res) => {
  if (req) {
    res
      .status(200)
      .sendFile(path.resolve(__dirname, "../users-editer/script.js"));
  } else {
    res.status(400).send("not authenticated");
  }
};

module.exports = { getUserEditorCSS, getUserEditorHtml, getUserEditorJs };
