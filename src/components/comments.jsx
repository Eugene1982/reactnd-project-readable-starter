import React from 'react'

export default function Comments ({ list }) {
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
            <li key={item.id} >
              {item.body} Score: {item.voteScore}
            </li>
          ))}
        </ul>
      </div>
    )
  }