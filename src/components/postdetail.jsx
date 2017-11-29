import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import AddEditControl from './addeditcontrol'
import Comments from './comments'
import VoteControl from './votecontrol'
import { getPostDetail, getComments, updatePost, deletePost, votePost, addComment, updateComment, deleteComment, voteComment } from '../actions'
import { Redirect } from 'react-router-dom';

class PostDetail extends Component {
    state = {
        editModalOpen: false
    }

    componentDidMount() {
        const { dispatch, postId } = this.props
        dispatch(getPostDetail(postId))
        dispatch(getComments(postId))
    }

    openModal = () => this.setState(() => ({ editModalOpen: true }))
    closeModal = () => this.setState(() => ({ editModalOpen: false }))

    updatePost = (updatedPost) => {
        const { dispatch, post } = this.props
        const { id, body, title, author } = updatedPost

        dispatch(updatePost({
            id: id,
            title: title,
            body: body,
            category: post.category,
            author: author,
            timestamp: Date.now()
        }))

        this.closeModal()
    }

    deletePost = (e) => {
        const { dispatch, post } = this.props
        e.preventDefault()
        dispatch(deletePost(post.id))
    }

    onDeleteComment = (commentId) => {
        const { dispatch } = this.props
        dispatch(deleteComment(commentId))
    }

    onUpdateComment = (comment) => {
        const { dispatch } = this.props
        dispatch(updateComment(comment))
    }

    onAddComment = (comment) => {
        const { dispatch } = this.props
        dispatch(addComment(comment))
    }

    onPostVote = (id, vote) => {
        const { dispatch } = this.props
        dispatch(votePost(id, vote))
    }

    onCommentVote = (id, vote) => {
        const { dispatch } = this.props
        dispatch(voteComment(id, vote))
    }

    render() {
        const { post, comments } = this.props
        const { editModalOpen } = this.state

        if (post.isDeleted) {
            return <Redirect to={'/'} />
        }

        let dateTime = new Date(post.timestamp * 1000).toUTCString()
        return (
            <div>
                <div>
                    <button onClick={this.openModal}>Edit Post</button>
                    <button onClick={this.deletePost}>Delete Post</button>
                </div>
                <div className='post-detail'>
                    <div>Title: {post.title}</div>
                    <div>Body: {post.body}</div>
                    <div>Time: {dateTime}</div>
                    <div>Vote: {post.voteScore}</div>
                </div>
                <VoteControl currentId={post.id} onVote={this.onPostVote} />
                <br />
                <Comments list={comments} postId={post.id} onDeleteComment={this.onDeleteComment}
                    onUpdateComment={this.onUpdateComment} onAddComment={this.onAddComment} onCommentVote={this.onCommentVote} />

                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={editModalOpen}
                    onRequestClose={this.closeModal}
                    contentLabel='Modal'
                >
                    {editModalOpen && <AddEditControl savePost={this.updatePost} post={post} />}
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { post, comments } = state
    return {
        post: post,
        comments: comments
    }
};


export default connect(mapStateToProps)(PostDetail)