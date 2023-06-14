const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  console.log("user details", request.body._doc);
  if (password.length < 3) {
    return response
      .status(400)
      .json({ error: "password should be more than 3 characters" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash,
  });
  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
