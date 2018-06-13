import React from 'react';
import './Navbar.css'
// import {Dropdownmenu, MenuItem} from 'react-bootstrap-dropdown-menu'

export default function Navbar (){
     return(
        <div className='main'>
            <div className = 'title'>Kjostyles</div> 
            <br/>
            <div>
            <div className = 'X'></div> 
            <div className = 'X'></div> 
            </div> 
        
            <a href = 'http://localhost:3030/auth/logout'>
                <button className='navbuttons'>Logout</button>
            </a>
        </div>
     )
}