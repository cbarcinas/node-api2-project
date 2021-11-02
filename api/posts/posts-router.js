// implement your posts router here

const express = require("express");
const router = express.Router();

// import data access functions
const Post = require("./posts-model");

// ENDPOINTS
// ENDPOINTS
// ENDPOINTS

// Returns an array of all the post objects contained in the database
router.get("/", (req, res) => {
  Post.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.status(500).json({
        message: "The posts information could not be retrieved",
        err: err.message,
        stack: err.stack,
      });
    });
});

// Returns the post object with the specified id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      res.json(post);
    }
  } catch (err) {
    res.status(404).json({
      message: "The post information could not be retrieved",
      err: err.message,
      stack: err.stack,
    });
  }
});

// // Creates a post using the info sent inside the req body and returns the newly created post object
// router.post("/", (req, res) => {});

// // Removes the post with the specified id and returns the deleted post object
// router.delete("/:id", (req, res) => {});

// // Updates the post with the specified id using data from the req body and returns the modified posts, not the original
// router.put("/:id", (req, res) => {});

// // Returns an array of all the comment objects associated with the post with the specified id
// router.get("/:id/comments", (req, res) => {});

module.exports = router;
