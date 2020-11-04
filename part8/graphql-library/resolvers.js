const { UserInputError, PubSub } = require('apollo-server')
const Author = require('./models/authors')
const Book = require('./models/books')
const User = require('./models/users')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => {
      return (await Book.find({})).length
    },
    authorCount: async () => {
      return (await Author.find({})).length
    },
    allAuthors: async () => {
      return Author.find({})
    },
    allBooks: async (root, args) => {
      try {
        if (args.author && args.genre) {
          return (
            await Book.find({ genres: args.genre }).populate('author', null, {
              name: args.author,
            })
          ).filter((book) => book.author)
        }
        if (args.author) {
          return (
            await Book.find().populate('author', null, {
              name: args.author,
            })
          ).filter((book) => book.author)
        }
        if (args.genre) {
          return await Book.find({ genres: args.genre }).populate('author')
        }
        return Book.find({})
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args })
      }
    },
    me: async (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      try {
        if (!context.currentUser) {
          throw new Error('Wrong or absent token')
        }
        const newBook = new Book({ ...args })
        const authorExists = await Author.findOne({ name: args.author })
        if (!authorExists) {
          const newAuthor = new Author({ name: args.author })
          newBook.author = newAuthor.id
          await newAuthor.save()
          pubsub.publish('AUTHOR_ADDED', { authorAdded: newAuthor })
        } else {
          newBook.author = authorExists.id
        }
        await newBook.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
        return newBook
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args })
      }
    },
    editAuthor: async (root, args, context) => {
      try {
        if (!context.currentUser) {
          throw new Error('Wrong or absent token')
        }
        return await Author.findOneAndUpdate(
          { name: args.author },
          { name: args.author, born: args.setBornTo },
          { new: true }
        )
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args })
      }
    },
    createUser: async (root, args) => {
      try {
        const newUser = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        })
        return newUser.save()
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== '1234') {
        throw new UserInputError('Wrong credentials')
      }
      return {
        value: jwt.sign({ username: user.username, id: user._id }, JWT_SECRET),
      }
    },
    clearMongo: async () => {
      try {
        await Author.remove({})
        await Book.remove({})
        await User.remove({})
      } catch (e) {
        throw new Error(e.message)
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
    authorAdded: {
      subscribe: () => pubsub.asyncIterator(['AUTHOR_ADDED']),
    },
  },

  Author: {
    bookCount: async (root, _, context) => {
      return context.booksLoader.load(root._id)
    },
  },
  Book: {
    author: async (root) => {
      const res = await Author.findOne({ _id: root.author })
      return res
    },
  },
}

module.exports = resolvers
