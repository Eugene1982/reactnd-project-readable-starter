import React from 'react';

export default function Categories({ categories, onSelect }) {

  if (categories && categories.length === 0) {
    return <p>Your search has 0 results.</p>
  }
  return (
   
    <div >
      <ul className='categories-list'>
      <li key="all" onClick={() => onSelect({})}>
           <a href="#">All Categories</a>
        </li>
        {categories && categories.map((item) => (
          <li key={item.name} onClick={() => onSelect(item.path)}>
            <a href="#">{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
