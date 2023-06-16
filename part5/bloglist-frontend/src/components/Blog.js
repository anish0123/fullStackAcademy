import { useState } from "react";

const Blog = ({ blog }) => {
  const [detailVisibility, setDetailVisibility] = useState(false);
  console.log(blog.user)

  const toggleVisibility = () => {
    setDetailVisibility(!detailVisibility);
  };

  const smallDetails = () => (
    <div>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>view</button>
    </div>
  );

  const fullDetails = () => (
    <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
      <br/>
      {blog.url}
      <br/>
      likes {blog.likes}
      <br/>
      {blog.user}
    </div>
  );

  return <div>{detailVisibility ? fullDetails() : smallDetails()}</div>;
};

export default Blog;
