import * as ReadableAPI from '../utils/ReadableAPI'

export const GET_POSTS = 'GET_POSTS'
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const SORT_POSTS = 'SORT_POSTS'
export const ADD_POST = 'ADD_POST'
export const GET_POST = 'GET_POST'

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
