import React from 'react'
import { Link } from 'react-router-dom'
import SortControl from './sortcontrol'

export default function Posts ({ list, onSortPostsBy, onVote }) {
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
              <Link to={`/post/${item.id}`}> {item.title}</Link> Score: {item.voteScore}
            </li>
          ))}
        </ul>
      </div>
    )
  }