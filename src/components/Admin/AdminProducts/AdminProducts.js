import React from 'react';
import Nav from './../NavBar/AdminNav'
import './AdminProducts.css'

export default function AdminProducts (){
     return(
        <div>
            <Nav/>
            <div className = 'products'>Admin Products</div> 
        </div>
     )
}