const express = require("express");
const { productController } = require("../controller");
const router = express.Router();

router.get('/', productController.getAllProduct)
router.get("/filter", productController.getProdutByCategories)
router.get('/:product_id', productController.getProductById)

module.exports = router