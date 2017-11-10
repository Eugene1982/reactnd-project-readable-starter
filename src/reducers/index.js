import { combineReducers } from 'redux'
import {BY_VOTE_SCORE} from '../utils/constants';

import {
  GET_CATEGORIES,
  GET_POSTS,
  GET_POSTS_BY_CATEGORY,
  SORT_POSTS
} from '../actions'

function categories(state = [], action) {
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

function selectCategory(state = {}, action) {
  switch (action.type) {
     case GET_POSTS_BY_CATEGORY:
       return action.category
    default:
      return state
  }
}

function sortPostsBy(state = BY_VOTE_SCORE, action) {
  switch (action.type) {
     case SORT_POSTS:
       return action.sortBy
    default:
      return state
  }
}

const rootReducer = combineReducers({
  categories,
  posts,
  selectCategory,
  sortPostsBy
})

export default rootReducer

