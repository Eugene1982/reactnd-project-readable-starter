import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import SortControl from './sortcontrol'
import VoteControl from './votecontrol'
import AddEditControl from './addeditcontrol'
import CommentsAmount from './commentsamount'

class Posts extends Component {

  state = {
    editModalOpen: false,
    editPost: null
  }

  openModal = (post) => this.setState(() => ({ editModalOpen: true, editPost: post }))
  closeModal = () => this.setState(() => ({ editModalOpen: false, editPost: null }))

  updatePost = (updatedPost) => {
    this.props.onUpdatePost(updatedPost);
    this.closeModal()
  }

  render() {
    const { list, onSortPostsBy, onPostVote } = this.props;
    const { editModalOpen } = this.state

    if (list.length === 0) {
      return <p>Your search has 0 results.</p>
    }

    return (
      <div className='posts-list'>
        <h3 className='subheader'>
          Posts
        </h3>
        <SortControl onSortBy={onSortPostsBy} />
        <ul>
          {list.map((item) => (
            <li key={item.id} >
              <Link to={`/${item.category}/${item.id}`}> {item.title}</Link>
              <div>
                <button onClick={() => this.openModal(item)}>Edit Post</button>
                <button onClick={() => this.props.onDeletePost(item.id)}>Delete Post</button>
              </div>
              <div className="detail-vote">Score: {item.voteScore}</div>
              <div className="detail-vote">Comments Nr: <CommentsAmount postId={item.id}/> </div>
              <div className="detail-vote">Author: {item.author}</div>
              <VoteControl currentId={item.id} onVote={onPostVote} />
            </li>
          ))}
        </ul>
        <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={editModalOpen}
                onRequestClose={this.closeModal}
                contentLabel='Modal'
              >
                {editModalOpen && <AddEditControl savePost={this.updatePost} post={this.state.editPost} />}
              </Modal>
      </div>
    )
  }
}

export default Posts