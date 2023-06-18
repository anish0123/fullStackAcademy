import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

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