import * as ReadableAPI from '../utils/ReadableAPI'

export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'


export function getCategories(categories) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function fetchCategories() {
    return dispatch => {
      ReadableAPI.getCategories().then(categories => {
         dispatch(getCategories(categories))
      })
  }
}


export function getPosts ({getState, category}) {
  return {
    type: GET_POSTS,
    getState,
    category
  }
}
