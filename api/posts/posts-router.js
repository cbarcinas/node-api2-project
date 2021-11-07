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

// Creates a post using the info sent inside the req body and returns the newly created post object
router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  } else {
    Post.insert({ title, contents })
      .then(({ id }) => {
        return Post.findById(id);
      })
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
          err: err.message,
          stack: err.stack,
        });
      });
  }
});

// Removes the post with the specified id and returns the deleted post object
router.delete("/:id", async (req, res) => {
  try {
    // client will specify the id to delete
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      // bc we have the specified ID and are deleting it,
      //  we do not need to store it in a variable
      await Post.remove(req.params.id);
      // return the deleted post object
      res.json(post);
    }
  } catch (err) {
    res.status(500).json({
      message: "The post could not be removed",
      err: err.message,
      stack: err.stack,
    });
  }
});

// Updates the post with the specified id using data from the req body and returns the modified posts, not the original
router.put("/:id", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  } else {
    Post.findById(req.params.id)
      .then((stuff) => {
        if (!stuff) {
          res.status(404).json({
            message: "The post with the specified ID does not exist",
          });
        } else {
          return Post.update(req.params.id, req.body);
        }
      })
      .then((data) => {
        // this tells us how many records we are updating
        // console log of data should show 1 record or undefined
        // if record does not exist
        if (data) {
          return Post.findById(req.params.id);
        }
      })
      .then((post) => {
        if (post) {
          res.json(post);
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "The post information could not be retreived",
          err: err.message,
          stack: err.stack,
        });
      });
  }
});

// Returns an array of all the comment objects associated with the post with the specified id
router.get("/:id/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      const messages = await Post.findPostComments(req.params.id);
      res.json(messages);
    }
  } catch (err) {
    res.status(500).json({
      message: "The comments information could not be retrieved",
      err: err.message,
      stack: err.stack,
    });
  }
});

module.exports = router;
