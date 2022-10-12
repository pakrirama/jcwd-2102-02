const express = require("express");
const router = express.Router();
const fileUploader = require("../lib/uploader");

const { authorizedLoggedInUser } = require("../middlewares/AuthMiddleware");
const userController = require("../controller/userController");

router.get("/", userController.getAllUser);
router.get("/getUserId/:id", userController.getUserById);
router.post("/", userController.addUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.patch("/verify/:vertoken", userController.verifyUser);
router.post("/verifysend/", userController.verifySend);
router.post("/sendResetPass", userController.sendResetPass);
router.post("/resetPass/:restoken", userController.verifyResToken);
router.patch("/forgetPassword/:restoken", userController.changePassword);
router.patch("/editPassword/:id", userController.editPassword);
router.post("/resendVerification", userController.resendVerification);
router.patch("/:id", userController.editUser);
router.get("/refresh-token", authorizedLoggedInUser, userController.keepLogin);

router.patch(
  "/:id/address/:default_address",
  userController.editDefaultAddress
);

router.patch(
  "/upload/:id",
  fileUploader({
    destinationFolder: "profile_pict",
    fileType: "image",
    prefix: "POST",
  }).single("image"),
  userController.uploadProfilePict
);

module.exports = router;
