const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({
      error: "Title or url is missing",
    });
  }
  const body = request.body;

  const uploadingUser = request.user;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: uploadingUser.id,
    url: body.url,
    likes: body.likes || 0,
  });
  uploadingUser.blogs = uploadingUser.blogs.concat(blog._id);
  await uploadingUser.save();
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  console.log("user", user);
  console.log("blog id ", request.params.id);
  const blog = await Blog.findById(request.params.id);
  if(!blog) {
    response.status(400).json({error : "file has already been deleted"});
  }
  console.log("blog", blog);
  if (user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
    new: true,
    runValidators: true,
    context: "query",
  });
  response.send(204).json(updatedBlog);
});

module.exports = blogsRouter;
