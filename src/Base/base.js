import React from 'react'
import ResponsiveAppBar from './nav'

function Base({title, description, children}) {
  return (
    <div>
          <ResponsiveAppBar />

<div className='main-component'>
    <h1>{title}</h1>
</div>
<main>
    {description}
    {children}
</main>

    </div>
  )
}

export default Base