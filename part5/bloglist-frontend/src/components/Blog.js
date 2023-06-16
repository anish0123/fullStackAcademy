import { useState } from "react";

const Blog = ({ blog, editBlog }) => {
  const [detailVisibility, setDetailVisibility] = useState(false);

  const toggleVisibility = () => {
    setDetailVisibility(!detailVisibility);
  };

  const blogStyle = {
    border: "solid",
    marginTop: 10,
    padding: 5,
    fontSize: 20,
  };

  const updateBlog = (event) => {
    event.preventDefault();
    blog.likes = blog.likes++;
    editBlog(blog)
  }

  const smallDetails = () => (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} style={{ marginLeft: 15 }}>
          view
        </button>
      </div>
    </div>
  );

  const fullDetails = () => (
    <div style={blogStyle}>
      <div>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility} style={{ marginLeft: 15 }}>
            hide
          </button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={updateBlog}>likes</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  );

  return <div>{detailVisibility ? fullDetails() : smallDetails()}</div>;
};

export default Blog;
