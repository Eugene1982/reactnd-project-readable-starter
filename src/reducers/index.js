import { combineReducers } from 'redux'
import { BY_VOTE_SCORE } from '../utils/constants';

import {
  GET_CATEGORIES,
  GET_POSTS,
  GET_POSTS_BY_CATEGORY,
  SORT_POSTS,
  ADD_POST,
  GET_POST,
  UPDATE_POST,
  DELETE_POST,
  GET_COMMENTS,
  DELETE_COMMENT
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
    case ADD_POST:
      return [...state, action.post]
    case UPDATE_POST://move to separate function
      return state.map((item, index) => {
        if(item.id !== action.post.id){
          return item
        }
        return {...item, ...action.post}
      })
     case DELETE_POST:
       return state.filter((item) => item.id !== action.postId)
    default:
      return state
  }
}

function post(state = {}, action) {
  switch (action.type) {
    case GET_POST:
      return action.post
    case UPDATE_POST:
      return action.post
    case DELETE_POST:
       return {isDeleted : true}
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

function comments(state = [], action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.comments
    case DELETE_COMMENT:
      return state.filter((item) => item.id !== action.commentId)  
    default:
      return state
  }
}

const rootReducer = combineReducers({
  categories,
  posts,
  post,
  selectCategory,
  sortPostsBy,
  comments
})

export default rootReducer

