import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPostDetail } from '../actions'

class PostDetail extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchPostDetail(this.props.postId))
    }

    render() {
       const { post } = this.props
        return (
            <div>
                <h3 className='subheader'>
                    <div>Post Detail {post.id}</div>
                    <div>Title: {post.title}</div>
                    <div> Body: {post.body}</div>
                    <div>Vote: {post.voteScore}</div>
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