const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0].likes;
  } else {
    let sum = 0;
    for (const blog of blogs) {
      sum = sum + blog.likes;
    }
    return sum;
  }
};

const favouriteBlog = (blogs) => {
  let highestLikes = 0;
  let highestLikedBlog = {};
  for (const blog of blogs) {
    if (blog.likes > highestLikes) {
      highestLikes = blog.likes;
      highestLikedBlog = blog;
    }
  }
  delete highestLikedBlog._id;
  delete highestLikedBlog.url;
  delete highestLikedBlog.__v;
  return highestLikedBlog;
};

const findValue = (obj, value) => {
  return Object.keys(obj).find((key) => obj[key] === value);
};

const mostBlogs = (blogArray) => {
  let authorsArray = [];
  const authorCount = {};
  let author = "";
  let blogs = 0;
  for (const blog of blogArray) {
    authorsArray = authorsArray.concat(blog.author);
  }
  authorsArray.forEach((author) => {
    authorCount[author] = (authorCount[author] || 0) + 1;
  });
  blogs = Math.max(...Object.values(authorCount));
  author = findValue(authorCount, blogs);
  return { blogs, author };
};

const mostLikes = (blogArray) => {
  
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs };
