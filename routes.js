const express = require("express");
const router = new express.Router();

const items = [];

// GET/items - get list of shopping items
router.get("/", (req, res) => {
  return res.json(items);
});

module.exports = router;
