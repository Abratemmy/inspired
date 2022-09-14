import React, {useState}from 'react';
import "./navbar.css";

function Navbar() {
  const [navbar, setNavbar] = useState(false); 
  const changeBackground= ()=>{
      // the 130 below means where you want the background to change when scroll
      // it is advisable to put the background at the height of the navbar
      if (window.scrollY >=50){
          setNavbar(true);
      }else{
          setNavbar(false)
      }
  }
  window.addEventListener('scroll', changeBackground)


  return (
    <nav className={navbar ? "navbar active":"navbar"}>
      <div className='container'>
        <div className='navbar-container'>
          <div className='logo-text'>InspiredForMen</div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar