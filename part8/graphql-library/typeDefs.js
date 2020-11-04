const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int
  }

  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String]
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(author: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String): User
    login(username: String!, password: String!): Token
    clearMongo: Int
  }

  type Subscription {
    bookAdded: Book!
    authorAdded: Author!
  }
`
module.exports = typeDefs
