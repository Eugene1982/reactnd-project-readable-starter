import React from 'react';
import serializeForm from 'form-serialize'
import SaveIcon from 'react-icons/lib/fa/floppy-o'


export default function AddEditControl({ post, savePost }) {
    var handleSubmit = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        if (savePost) {
            savePost(values)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="create-contact-form">
                {post &&
                    <div>
                        <h3>Edit post</h3>
                        <input type="hidden" name="id" defaultValue={post.id} /><br />
                        <input type="text" name="title" className="editor-field" placeholder="Title" defaultValue={post.title} /><br />
                        <input type="textarea" name="body" className="bodyArea" placeholder="Body" defaultValue={post.body} /><br />
                        <input type="text" name="author" className="editor-field" placeholder="Author" defaultValue={post.author} /><br />
                    </div>
                }
                {!post &&
                    <div>
                        <h3>Add post</h3>
                        <input type="text" name="title" className="editor-field" placeholder="Title" /><br />
                        <input type="textarea" name="body" className="bodyArea" placeholder="Body" /><br />
                        <input type="text" name="author" className="editor-field" placeholder="Author" /><br />
                    </div>
                }
                <button className='icon-btn'>
                    <SaveIcon size={30} />
                </button>
            </form>
        </div>
    )
}