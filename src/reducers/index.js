import { combineReducers } from 'redux'

import {
  GET_CATEGORIES,
  GET_POSTS,
  GET_POSTS_BY_CATEGORY
} from '../actions'

function categories(state = [], action) {
  const { categories } = action
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

function posts(state = [], action) {
  switch (action.type) {
    case GET_POSTS:
      return action.posts
    default:
      return state
  }
}

function postsByCategory(state = {}, action) {
  switch (action.type) {
     case GET_POSTS_BY_CATEGORY:
       return action.category
    default:
      return state
  }
}

const rootReducer = combineReducers({
  categories,
  posts,
  postsByCategory
})

export default rootReducer

