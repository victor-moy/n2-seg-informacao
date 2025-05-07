const express = require("express");
const { body } = require("express-validator");
const auth = require("../middlewares/authMiddleware");
const validateInput = require("../middlewares/validateInput");
const userController = require("../controllers/userController");

const router = express.Router();

router.post(
  "/register",
  [
    body("username").isString().trim().notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  validateInput,
  userController.register
);

router.post("/login", userController.login);
router.get("/", auth, userController.getUsers);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
