import React, { Component } from 'react';

class Comments extends Component {

    state = {
        editCommentId: null
    }

    onEditComment = (commentId) => {
        this.setState({ editCommentId: commentId })
    }

    render() {
        const { list } = this.props
        const { editCommentId } = this.state

        if (list.length === 0) {
            return <p>Your search has 0 results.</p>
        }
        return (
            <div className='posts-list'>
                <h3 className='subheader'>
                    Comments
        </h3>
                <ul>
                    {list.map((item) => (
                        (editCommentId === item.id ? <li key={item.id} >
                            <input type="text" name="body" defaultValue={item.body} /><button onClick={() => {this.props.onSaveComment(item.id)}}>Save</button>
                        </li>
                            : <li key={item.id}>
                                {item.body} Score: {item.voteScore} <button onClick={() => this.onEditComment(item.id)}>Edit</button> 
                                <button onClick={() => this.props.onDeleteComment(item.id)}>Delete</button>
                            </li>)

                    ))}
                </ul>
            </div>
        )
    }
}

export default Comments