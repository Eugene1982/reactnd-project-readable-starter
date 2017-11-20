import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal'
import _ from 'lodash'
import './App.css';
import Categories from './categories'
import Posts from './posts'
import AddEditControl from './addeditcontrol'
import { BY_VOTE_SCORE, BY_TIME_STAMP, NONE } from '../utils/constants'
import { fetchCategories, fetchPosts, getPostsByCategory, sortPostsBy, addPost } from '../actions'

class App extends Component {

  state = {
    addModalOpen : false,
    category: {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCategories())
    dispatch(fetchPosts())
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

  selectCategory = (category) => {
    const { dispatch } = this.props
    this.setState(() => ({category : category}))
    dispatch(getPostsByCategory(category))
    dispatch(sortPostsBy(BY_VOTE_SCORE))//?
  }

  createPost = (post) => {
    const { dispatch} = this.props
    const {body, title, author} = post
    
    dispatch(addPost({
      id: _.uniqueId(),
      title: title,
      body: body,
      category: this.state.category,
      author : author,
      timestamp:  Date.now()
    }))

    this.closeModal()
  }

  render() {
   const {addModalOpen} = this.state

    return (
      <div>
        <Route exact path="/" render={() => (
          <div>
            <Categories categories={this.props.categories} onSelect={this.selectCategory} activeCategory={this.state.category}/>
            
            <div>
            <div className='nav'>
              <button
                className='shopping-list'
                onClick={this.openModal}>
                Add Post
               </button>
            </div>

            <Posts list={this.props.posts} onSortPostsBy={this.onSortPostsBy} />
            </div>
          </div>
        )} />

        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={addModalOpen}
          onRequestClose={this.closeModal}
          contentLabel='Modal'
        >
          {addModalOpen && <AddEditControl savePost={this.createPost}/>}
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
};

export default connect(
  mapStateToProps
)(App)
