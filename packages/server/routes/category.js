const express = require("express");
const router = express.Router();
const fileUploader = require("../lib/uploader");

const categoryController = require("../controller/categoryController");

router.get("/", categoryController.getAllCategory);
router.get("/:id", categoryController.getCategoryById);
router.patch("/:id", categoryController.updateCategoryList);
router.post(
  "/createCat",
  fileUploader({
    destinationFolder: "product_images",
    fileType: "image",
    prefix: "POST",
  }).single("img_category"),
  categoryController.createCategory
);
router.delete("/delete/:id", categoryController.deleteCategory);

router.patch(
  "/updateCat/:id",
  fileUploader({
    destinationFolder: "product_images",
    fileType: "image",
    prefix: "POST",
  }).single("img_category"),
  categoryController.updateCategory
);
module.exports = router;
