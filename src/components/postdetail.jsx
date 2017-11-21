import React, { Component } from 'react';

class PostDetail extends Component {
   render(){
    return (
     <div>
        <h3 className='subheader'>
          Post Detail {this.props.postId}
        </h3>
      </div>
    )
  }
}

export default PostDetail