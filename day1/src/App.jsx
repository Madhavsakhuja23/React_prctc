import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Navbar from './components/Navbar/Navbar'

const Router= createBrowserRouter([
  {
    path:"/",
    element:<>
    <Navbar />
    </>
  },
])
function App() {
  return (
    <>
    <RouterProvider router={Router}></RouterProvider>
    </>
  )
}

export default App
