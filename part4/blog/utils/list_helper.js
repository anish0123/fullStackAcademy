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

// Method for finding the keys through values in an object
const findValue = (obj, value) => {
  return Object.keys(obj).find((key) => obj[key] === value);
};

// Method for finding the author who has written the most blogs
const mostBlogs = (blogArray) => {
  // Defining variables
  let authorsArray = [];
  const authorCount = {};
  let author = "";
  let blogs = 0;
  // Saving the names of the authors of the blogs in array
  for (const blog of blogArray) {
    authorsArray = authorsArray.concat(blog.author);
  }

  // Counting the blogs written by the user
  authorsArray.forEach((author) => {
    authorCount[author] = (authorCount[author] || 0) + 1;
  });
  // Checking for the highest value in the author count object
  blogs = Math.max(...Object.values(authorCount));
  author = findValue(authorCount, blogs);
  return { blogs, author };
};

// Method for finding the author who has highest likes in his blogs 
const mostLikes = (blogArray) => {
  let authorsArray = [];
  const likesCount = {};
  let author = "";
  let blogs = 0;

  // Saving the names of the authors of the blogs in array and removing any duplicates
  for (const blog of blogArray) {
    authorsArray = authorsArray.concat(blog.author);
    authorsArray = [...new Set(authorsArray)];
  }

  // Using for loop inside a for each loop for doing like counts according to author in the blog
  authorsArray.forEach((author) => {
    for (const blog of blogArray) {
      if (blog.author === author) {
        likesCount[author] = (likesCount[author] || 0) + blog.likes;
      }
    }
  });

  // Checking for the highest value in the author count object
  blogs = Math.max(...Object.values(likesCount));
  author = findValue(likesCount, blogs);
  return { blogs, author };
};

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };
