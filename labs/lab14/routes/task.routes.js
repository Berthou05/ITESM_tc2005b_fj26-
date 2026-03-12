const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task.controller");

router.get("/", taskController.get_list);
router.get("/new", taskController.get_new);
router.post("/new", taskController.post_new);
router.post("/delete", taskController.post_delete);

module.exports = router;
