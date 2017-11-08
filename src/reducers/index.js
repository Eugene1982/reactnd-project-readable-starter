import { combineReducers } from 'redux'

import {
   GET_CATEGORIES,
   GET_POSTS
} from '../actions'

function categories (state = [], action) {
  const { categories } = action
  switch (action.type) {
    case GET_CATEGORIES :
           return action.categories
    default :
      return state
  }
}

function posts (state = {}, action) {
  switch (action.type) {
    case GET_POSTS :
      return action.getState().filter(post => post.category == action.category)
    default :
      return state
  }
}

const rootReducer = combineReducers({
  categories
})

export default rootReducer

