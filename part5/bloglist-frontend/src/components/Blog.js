import { useState } from "react";

const Blog = ({ blog }) => {
  const [detailVisibility, setDetailVisibility] = useState(false);

  const toggleVisibility = () => {
    setDetailVisibility(!detailVisibility);
  };

  const smallDetails = () => (
    <div style={{ border: "solid", marginTop: 10, padding: 5, fontSize: 20 }}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility} style={{marginLeft: 15}}>view</button>
    </div>
  );

  const fullDetails = () => (
    <div style={{ border: "solid", marginTop: 10, padding: 5 , fontSize: 20}} >
      {blog.title} {blog.author}
      <button onClick={toggleVisibility} style={{marginLeft: 15}}>hide</button>
      <br />
      {blog.url}
      <br />
      likes {blog.likes} <button>likes</button>
      <br />
      {blog.user.name}
    </div>
  );

  return <div>{detailVisibility ? fullDetails() : smallDetails()}</div>;
};

export default Blog;
