const express = require("express");
const {
  createExpense,
  filter,
  updateExpense,
  deleteExpense,
  getcategory,
  getAll,
  getByid
} = require("../controllers/categoryController");
const router = express.Router();

router.post("/", createExpense);
router.get("/filter", filter);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);
router.get("/category", getcategory);
router.get("/", getAll);
router.get("/:id", getByid);

module.exports = router;
