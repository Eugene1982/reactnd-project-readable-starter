import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import AddEditControl from './addeditcontrol'
import Comments from './comments'
import CommentsAmount from './commentsamount'
import VoteControl from './votecontrol'
import { getPostDetail, getComments, addComment, updateComment, deleteComment, voteComment } from '../actions'
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
        this.props.onUpdatePost(updatedPost);
        this.closeModal()
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
                    <button onClick={() => this.props.onDeletePost(post.id)}>Delete Post</button>
                </div>
                <div className='post-detail'>
                    <div className="detail-title">{post.title}</div>
                    <div className="detail-body">{post.body}</div>
                    <div className="detail-time">{dateTime}</div>
                    <div className="detail-vote">Comments Nr:  <CommentsAmount postId={post.id}/> </div>
                    <div className="detail-vote">Vote: {post.voteScore}</div>
                </div>
                <VoteControl currentId={post.id} onVote={this.props.onPostVote} />
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