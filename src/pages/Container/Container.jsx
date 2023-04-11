import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import ToTop from '../../components/ToTop/ToTop'
function Container() {
  return (
    <> 
      <NavBar/>
      <>
        <Outlet/>
      </>
      <Footer/>
      <ToTop/>
    </>
  )
}

export default Container