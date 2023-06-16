import { useState } from "react";

const Blog = ({ blog }) => {
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
          likes {blog.likes} <button>likes</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  );

  return <div>{detailVisibility ? fullDetails() : smallDetails()}</div>;
};

export default Blog;
