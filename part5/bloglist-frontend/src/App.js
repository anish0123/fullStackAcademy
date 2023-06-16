import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/TogglableComponent";
import BlogForm from "./components/NoteForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, SetUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    console.log("working ");
    console.log("update", update);
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [update]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      SetUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      SetUser(user);
      setUsername("");
      setPassword("");
      setMessage("Login successful");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const logOut = () => {
    SetUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.createBlog(blogObject);
      console.log("addblog", response);
      setUpdate(!update);
      setMessage(
        `a new Blog ${blogObject.title} by ${blogObject.author} added`
      );
      setErrorMessage(null);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Blog could not be  added");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const editBlog = async (blogObject) => {
    try {
      const editedBlog = await blogService.updateBlog(blogObject);
      console.log("editedBlog", editedBlog);
      setUpdate(!update);
    } catch (exception) {
      console.log("editing blog error", exception);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const deleteBlog = await blogService.deleteBlog(id);
      console.log("deleteBlog", deleteBlog);
      setUpdate(!update);
    } catch (exception) {
      console.log("editing blog error", exception);
    }
  };

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification message={message} errorMessage={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );

  const blogsDisplay = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={message} errorMessage={errorMessage} />
      {user && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={logOut}>logout</button>
          </p>
        </div>
      )}
      <Togglable buttonLabel="new blog">
        <BlogForm submitForm={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} editBlog={editBlog} deleteBlog={deleteBlog}/>
      ))}
    </div>
  );

  return <div>{user === null ? loginForm() : blogsDisplay()}</div>;
};

export default App;
