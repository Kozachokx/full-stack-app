import React from 'react'
import { Outlet } from 'react-router-dom'
// import Navigation from './Navigation'
import { Navigation } from './Navigation'

function HeaderFooterLayout() {
  return (
    <>
      <Navigation />
      <div className='content-container'>
        <Outlet/>
      </div>
      <div>Footer block</div>
    </>
  )
}

export default HeaderFooterLayout