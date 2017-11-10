import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import _ from 'lodash'
import './App.css';
import Categories from './categories'
import Posts from './posts'
import {BY_VOTE_SCORE, BY_TIME_STAMP, NONE} from '../utils/constants'
import { fetchCategories, fetchPosts, getPostsByCategory, sortPostsBy } from '../actions'

class App extends Component {

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(fetchCategories())
    dispatch(fetchPosts())
  }

  postsByCategory = (category) => {
    const {posts} = this.state
    return posts.filter(post => post.category === category)
  }

  onSortPostsBy = (sortBy) => {
    const {dispatch} = this.props
    dispatch(sortPostsBy(sortBy))
  }

  selectCategory = (category) => {
    const {dispatch} = this.props
    dispatch(getPostsByCategory(category))
    dispatch(sortPostsBy(BY_VOTE_SCORE))//?
  }
  
  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <div>
            <Categories categories={this.props.categories} onSelect={this.selectCategory} />
            <Posts list={this.props.posts} onSortPostsBy={this.onSortPostsBy}/>
          </div>
        )} />
      </div>
    )
  }
}

const applyFilteringAndSorting = (posts, category, sortBy) => {
  let _posts = posts;
  if (Object.keys(category).length){
        _posts = _posts.filter(post => post.category === category) 
  }
  if(sortBy !== NONE){
      _posts = _.orderBy(_posts, sortBy, 'desc')
  }

  return _posts;
}

const mapStateToProps = (state) => {
  const { categories, posts, selectCategory, sortPostsBy } = state
    return {
      categories,
      posts : applyFilteringAndSorting(posts, selectCategory, sortPostsBy)
    }
};

export default connect(
  mapStateToProps
)(App)
