const express = require("express");
const router = express.Router();
const checkAuth = require("../controllers/check-auth");

const todosController = require("../controllers/todo");

router.post("/create-todo", checkAuth, todosController.create_todo);
router.get("/:id", todosController.get_todo);
router.get('/', todosController.getAllTodo);
router.patch("/:id", todosController.updateTodo);
router.delete("/:id", todosController.deleteTodo);

module.exports = router;
