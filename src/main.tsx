import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/home.tsx'
import HorizontalNonLinearStepper from './pages/admin.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Créer un thème personnalisé (facultatif)
const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
