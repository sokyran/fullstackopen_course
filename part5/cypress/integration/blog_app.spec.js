describe(' Blog app ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    cy.request('POST', 'http://localhost:3001/api/users/', {
      name: 'Your majesty',
      username: 'admin',
      password: 'admin',
    })

    cy.visit('http://localhost:3000')
  })

  it('note page can be opened', function () {
    cy.contains('Blogs page')
  })

  it('login page is shown', function () {
    cy.contains('Login')
  })

  it('can log in', function () {
    cy.get('#username').type('admin')
    cy.get('#password').type('admin')
    cy.contains('Login').click()
    cy.contains('Signed in')
  })

  it('unsuccesful login met with an error', function () {
    cy.get('#username').type('admin')
    cy.get('#password').type('wrong')
    cy.contains('Login').click()
    cy.get('#message').contains('Wrong login')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedUser')).token
      }`,
    },
  })
})

describe('Afterlog', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    cy.request('POST', 'http://localhost:3001/api/users/', {
      name: 'Your majesty',
      username: 'admin',
      password: 'admin',
    })

    cy.request('POST', 'http://localhost:3001/api/users/', {
      name: 'dirty thief',
      username: 'thief',
      password: 'thief',
    })

    cy.request('POST', 'http://localhost:3001/api/login', {
      username: 'admin',
      password: 'admin',
    }).then(function (response) {
      console.log(response)
      localStorage.setItem('loggedUser', JSON.stringify(response.body))
    })

    cy.visit('http://localhost:3000')
  })

  it('login with localStorage is successful', function () {
    cy.contains('Signed in')
  })

  it('logged in user can create a blog', function () {
    cy.contains('create new blog').click()
    cy.get('#title').type('blog to be tested')
    cy.get('#author').type('blog to be tested')
    cy.get('#url').type('google.com')
    cy.get('button').contains('create').click()

    cy.get('#message').contains('was created')
    cy.get('.testBlog').contains('blog to be tested')
  })

  it('logged user can delete a blog', function () {
    cy.contains('create new blog').click()
    cy.get('#title').type('blog to be tested')
    cy.get('#author').type('blog to be tested')
    cy.get('#url').type('google.com')
    cy.get('button').contains('create').click()

    cy.get('.clickToShow').click()
    cy.get('button').contains('remove').click()
    cy.get('.testBlog').should('not.exist')
  })

  it('only owner can delete blog', function () {
    cy.contains('create new blog').click()
    cy.get('#title').type('blog to be tested')
    cy.get('#author').type('blog to be tested')
    cy.get('#url').type('google.com')
    cy.get('button').contains('create').click()

    cy.get('button').contains('logout').click()
    cy.get('#username').type('thief')
    cy.get('#password').type('thief')
    cy.contains('Login').click()

    cy.get('.clickToShow').click()
    cy.get('button').contains('remove').should('not.exist')
  })

  it(' blog are sorted in order of likes ', function () {
    cy.createBlog({
      title: 'last',
      author: 'me',
      url: 'www.google.com',
      likes: 213,
    })
    cy.createBlog({
      title: 'first',
      author: 'me',
      url: 'www.google.com',
      likes: 12311,
    })
    cy.createBlog({
      title: 'second',
      author: 'me',
      url: 'www.google.com',
      likes: 413,
    })

    cy.visit('http://localhost:3000')

    cy.get('.testBlog').then(function (list) {
      expect(list[0]).contain('first')
      expect(list[1]).contain('second')
      expect(list[2]).contain('last')
    })
  })
})
