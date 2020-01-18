const express = require("express");
const usersController = require("../controllers/users-controller");

const router = express.Router();

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUserById);
router.post("/signup", usersController.signup);

module.exports = router;
