require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('./models/users')
const Book = require('./models/books')
const Author = require('./models/authors')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const DataLoader = require('dataloader')
const lodash = require('lodash')

const MONGODB_URL = process.env.MONGODB_URL
const JWT_SECRET = process.env.JWT_SECRET

console.log('connecting to', MONGODB_URL)

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let result = {}
    const booksLoader = new DataLoader(async (authorIds) => {
      const books = await Book.find({})
      const booksMap = lodash.countBy(books, 'author')
      return authorIds.map((key) => booksMap[key])
    })

    result.booksLoader = booksLoader

    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      result.currentUser = currentUser
    }
    return result
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
