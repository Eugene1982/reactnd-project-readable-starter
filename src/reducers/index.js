import { combineReducers } from 'redux'

import categories from './categories'
import posts from './posts'
import post from './post'
import selectCategory from './selectcategory'
import sortPostsBy from './sortpostsby'
import comments from './comments'
import commentsAmount from './commentsamount'

const rootReducer = combineReducers({
  categories,
  posts,
  post,
  selectCategory,
  sortPostsBy,
  comments,
  commentsAmount
})

export default rootReducer

