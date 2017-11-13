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
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="create-contact-form">
                    <h3>Add post</h3>
                    <input type="text" name="title" placeholder="Title" /><br/>
                    <input type="textarea" name="body" placeholder="Body" /><br/>
                    <input type="text" name="author" placeholder="Author" /><br/>
                    <button className='icon-btn'>
                        <ArrowRightIcon size={30} />
                    </button>
                </form>
            </div>
        )
    }
}

export default AddEditControl