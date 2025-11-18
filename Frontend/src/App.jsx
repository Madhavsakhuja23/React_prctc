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
import Auctions from './components/Auction/Auctions'
import AuctionDetail from './components/Auction/AuctionDetail'
import BidDetail from './components/Bid/Biddetail'
import SignUp from "./components/Authorization/Signup" 
import Login from "./components/Authorization/Login"
import ForgotPassword from "./components/Authorization/Forgot"
// import Otp from './components/Authorization/Otp'
import Chatbot from './components/Chatbot/Chatbot'
import BidHistory from './components/Bid/BidHistory'
import Payment from './components/Bid/Payment'
import UploadAuction from './components/Auction/uploadAuction'
import DynamicAuctionDetail from './components/Auction/DynamicAuctionDetail'
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
    <Chatbot />
    </>
  },
  {
    path:"/Collection",
    element:<>
    <Navbar />
    <Fcollection />
    <Footer />
    </>
  },{
    path:"/Auction",
    element:<>
    <Navbar />
    <Auctions />
    <Footer />
    </>
  }
  ,{
    path:"/auction/:id",
    element:<>
    <AuctionDetail />
    </>
  }
  // ,{
  //   path:"/auction/u:id",
  //   element:<>
  //   <AuctionDetail />
  //   </>
  // },{
  //   path:"/auction/p:id",
  //   element:<>
  //   <AuctionDetail />
  //   </>
  // },{
  //   path:"/auction/:id",
  //   element:<>
  //   <DynamicAuctionDetail />
  //   </>
  // },
  ,
  {
    path:"/bid/:id",
    element:<>
    <BidDetail />
    </>
  },{
    path:"/bid-history",
    element:<>
    <Navbar />
    <BidHistory />
    <Footer />
    </>
  },{
    path:"/signup",
    element:<>
    <SignUp />
    </>
  },
  {
    path:"/login",
    element:<>
    <Login />
    </>
  },{
    path:"/forgot",
    element:<>
    <ForgotPassword />
    </>
  },
  // {
  //   path:"/otp",
  //   element:<>
  //   <Otp />
  //   </>
  // },
  {
    path:"/payment",
    element:<>
    <Payment />
    </>
  },{
    path:"/upload",
    element:<>
    <UploadAuction />
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
