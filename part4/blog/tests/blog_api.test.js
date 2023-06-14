const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");
const User = require("../models/user");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaXNoMDEyMyIsImlkIjoiNjQ4OWZkOGM0ZGY3MGY5NjEzMjJjNTZkIiwiaWF0IjoxNjg2NzY1MDc1fQ.OkWAALrN9FJyBmPpXSDNsf_lCTEsFFUQJ_fzAx_czWU";

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    console.log("entered test");
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");
    const contents = response.body.map((blog) => blog.title);

    expect(contents).toContain("Go To Statement Considered Harmful");
  });

  test("a blog's id is defined", async () => {
    const blogsAtStart = await helper.blogsInDb();

    blogsAtStart.forEach((blog) => expect(blog).toBeDefined());
  });
});

describe("viewing a specific blog", () => {
 

  test("fails with statuscode 404 if blog does not exist", async () => {
    const nonExistingId = await helper.nonExistingId();
    await api.get(`/api/blogs/${nonExistingId}`).expect(404);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe("addition of a new note", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "testing middleware from blog testv1",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", "Bearer " + token)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    const contents = blogsAtEnd.map((r) => r.title);
    expect(contents).toContain("testing middleware from blog testv1");
  });

  test(" fails with status code 400 if not valid", async () => {
    const newBlog = {
      likes: 1,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const notesAtEnd = await helper.blogsInDb();

    expect(notesAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("a blog without likes will result in 0 likes", async () => {
    const newBlog = {
      title: "Likes should be zero",
      author: "Anish Maharjan",
      url: "https://reactpatterns.com/",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", "Bearer " + token)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    const contents = blogsAtEnd.map((r) => r.likes);
    expect(contents[helper.initialBlogs.length]).toEqual(0);
  });
});

describe("deletion of a note", () => {
  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", "Bearer " + token)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((r) => r.title);
    expect(contents).not.toContain(blogToDelete.title);
  });
});

describe("updating the data of presaved blog", () => {
  test(" successfull update of blog", async () => {
    const updatingId = "5a422ba71b54a676234d17fb";
    const blog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 100,
    };
    await api.put(`/api/blogs/${updatingId}`).send(blog).expect(204);

    const updatedBlog = await api
      .get(`/api/blogs/${updatingId}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(updatedBlog.body.likes).toEqual(100);
  });

  test("failed status with 400 if the data is invalid", async () => {
    const updatingId = "5a422ba71b54a676234d17fb";
    const blog = {
      title: "",
      author: "",
      url: "",
      likes: 100,
    };
    await api.put(`/api/blogs/${updatingId}`).send(blog).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
