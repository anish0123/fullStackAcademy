import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ submitForm }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    submitForm({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{' '}
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={(event) => setTitle(event.target.value)}
            placeholder='Title'
          />
        </div>
        <div>
          author:{' '}
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={(event) => setAuthor(event.target.value)}
            placeholder='Author'
          />
        </div>

        <div>
          url:{' '}
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={(event) => setUrl(event.target.value)}
            placeholder='Url'
          />
        </div>
        <div>
          <button id="addBlog-button" type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
}

export default BlogForm
