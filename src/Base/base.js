import React from 'react'
import ResponsiveAppBar from './nav'

function Base({title, description, children}) {
  return (

<div className='main-component'>
<ResponsiveAppBar />
<main>
    {description}
    {children}
</main>
</div>


  )
}

export default Base