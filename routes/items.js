const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require("../fakeDb");

// get list of shopping items
router.get("/", (req, res) => {
  return res.json({ items });
});

// accept JSON data and add it to the shopping list
router.post("/", (req, res) => {
  const newItem = {
    name: req.body.name,
    price: req.body.price,
  };
  items.push(newItem);
  return res.status(201).json({ added: newItem });
});

// display a single item's name and price
router.get("/:name", (req, res) => {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  return res.json({ item: foundItem });
});

// modify a single item’s name and/or price
router.patch("/:name", (req, res) => {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  foundItem.name = req.body.name;
  foundItem.price = req.body.price;
  return res.json({ updated: foundItem });
});

// delete a specific item from the array
router.delete("/:name", (req, res) => {
  const foundItem = items.findIndex((item) => item.name === req.params.name);
  if (foundItem === -1) {
    throw new ExpressError("Item not found", 404);
  }
  items.splice(foundItem, 1);
  return res.json({ message: "Deleted" });
});

module.exports = router;
