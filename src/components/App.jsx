import React, { Component } from 'react';
import './App.css';
import Categories from './categories';
import * as ReadableAPI from '../utils/ReadableAPI'


class App extends Component {
  
  state = { 
    categories: []
  } 
 
  componentDidMount() {
    ReadableAPI.getCategories().then(categories => {
      this.setState({ categories })
    })
  }

  render() {
    return (
     <Categories list={this.state.categories}/>
    );
  }
}

export default App;
