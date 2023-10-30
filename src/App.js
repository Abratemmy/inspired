import React from "react"
import './App.css';
import Home from "./pages/home/home";
// import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom"
import Auth from "./pages/Auth/Auth";
import Singlepost from "./pages/home/singlepost";


function App() {



  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route exact path='/' caseSensitive={false} element={<Home />} />
        <Route path='/auth' caseSensitive={false} element={<Auth />} />
        <Route path='/:topic' caseSensitive={false} element={<Singlepost />} />
      </Routes>
    </div>
  );
}

export default App;
