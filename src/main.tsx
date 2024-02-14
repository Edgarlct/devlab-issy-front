import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/home.tsx'
import HorizontalNonLinearStepper from './pages/admin.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
    path:'/admin',
    element: <HorizontalNonLinearStepper/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
