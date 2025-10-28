import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Carousel from './components/Carasoul/Carousel'
import './App.css'
import Curated from './components/Curated/Curated'
import Collection from './components/Collection/Collection'
import New from './components/Collection/New';
import Service from './components/Services/Service'
import Footer from './components/Footer/Footer'
import Fcollection from './components/Collection/Fcollection'
const Router= createBrowserRouter([
  {
    path:"/",
    element:<>
    <Navbar />
    <Carousel />
    <Curated />
    <Collection />
    <New />
    <Service />
    <Footer />
    </>
  },
  {
    path:"/Collection",
    element:<>
    <Navbar />
    <Fcollection />
    <Footer />
    </>
  }
])
function App() {
  return (
    <>
    <RouterProvider router={Router}></RouterProvider>
    </>
  )
}

export default App
