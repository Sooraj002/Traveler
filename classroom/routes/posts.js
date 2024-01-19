const express = require("express");
const router = express.Router();

// posts
// Index post
router.get("/", (req, res) => {
    res.send("Get for post");
})

// Index show post
router.get("/:id", (req, res) => {
    res.send("Get for show post");
})

// post post
router.post("/", (req, res) => {
    res.send("Get for post");
})

// delete post
router.delete("/", (req, res) => {
    res.send("delete for post");
})

module.exports = router;
