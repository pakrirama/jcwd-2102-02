const express = require("express");
const router = express.Router();
const fileUploader = require("../lib/uploader");

const productController = require("../controller/productController");

router.get("/", productController.getAllProduct);
router.get("/name", productController.getAllProductName);
router.get("/:id", productController.getProductById);
router.get("/:id/description", productController.getProductDescription);

router.get("/", productController.getAllProduct);

router.get("/:id", productController.getProductById);

router.delete("/delete/:id", productController.deleteProduct);

router.post(
  "/create",
  fileUploader({
    destinationFolder: "product_images",
    fileType: "image",
    prefix: "POST",
  }).single("img_product"),
  productController.createProduct
);

router.patch(
  "/update/:id",
  fileUploader({
    destinationFolder: "product_images",
    fileType: "image",
    prefix: "POST",
  }).single("img_product"),
  productController.updateProduct
);

module.exports = router;
