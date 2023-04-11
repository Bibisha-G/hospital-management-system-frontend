import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './Routes'

function MyRoutes() {
  return (
      <RouterProvider router={router} />
  )
}

export default MyRoutes