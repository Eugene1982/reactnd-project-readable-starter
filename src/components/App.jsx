import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import Categories from './categories'
//import Posts from './posts'
import { fetchCategories } from '../actions'

import * as ReadableAPI from '../utils/ReadableAPI'


class App extends Component {

  componentDidMount() {
    this.props.dispatch(fetchCategories())
  }

  selectCategory = (category) => {
    /* this.setState(() => ({
        posts: this.getPostsByCategory(category) 
       }))*/

  }


  render() {
    return (
      <Categories categories={this.props.categories} onSelect={this.selectCategory} />
    )
  }
}

const mapStateToProps = (state) => {
  const { categories } = state
  return {
    categories
  }
};

/*
const mapDispatchToProps =  (dispatch) => {
  return {
    getPostsByCategory: (data) => dispatch(getPosts({category: data})),
    loadCategories:  (categories) => dispatch(getCategories(categories))
  }
}*/

export default connect(
  mapStateToProps/*,
  mapDispatchToProps*/
)(App)
