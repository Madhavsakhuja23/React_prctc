import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Carousel from './components/Carasoul/Carousel'
import './App.css'
import Curated from './components/Curated/Curated'
import Collection from './components/Collection/Collection'
const Router= createBrowserRouter([
  {
    path:"/",
    element:<>
    <Navbar />
    <Carousel />
    <Curated />
    <Collection />
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
