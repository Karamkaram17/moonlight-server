let DATA = require("../data/data");

const getAllItems = (req, res) => {
  res.json(DATA);
};

const addItem = (req, res) => {
  const { name, description, price, category, id } = req.body;
  if (name && category && id) {
    DATA.push(req.body);
    return res.status(200).json({ name, description, price, category, id });
  } else {
    return res.status(404).send("<h1>plz provide a name and category</h1>");
  }
};

const getOneItem = (req, res) => {
  const id = Number(req.params.id);
  const oneItem = DATA.find((item) => item.id == id);
  if (!oneItem) {
    return res.status(404).send("<h1>no such id</h1>");
  }
  res.status(200).json(oneItem);
};

const updateItem = (req, res) => {
  const id = Number(req.params.id);
  const { name, description, price, category } = req.body;
  const oneItem = DATA.find((item) => item.id == id);
  if (!oneItem) {
    return res.status(404).send("<h1>no such id</h1>");
  }
  if (name && category && id) {
    DATA = DATA.map((item) => {
      if (item.id === id) {
        item.name = name;
        item.description = description;
        item.price = price;
        item.category = category;
        item.id = id;
      }
      return item;
    });
    return res.status(200).json(DATA.find((item) => item.id == id));
  }
  return res
    .status(404)
    .send("<h1>plz make sure you provide a name ,a category and an id</h1>");
};

const deleteItem = (req, res) => {
  const id = Number(req.params.id);
  const oneItem = DATA.find((item) => item.id == id);
  if (!oneItem) {
    return res.status(404).send("<h1>no such id</h1>");
  }
  DATA = DATA.filter((person) => person.id !== id);
  res.status(200).json(oneItem);
};

module.exports = { getAllItems, addItem, getOneItem, updateItem, deleteItem };
