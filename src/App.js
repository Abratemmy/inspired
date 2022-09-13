import React from "react"
import './App.css';
import Home from "./pages/home/home";
import {Routes, Route} from "react-router-dom"
import Auth from "./pages/Auth/Auth";
import Navbar from "./pages/Navbar/Navbar";
import Singlepost from "./pages/home/singlepost";

function App() {
  return (
    <div>
      <Navbar />
    <Routes>  
        <Route exact path ='/' caseSensitive={false} element={<Home/>}  />
        <Route exact path='/auth' caseSensitive={false} element={<Auth />}/>
        <Route exact path="/:id" caseSensitive={false} element={<Singlepost />} />
       
    </Routes>
    </div>
  );
}

export default App;
