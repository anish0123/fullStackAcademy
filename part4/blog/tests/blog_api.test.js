const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "aaaa2123a",
    author: "04aa5645476567",
    url: "asd123as",
    likes: 1,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  const contents = blogsAtEnd.map((r) => r.title);
  expect(contents).toContain("aaaa2123a");
});

test("a blog without title, author and url is not added", async () => {
  const newBlog = {
    likes: 1,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const notesAtEnd = await helper.blogsInDb();

  expect(notesAtEnd).toHaveLength(helper.initialBlogs.length);
});

test("a specific blog can be viewed", async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(resultBlog.body).toEqual(blogToView);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const contents = blogsAtEnd.map((r) => r.title);
  expect(contents).not.toContain(blogToDelete.title);
});

test("a blog's id is defined", async () => {
  const blogsAtStart = await helper.blogsInDb();
  expect(blogsAtStart[0].id).toBeDefined();
});

test("a blog without likes will result in 0 likes", async () => {
  const newBlog = {
    _id: "5a422a851b54a676234d17f7",
    title: "Likes should be zero",
    author: "Anish Maharjan",
    url: "https://reactpatterns.com/",
    __v: 0,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  const contents = blogsAtEnd.map((r) => r.likes);
  expect(contents[helper.initialBlogs.length]).toEqual(0);
});

afterAll(async () => {
  await mongoose.connection.close();
});
