import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCommentsAmount } from '../actions'

class CommentsAmount extends Component {
    componentDidMount() {
        const { dispatch, postId } = this.props
        dispatch(getCommentsAmount(postId))
    }

    render() {
        const { commentsAmount, postId } = this.props
        
        return <div>{commentsAmount[postId] !== undefined ? commentsAmount[postId]: 0}</div>
    }
}

const mapStateToProps = (state) => {
    const { commentsAmount } = state
    return {
        commentsAmount: commentsAmount
    }
};

export default connect(mapStateToProps)(CommentsAmount)