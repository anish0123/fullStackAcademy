const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");
const User = require("../models/user");

describe("user", () => {


  test("getUsers", async () => {
    const result = await api.get("/api/users").expect(200);
  });

  test("logging in user", async () => {
    const user = {
      username: "anish0123",
      password: "secret",
    };
    await api
      .post("/api/login")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    console.log("token", await api.post("/api/login").send(user));
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
