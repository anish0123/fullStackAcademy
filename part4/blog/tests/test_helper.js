const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "aaaaa",
    author: "045645476567",
    url: "asdas",
    likes: 1,
  },
  {
    title: "aaasadaa",
    author: "0456as45476567",
    url: "as1231das",
    likes: 1,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "will delete soon",
    author: "ajshdkjas",
    url: "jakshdjkahs",
  });

  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blogs) => blogs.toJSON());
};

module.exports = { initialBlogs, nonExistingId, blogsInDb };
