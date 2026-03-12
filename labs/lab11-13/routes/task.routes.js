const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/task.controller");

router.get('/new', tasksController.get_new);
router.post("/new", tasksController.post_new);

router.get("/", tasksController.get_list);
router.post("/", tasksController.post_list);

module.exports = router;