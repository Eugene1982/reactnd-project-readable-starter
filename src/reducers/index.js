import { combineReducers } from 'redux'
import { BY_VOTE_SCORE, VOTE_UP, VOTE_DOWN } from '../utils/constants';
import _ from 'lodash'

import {
  GET_CATEGORIES,
  GET_POSTS,
  GET_POSTS_BY_CATEGORY,
  SORT_POSTS,
  ADD_POST,
  GET_POST,
  UPDATE_POST,
  DELETE_POST,
  VOTE_POST_UP,
  VOTE_POST_DOWN,
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  VOTE_COMMENT_UP,
  VOTE_COMMENT_DOWN
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
    case VOTE_POST_UP:
      return state.map((item, index) => {
        if (item.id !== action.post.id) {
          return item
        }
        item.voteScore = action.post.voteScore
        return item
      })
    case VOTE_POST_DOWN:
      return state.map((item, index) => {
        if (item.id !== action.post.id) {
          return item
        }
        item.voteScore = action.post.voteScore
        return item
      })
    case ADD_POST:
      return [...state, action.post]
    case UPDATE_POST://move to separate function
      return state.map((item, index) => {
        if (item.id !== action.post.id) {
          return item
        }
        return { ...item, ...action.post }
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
      return { isDeleted: true }
    case VOTE_POST_UP:
      return action.post
    case VOTE_POST_DOWN:
      return action.post
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
      return _.orderBy(action.comments, 'voteScore', 'desc')
    case DELETE_COMMENT:
      return state.filter((item) => item.id !== action.commentId)
    case ADD_COMMENT:
      return [...state, action.comment]
    case EDIT_COMMENT:
      return state.map((item, index) => {
        if (item.id !== action.comment.id) {
          return item
        }
        return { ...item, ...action.comment }
      })
    case VOTE_COMMENT_UP:
      return _.orderBy(state.map((item, index) => {
        if (item.id !== action.comment.id) {
          return item
        }
        item.voteScore = action.comment.voteScore
        return item
      }), 'voteScore', 'desc') 
    case VOTE_COMMENT_DOWN:
      return  _.orderBy(state.map((item, index) => {
        if (item.id !== action.comment.id) {
          return item
        }
        item.voteScore = action.comment.voteScore
        return item
      }), 'voteScore', 'desc') 
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

