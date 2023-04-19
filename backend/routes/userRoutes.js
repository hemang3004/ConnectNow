const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  sendMail,
  getUser,
  updateUser,
  resetUserPassWord,
  deleteProfilePicture,
  verifyPassword,
  updatePassword,
  verifyEmail
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);
router.post("/forgot-password", sendMail);
router.post("/reset-password/:id/:token", resetUserPassWord);
router.get("/get-user/:uId", getUser);
router.post("/update-user", updateUser);
router.post("/remove-pic", deleteProfilePicture);
router.get("/verify-password/:id/:password", verifyPassword);
router.post("/update-password", updatePassword);
router.route("/verify").post(verifyEmail)

module.exports = router;
