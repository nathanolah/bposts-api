const express = require("express");
const bodyParser = require("body-parser");
const blogPostsController = require("./controllers/blogPosts");

const app = express();

app.use(bodyParser.json());
app.use("/api", blogPostsController);

module.exports = app;
