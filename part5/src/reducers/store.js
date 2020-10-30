import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogsReducer from './blogReducer'
import notificationReducer from './notificationReducer'
import visibilityReducer from './visibilityReducer'
import userReducer from './userReducer'
import usersReducer from './usersReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  visibility: visibilityReducer,
  user: userReducer,
  users: usersReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
