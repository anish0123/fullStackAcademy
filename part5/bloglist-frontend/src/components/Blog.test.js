import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('renders blog title and author', () => {
  const blog = {
    title: 'Blog testing',
    author: 'Anish',
    url: 'blogtesting.com',
    likes: 7,
  }
  render(<Blog blog={blog} />)

  const element = screen.getByText('Blog testing Anish')
  const likes = screen.queryByText('7')
  const url = screen.queryByText('blogtesting.com')
  expect(element).toBeDefined()
  expect(likes).toBeNull()
  expect(url).toBeNull()
})

describe('testing the togglable component', () => {
  const mockHandler = jest.fn()
  beforeEach(() => {
    const blog = {
      title: 'Blog testing',
      author: 'Anish',
      url: 'blogtesting.com',
      likes: 7,
      user: '6488a1e3d0515570c2006b72',
    }

    render(<Blog blog={blog} editBlog={mockHandler} />)
  })

  test('renders blog url and likes when button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const element = screen.getByText('Blog testing Anish')
    const url = screen.getByText('blogtesting.com')
    const likes = screen.getByText('7', { exact: false })
    expect(element).toBeDefined()
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('like button is pressed twice, the props is called twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('likes')

    for(let i= 0; i<2;i++) {
      await user.click(likeButton)
    }

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})

describe('test for the new blog form', () => {
  test('<BlogForm /> takes right details and calls correct event handler', async () => {
    const submitForm = jest.fn()
    const user = userEvent.setup()
    render(<BlogForm submitForm={submitForm}/>)

    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen.getByPlaceholderText('Url')
    const createBtn = screen.getByText('create')
    await user.type(titleInput, 'testing a blog form...')
    await user.type(authorInput, 'anish')
    await user.type(urlInput, 'blogtest.com')
    await user.click(createBtn)

    expect(submitForm.mock.calls).toHaveLength(1)
    expect(submitForm.mock.calls[0][0].author).toBe('anish')
    expect(submitForm.mock.calls[0][0].title).toBe('testing a blog form...')
    expect(submitForm.mock.calls[0][0].url).toBe('blogtest.com')
  })
})
