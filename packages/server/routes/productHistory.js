const express = require("express");
const router = express.Router();

const HistoryController = require("../controller/producthistory");

router.get("/", HistoryController.getAllhistory);
router.get("/:id", HistoryController.gethistoryById);
router.delete("/:id", HistoryController.deleteHistory);
router.post("/:id_order", HistoryController.createProductHistory);

module.exports = router;
