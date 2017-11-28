import * as ReadableAPI from '../utils/ReadableAPI'

import {
  VOTE_UP,
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
} from '../utils/constants'

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

export function getCategories() {
  return dispatch => {
    ReadableAPI.getCategories().then(categories => {
      dispatch({
        type: GET_CATEGORIES,
        categories
      })
    })
  }
}

export function getPosts() {
  return dispatch => {
    ReadableAPI.getPosts().then(posts => {
      dispatch({
        type: GET_POSTS,
        posts
      })
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

export function votePost(id, vote) {
  return dispatch => {
    ReadableAPI.votePost(id, vote).then(p => {
      dispatch({
        type: vote === VOTE_UP ? VOTE_POST_UP : VOTE_POST_DOWN,
        post: p
      })
    })
  }
}

export function getPostDetail(postId) {
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

export function getComments(postId) {
  return dispatch => {
    ReadableAPI.getComments(postId).then(comments => {
      dispatch({
        type: GET_COMMENTS,
        comments: comments
      })
    })
  }
}

export function deleteComment(commentId) {
  return dispatch => {
    ReadableAPI.deleteComment(commentId).then(c => {
      dispatch({
        type: DELETE_COMMENT,
        commentId: c.id
      })
    })
  }
}

export function updateComment(comment) {
  return dispatch => {
    ReadableAPI.editComment(comment.id, comment).then(c => {
      dispatch({
        type: EDIT_COMMENT,
        comment: c
      })
    })
  }
}

export function addComment(comment) {
  return dispatch => {
    ReadableAPI.addComment(comment).then(c => {
      dispatch({
        type: ADD_COMMENT,
        comment: c
      })
    })
  }
}

export function voteComment(id, vote) {
  return dispatch => {
    ReadableAPI.voteComment(id, vote).then(c => {
      dispatch({
        type: vote === VOTE_UP ? VOTE_COMMENT_UP : VOTE_COMMENT_DOWN,
        comment: c
      })
    })
  }
}

