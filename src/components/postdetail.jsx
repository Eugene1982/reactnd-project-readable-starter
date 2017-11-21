import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPostDetail } from '../actions'

class PostDetail extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchPostDetail(this.props.postId))
    }

    render() {
    
        return (
            <div>
                <h3 className='subheader'>
                    <div>Post Detail {this.props.postId}</div>
                    <div>Title: {this.props.title}</div>
                    <div> Body: {this.props.body}</div>
                    <div>Author: {this.props.author}</div>
                    <div>Vote: {this.props.voteScore}</div>
        </h3>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { post } = state
    return {
        post: post
    }
};


export default connect(mapStateToProps)(PostDetail)