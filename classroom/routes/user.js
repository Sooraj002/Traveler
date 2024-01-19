const express = require("express");
const router = express.Router();

// Index users
router.get("/", (req, res) => {
    res.send("Get for users");
})

// Index show users
router.get("/:id", (req, res) => {
    res.send("Get for show users");
})

// post users
router.post("/", (req, res) => {
    res.send("Get for users");
})

// delete users
router.delete("users", (req, res) => {
    res.send("delete for users");
})

module.exports = router;