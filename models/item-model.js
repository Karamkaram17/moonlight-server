const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    maxlength: [25, "name cannot be more than 25 characters"],
  },
  category: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    lowercase: true,
    maxlength: [25, "category cannot be more than 25 characters"],
  },
  price: {
    type: String,
    trim: true,
    maxlength: [15, "price cannot be more than 15 characters"],
  },
  description: {
    type: String,
    trim: true,
  },
});

const item = mongoose.model("items", ItemSchema);

module.exports = item;
