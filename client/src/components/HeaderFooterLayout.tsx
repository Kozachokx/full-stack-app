import React from 'react'
import { Outlet } from 'react-router-dom'
// import Navigation from './Navigation'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

function HeaderFooterLayout() {
  return (
    <>
      <Navigation />
      <div className='content-container'>
        <Outlet/>
      </div>
      <Footer />
    </>
  )
}

export default HeaderFooterLayout