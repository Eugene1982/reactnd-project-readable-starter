import React, { Component } from 'react';
import _ from 'lodash'
import VoteControl from './votecontrol'
import EditIcon from 'react-icons/lib/fa/edit'
import SaveIcon from 'react-icons/lib/fa/floppy-o'
import DeleteIcon from 'react-icons/lib/fa/trash'
import AddNewIcon from 'react-icons/lib/md/add'

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
                            <input type="text" name="body" ref="input" defaultValue={item.body} /><button onClick={() => this.onSaveComment(item)}><SaveIcon size={10} /></button>
                        </li>
                            : <li key={item.id}>
                                {item.body}
                                <button onClick={() => this.onEditComment(item.id)}><EditIcon size={10} /></button>
                                <button onClick={() => this.props.onDeleteComment(item.id)}><DeleteIcon size={10} /></button>
                                <div className="detail-vote">Vote: {item.voteScore}
                                    <VoteControl currentId={item.id} onVote={this.props.onCommentVote} />
                                </div>
                               
                            </li>)

                    ))}
                </ul>
                <button onClick={() => this.addNewComment()}><AddNewIcon size={20} /></button>
                {addNew && <div>
                    <input type="text" name="body" className="comment-editor" placeholder="Body" ref="inputNewBody" />
                    <input type="text" name="author" className="comment-editor" placeholder="Author" ref="inputNewAuthor" />
                    <button onClick={() => this.onSaveNewComment()}><SaveIcon size={10} /></button>
                </div>}
            </div>
        )
    }
}

export default Comments