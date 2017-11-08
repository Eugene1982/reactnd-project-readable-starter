import React, { Component } from 'react';
import Posts from './posts'
import { connect } from 'react-redux'

class Categories extends Component {
 
 render(){
  const { categories, onSelect } = this.props
  if (categories && categories.length === 0) {
    return <p>Your search has 0 results.</p>
  }
  return (
   <div className='categories-list'>
      <h3 className='subheader'>
        Categories
      </h3>
      <ul>
        {categories && categories.map((item) => (
          <li key={item.name} onClick={() => onSelect(item.path)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
}

/*function mapStateToProps (state) {
  return {
    categories: state
  }
}
*/

export default Categories