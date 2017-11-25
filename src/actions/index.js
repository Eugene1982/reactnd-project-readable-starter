import * as ReadableAPI from '../utils/ReadableAPI'
import _ from 'lodash'

export const GET_POSTS = 'GET_POSTS'
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const SORT_POSTS = 'SORT_POSTS'
export const ADD_POST = 'ADD_POST'
export const GET_POST = 'GET_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const GET_COMMENTS = 'GET_COMMENTS'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function getCategories(categories) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function getPosts(posts) {
  return {
    type: GET_POSTS,
    posts
  }
}

export function getPostsByCategory(category) {
  return {
    type: GET_POSTS_BY_CATEGORY,
    category
  }
}

export function sortPostsBy(sortBy) {
  return {
    type: SORT_POSTS,
    sortBy
  }
}

//API async fetchers. redux-thunk helps to conect them as actions
export function fetchCategories() {
  return dispatch => {
    ReadableAPI.getCategories().then(categories => {
      dispatch(getCategories(categories))
    })
  }
}

export function fetchPosts() {
  return dispatch => {
    ReadableAPI.getPosts().then(posts => {
      dispatch(getPosts(posts))
    })
  }
}

export function addPost(post) {
  return dispatch => {
    ReadableAPI.addPost(post).then(p => {
      dispatch({
        type: ADD_POST,
        post: p
      })
    })
  }
}

export function updatePost(post) {
  return dispatch => {
    ReadableAPI.updatePost(post.id, post).then(p => {
      dispatch({
        type: UPDATE_POST,
        post: p
      })
    })
  }
}

export function fetchPostDetail(postId) {
  return dispatch => {
    ReadableAPI.getPost(postId).then(p => {
      dispatch({
        type: GET_POST,
        post: p
      })
    })
  }
}

export function deletePost(postId) {
  return dispatch => {
    ReadableAPI.deletePost(postId).then(p => {
      dispatch({
        type: DELETE_POST,
        postId: p.id
      })
    })
  }
}

export function fetchComments(postId) {
  return dispatch => {
    ReadableAPI.getComments(postId).then(comments => {
      dispatch({
        type: GET_COMMENTS,
        comments: _.orderBy(comments, 'voteScore', 'desc')
      })
    })
  }
}


export function deleteComent(commentId) {
  return dispatch => {
    ReadableAPI.deleteComment(commentId).then(c => {
      dispatch({
        type: DELETE_COMMENT,
        commentId: c.id
      })
    })
  }
}


export function saveComent(commentId) {
  return dispatch => {
    
    ReadableAPI.deleteComment(commentId).then(c => {
      dispatch({
        type: DELETE_COMMENT,
        commentId: c.id
      })
   
    })
  }
}

