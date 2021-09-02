const express = require("express");
const CategoryService = require("../controllers/category.controller")
const router = express.Router();

router.get("/index", CategoryService.index)
router.post("/create", CategoryService.store)

module.exports = router;