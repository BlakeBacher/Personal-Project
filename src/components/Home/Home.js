import React, { Component } from 'react';
import Nav from '../Navbar/Navbar'
import './Home.css'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Nav/>
                <div className = 'home'>
                   Home
                </div>
            </div> 
        )
    }
}