import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders blog title and author', () => {
  const blog = {
    title: 'Blog testing',
    author: 'Anish',
    url : 'blogtesting.com'
  }
  render(<Blog blog={blog}/>)

  const element = screen.getByText('Blog testing Anish')
  expect(element).toBeDefined()
})

test('renders blog url and likes when button is clicked', async () => {
  const blog = {
    title: 'Blog testing',
    author: 'Anish',
    url : 'blogtesting.com',
    likes: 7
  }
  render(<Blog blog={blog}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText('blogtesting.com')
  const likes = screen.getByText('7', { exact : false })
  expect(url).toBeDefined()
  expect(likes).toBeDefined()


})