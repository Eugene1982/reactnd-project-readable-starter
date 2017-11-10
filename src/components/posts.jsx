import React from 'react'
import SortControl from './sortcontrol'

export default function Posts ({ list, onSortPostsBy }) {
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
            <li key={item.title} >
              {item.title} Score: {item.voteScore}
            </li>
          ))}
        </ul>
      </div>
    )
  }