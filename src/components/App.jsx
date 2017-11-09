import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import Categories from './categories'
import Posts from './posts'
import { fetchCategories, fetchPosts, getPostsByCategory } from '../actions'

import * as ReadableAPI from '../utils/ReadableAPI'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(fetchCategories())
    this.props.dispatch(fetchPosts())
  }

  postsByCategory = (category) => {
    return this.state.posts.filter(post => post.category === category)
  }

  selectCategory = (category) => {
    this.props.dispatch(getPostsByCategory(category))
  }

  render() {
    return (
      <div>
        <Categories categories={this.props.categories} onSelect={this.selectCategory} />
        <Posts list={this.props.posts} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { categories, posts, postsByCategory } = state
  if (!Object.keys(postsByCategory).length) {
    return {
      categories,
      posts
    }
  }
  return {
    categories,
    posts: posts.filter(post => post.category == postsByCategory)
  }
};


export default connect(
  mapStateToProps
)(App)
