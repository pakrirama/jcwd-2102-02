const express = require("express");
const router = express.Router();

const cartController = require("../controller/cartController");

router.post("/:id_cart/:id_product", cartController.addCartItem);
router.patch("/:id_cart/:id_product", cartController.editQuantity);
router.delete("/user/:id_product_cart", cartController.deleteCartItem);
router.get("/user/:id_user", cartController.getCartByUserId);

module.exports = router;
