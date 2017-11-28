import React from 'react';

export default function Categories({ categories, onSelect, activeCategory }) {

  if (categories && categories.length === 0) {
    return <p>Your search has 0 results.</p>
  }

  return (
    <div >
      <ul className='categories-list'>
        {categories && categories.map((item) => (
          <li key={item.name} className={(Object.keys(activeCategory).length === 0 && item.name === 'All') || activeCategory === item.name ? 'navigation--active' : ''} 
          onClick={() => onSelect(item.path)}>
            <a>{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
