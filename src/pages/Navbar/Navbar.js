import React, {useState}from 'react';
import "./navbar.css";
import logo from "../../image/logo1.jpeg"
import {NavLink} from "react-router-dom";

function Navbar() {
  const [navbar, setNavbar] = useState(false); 
  const changeBackground= ()=>{
      // the 130 below means where you want the background to change when scroll
      // it is advisable to put the background at the height of the navbar
      if (window.scrollY >=20){
          setNavbar(true);
      }else{
          setNavbar(false)
      }
  }
  window.addEventListener('scroll', changeBackground)

  const showDate = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  var displaytodaysdate= (days[showDate.getDay()]) + ', ' + showDate.getDate() + ' ' + (months[showDate.getMonth()]) + ' ' + showDate.getFullYear();
  // const toString =showDate.toDateString()

  return (
    <nav className={navbar ? "navbar active":"navbar"}>
      <div className='container'>
        <div className='navbar-container'>
          <NavLink to="/" className="nav-nav"> <img src={logo} alt=" " /> </NavLink>
          <div className='logo-text'>
            <div>Welcome to Inspired For Men</div>
            <div className='date'><span>Date:</span> {displaytodaysdate}</div>
            </div>


        </div>
      </div>
    </nav>
  )
}

export default Navbar