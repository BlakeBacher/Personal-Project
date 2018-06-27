import React, { Component } from 'react';
import Nav from './../NavBar/AdminNav'
import './AdminHome.css'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Nav/>
                <div className = 'home'>
                  Admin Home
                </div>
            </div> 
        )
    }
}