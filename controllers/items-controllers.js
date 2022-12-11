const Item = require("../models/task");

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOneItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findOne({ _id: id });
    if (!item) {
      return res.status(404).send(`no task with with id: ${id}`);
    }
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).send(`no task with with id: ${id}`);
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findOneAndDelete({ _id: id });
    if (!item) {
      return res.status(404).send(`no task with with id: ${id}`);
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAllItems, addItem, getOneItem, updateItem, deleteItem };
