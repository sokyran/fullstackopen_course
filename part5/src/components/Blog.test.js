import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, act } from '@testing-library/react'
import BlogForm from './BlogForm'
import Blog from './Blog'

test('blog is rendered with title, author but not likes', () => {
  const blog = {
    title: 'test title',
    author: 'John',
    likes: 10,
    user: {
      name: 'asdasd',
      id: 'asdadasd',
    },
  }

  const component = render(<Blog blog={blog} />)

  const title = component.container.querySelector('.testTitle')
  const author = component.container.querySelector('.testAuthor')
  const hidden = component.container.querySelector('.testHidden')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(hidden).toHaveStyle('display: none')
})

test('hidden content is show after click', () => {
  const blog = {
    title: 'test title',
    author: 'John',
    likes: 10,
    user: {
      name: 'asdasd',
      id: 'asdadasd',
    },
  }

  const component = render(<Blog blog={blog} />)

  const hidden = component.container.querySelector('.testHidden')
  const showBtn = component.container.querySelector('.clickToShow')
  fireEvent.click(showBtn)

  expect(hidden).not.toHaveStyle('display: none')
})

test('clicking the button calls event handler once', () => {
  const blog = {
    title: 'test title',
    author: 'John',
    likes: 10,
    user: {
      name: 'asdasd',
      id: 'asdadasd',
    },
  }
  const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} updateBlog={mockHandler} />)

  const showBtn = component.container.querySelector('.clickToLike')
  fireEvent.click(showBtn)
  fireEvent.click(showBtn)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('BlogForm updates parent state and calls onSumbit', () => {
  const addBlog = jest.fn()
  const setColor = jest.fn()
  const makeMessage = jest.fn()

  let component

  act(() => {
    component = render(
      <BlogForm
        makeMessage={makeMessage}
        addBlog={addBlog}
        setColor={setColor}
      />
    )
  })

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  act(() => {
    fireEvent.change(title, {
      target: { value: 'testing of forms could be easier' },
    })
    fireEvent.change(author, {
      target: { value: 'testing of forms could be easier' },
    })
    fireEvent.change(url, {
      target: { value: 'testing of forms could be easier' },
    })
  })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)

  expect(addBlog.mock.calls[0][0].title).toBe(
    'testing of forms could be easier'
  )
})
