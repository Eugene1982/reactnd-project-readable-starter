import React from 'react'

export default function Categories ({ list }) {
  if (list.length === 0) {
    return <p>Your search has 0 results.</p>
  }

  return (
   <div className='categories-list'>
      <h3 className='subheader'>
        Categories
      </h3>
      <ul>
        {list.map((item) => (
          <li key={item.name}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}