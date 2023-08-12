import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {RouterProvider } from 'react-router-dom'
import { appRoutes } from './services/routes'

function App() {
  return (
    <RouterProvider router={appRoutes}/>
  )
}

export default App

