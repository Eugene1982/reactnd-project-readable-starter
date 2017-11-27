import React, { Component } from 'react';
import _ from 'lodash'
import VoteControl from './votecontrol'

class Comments extends Component {
    state = {
        editCommentId: null,
        addNew: false
    }

    onEditComment = (commentId) => {
        this.setState({ editCommentId: commentId, addNew: false })
    }

    onSaveComment = (item) => {
        item.body = this.refs.input.value
        this.props.onUpdateComment(item);
        this.setState({ editCommentId: null, addNew: false })
    }

    onSaveNewComment = () => {
        this.props.onAddComment({
            id: _.uniqueId(),
            parentId: this.props.postId,
            timestamp: Date.now(),
            body: this.refs.inputNewBody.value,
            author: this.refs.inputNewAuthor.value,
            voteScore: -1,
        });
        this.setState({ editCommentId: null, addNew: false })
    }

    addNewComment = () => {
        this.setState({ addNew: true })
    }

    render() {
        const { list } = this.props
        const { editCommentId, addNew } = this.state

        return (
            <div className='posts-list'>
                <h3 className='subheader'>
                    Comments
            </h3>
                <ul>
                    {list.length > 0 && list.map((item) => (
                        (editCommentId === item.id ? <li key={item.id} >
                            <input type="text" name="body" ref="input" defaultValue={item.body} /><button onClick={() => this.onSaveComment(item)}>Save</button>
                        </li>
                            : <li key={item.id}>
                                {item.body} Score: {item.voteScore} <button onClick={() => this.onEditComment(item.id)}>Edit</button>
                                <button onClick={() => this.props.onDeleteComment(item.id)}>Delete</button>
                                <VoteControl currentId={item.id} onVote={this.props.onCommentVote} />
                            </li>)

                    ))}
                </ul>
                <button onClick={() => this.addNewComment()}>Add New</button>
                {addNew && <div>
                    <input type="text" name="body" ref="inputNewBody" />
                    <input type="text" name="author" ref="inputNewAuthor" />
                    <button onClick={() => this.onSaveNewComment()}>Save</button>
                </div>}
            </div>
        )


    }
}

export default Comments