import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, withRouter, Link } from 'react-router-dom';
import Modal from 'react-modal'
import _ from 'lodash'
import './App.css';
import Categories from './categories'
import Posts from './posts'
import PostDetail from './postdetail'
import AddEditControl from './addeditcontrol'
import { BY_VOTE_SCORE, NONE } from '../utils/constants'
import { getCategories, getPosts, getPostsByCategory, sortPostsBy, addPost, updatePost, deletePost, votePost } from '../actions'

const uuidv4 = require('uuid/v4');

class App extends Component {

  state = {
    addModalOpen: false,
    category: {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getCategories())
    dispatch(getPosts())
  }

  openModal = () => this.setState(() => ({ addModalOpen: true }))
  closeModal = () => this.setState(() => ({ addModalOpen: false }))

  postsByCategory = (category) => {
    const { posts } = this.state
    return posts.filter(post => post.category === category)
  }

  onSortPostsBy = (sortBy) => {
    const { dispatch } = this.props
    dispatch(sortPostsBy(sortBy))
  }

  //change mechanism to render with url  instead of dispatching
  selectCategory = (category) => {
    const { dispatch } = this.props
    this.setState(() => ({ category: category }))
    dispatch(getPostsByCategory(category))
    dispatch(sortPostsBy(BY_VOTE_SCORE))//?
  }

  createPost = (post) => {
    const { dispatch } = this.props
    const { body, title, author } = post

    dispatch(addPost({
      id: uuidv4(),
      title: title,
      body: body,
      category: this.state.category,
      author: author,
      timestamp: Date.now()
    }))

    this.closeModal()
  }

  updatePost = (updatedPost) => {
    const { dispatch } = this.props
    const { id, body, title, author } = updatedPost

    dispatch(updatePost({
      id: id,
      title: title,
      body: body,
      category: this.state.category,
      author: author,
      timestamp: Date.now()
    }))
  }

  deletePost = (postId) => {
    const { dispatch } = this.props
    dispatch(deletePost(postId))
  }

  onPostVote = (id, vote) => {
    const { dispatch } = this.props
    dispatch(votePost(id, vote))
  }

  render() {
    const { addModalOpen } = this.state

    return (
      <div>
        <Categories categories={this.props.categories} onSelect={this.selectCategory} activeCategory={this.state.category} />
        {Object.keys(this.state.category).length > 0 &&
          <div className='nav'>
            <button
              className='shopping-list'
              onClick={this.openModal}>
              Add Post
               </button>
          </div>
        }
        <Route path="/post/:category/:postId" render={(props) => (
          <div>
            <Link to="/">Return to posts</Link>
            <PostDetail postId={props.match.params.postId} onPostVote={this.onPostVote} onDeletePost={this.deletePost} onUpdatePost={this.updatePost} />
          </div>
        )} />
        <Route exact path="/" render={() => (
          <div>
            <Posts list={this.props.posts} onSortPostsBy={this.onSortPostsBy} onPostVote={this.onPostVote} onDeletePost={this.deletePost} onUpdatePost={this.updatePost} />
          </div>
        )} />

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={addModalOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'
        >
          {addModalOpen && <AddEditControl savePost={this.createPost} />}
        </Modal>
      </div>
    )
  }
}

const applyFilteringAndSorting = (posts, category, sortBy) => {
  let _posts = posts;
  if (Object.keys(category).length) {
    _posts = _posts.filter(post => post.category === category)
  }
  if (sortBy !== NONE) {
    _posts = _.orderBy(_posts, sortBy, 'desc')
  }

  return _posts;
}

const mapStateToProps = (state) => {
  const { categories, posts, selectCategory, sortPostsBy } = state
  return {
    categories,
    posts: applyFilteringAndSorting(posts, selectCategory, sortPostsBy)
  }
}

export default withRouter(connect(
  mapStateToProps
)(App))
