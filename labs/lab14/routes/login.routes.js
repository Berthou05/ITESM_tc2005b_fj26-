const express = require("express");
const loginController = require("../controllers/login.controller");

const router = express.Router();

router.get("/", loginController.get_entry);
router.get("/login", loginController.get_login);
router.post("/login", loginController.post_login);
router.get("/signup", loginController.get_signup);
router.post("/signup", loginController.post_signup);
router.get("/logout", loginController.logout);

module.exports = router;
