import React, { Component } from 'react';
import serializeForm from 'form-serialize'
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right'

class AddEditControl extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        if (this.props.savePost) {
            this.props.savePost(values)
        }
    }

    render() {
        const { post } = this.props

        return (
            <div>
                <form onSubmit={this.handleSubmit} className="create-contact-form">
                    {post &&
                        <div>
                            <h3>Edit post</h3>
                            <input type="hidden" name="id" defaultValue={post.id}/><br />
                            <input type="text" name="title" placeholder="Title" defaultValue={post.title} /><br />
                            <input type="textarea" name="body" class="bodyArea" placeholder="Body" defaultValue={post.body} /><br />
                            <input type="text" name="author" placeholder="Author" defaultValue={post.author} /><br />
                        </div>
                    }
                    {!post &&
                        <div>
                            <h3>Add post</h3>
                            <input type="text" name="title" placeholder="Title" /><br />
                            <input type="textarea" name="body" class="bodyArea" placeholder="Body" /><br />
                            <input type="text" name="author" placeholder="Author" /><br />
                        </div>
                    }
                    <button className='icon-btn'>
                        <ArrowRightIcon size={30} />
                    </button>
                </form>
            </div>
        )
    }
}

export default AddEditControl