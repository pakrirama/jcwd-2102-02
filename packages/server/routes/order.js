const express = require("express");
const router = express.Router();
const fileUploader = require("../lib/uploader");

const OrderController = require("../controller/orderController");

router.post("/", OrderController.addOrder);
router.get("/:id", OrderController.getOrderByUserId);
router.get("/:id/invoice/:no_invoice", OrderController.getOrderByInvoice);
router.get("/", OrderController.getAllOrder);
router.patch("/status/:id", OrderController.editOrderStatus);
router.patch("/prescription/copy/:id", OrderController.prescriptionCopy);

router.post(
  "/prescription",
  fileUploader({
    destinationFolder: "prescription",
    fileType: "image",
    prefix: "prescription",
  }).single("prescription"),
  OrderController.uploadPrescription
);

router.patch(
  "/payment/upload/:id",
  fileUploader({
    destinationFolder: "payment",
    fileType: "image",
    prefix: "receipt",
  }).single("payment_receipt"),
  OrderController.uploadPaymentReceipt
);

module.exports = router;
