import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPostDetail, fetchComments } from '../actions'
import Modal from 'react-modal'
import AddEditControl from './addeditcontrol'
import Comments from './comments'
import { updatePost, deletePost } from '../actions'
import { Redirect } from 'react-router-dom';

class PostDetail extends Component {

    state = {
        editModalOpen: false
    }

    componentDidMount() {
        const { dispatch, postId } = this.props
        dispatch(fetchPostDetail(postId))
        dispatch(fetchComments(postId))
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

    }

    onSaveComment = (commentId) => {

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
                <h3 className='subheader'>
                    <div>Post Detail: {dateTime}</div>
                    <div>Title: {post.title}</div>
                    <div> Body: {post.body}</div>
                    <div>Vote: {post.voteScore}</div>
                </h3>
                <br/>
               <Comments list={comments} onDeleteComment={this.onDeleteComment}/>


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