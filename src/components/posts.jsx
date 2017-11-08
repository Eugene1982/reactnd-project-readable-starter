import React from 'react'


export default function Posts ({ list }) {
    if (list.length === 0) {
      return <p>Your search has 0 results.</p>
    }
  
    return (
     <div className='posts-list'>
        <h3 className='subheader'>
          Posts
        </h3>
        <ul>
          {list.map((item) => (
            <li key={item.title} >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    )
  }