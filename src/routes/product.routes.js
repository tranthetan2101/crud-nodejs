const express = require("express");
const ProductController = require("../controllers/product.controller")
const router = express.Router();

router.get("/index", ProductController.index)
router.get("/show/:productId", ProductController.show)
router.post("/create", ProductController.store)
router.put("/update/:productId", ProductController.update)
router.delete("/delete/:productId", ProductController.delete)

module.exports = router;
