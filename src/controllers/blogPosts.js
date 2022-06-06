const express = require("express");
const router = express.Router();
const dataSource = require("../dataSource");
const { validateQuery } = require("../utils/validateQuery");
const { sortPosts } = require("../utils/sortPosts");
const { removeDuplicates, findDuplicates } = require("../utils/duplicatePosts");

router.get("/ping", async (_, res) => {
  const response = await dataSource.pingApi("test");
  if (response.status === 200) {
    res.status(200).send({ success: true });
  } else {
    // Error occured
    console.log(response);
  }
});

router.get("/posts", async (req, res) => {
  const errMessage = validateQuery(req.query);

  if (errMessage.length > 0) {
    res.status(400).send(errMessage);
  } else {
    let mergedPosts = [];
    // Match the tags after each ',' and ignore whitespace
    const tags = req.query.tags.match(/[^,\s][^\,]*[^,\s]*/g);

    const response = await dataSource.getPosts(tags);

    for (let i in response) {
      mergedPosts = mergedPosts.concat(response[i].data.posts);
    }

    // Find the duplicate values in the merged posts
    const posts = findDuplicates(mergedPosts);

    if (posts.duplicates.length > 0) {
      // duplicates exist
      mergedPosts = removeDuplicates(
        posts.mergedPosts,
        posts.foundDuplicates,
        posts.duplicates
      );
    }

    // Sort posts based on the given query parameters
    if (req.query.sortBy !== undefined) {
      if (req.query.direction !== undefined) {
        mergedPosts = sortPosts(
          mergedPosts,
          req.query.sortBy,
          req.query.direction
        );
      } else {
        mergedPosts = sortPosts(mergedPosts, req.query.sortBy);
      }
    } else if (req.query.direction !== undefined) {
      mergedPosts = sortPosts(mergedPosts, "id", req.query.direction);
    }

    const result = {
      posts: mergedPosts,
    };

    res.status(200).send(result);
  }
});

module.exports = router;
