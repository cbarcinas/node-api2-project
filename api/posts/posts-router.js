// implement your posts router here

const express = require("express");
const router = express.Router();

// ENDPOINTS
// ENDPOINTS
// ENDPOINTS

// Returns an array of all the post objects contained in the database
router.get("/", (req, res) => {
  res.json("router is connected");
});

// // Returns the post object with the specified id
// router.get("/:id", (req, res) => {});

// // Creates a post using the info sent inside the req body and returns the newly created post object
// router.post("/", (req, res) => {});

// // Removes the post with the specified id and returns the deleted post object
// router.delete("/:id", (req, res) => {});

// // Updates the post with the specified id using data from the req body and returns the modified posts, not the original
// router.put("/:id", (req, res) => {});

// // Returns an array of all the comment objects associated with the post with the specified id
// router.get("/:id/comments", (req, res) => {});

module.exports = router;
