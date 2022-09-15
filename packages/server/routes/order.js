var express = require("express");
var router = express.Router();

const OrderController = require("../controller/orderController");

router.post("/", OrderController.addOrder);
router.get("/:id", OrderController.getOrderById);
router.get("/", OrderController.getAllOrder);

module.exports = router;
