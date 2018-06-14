import React, { Component } from 'react';
import Nav from '../Navbar/Navbar'
import './Schedule.css'

export default class Schedule extends Component {
    render() {
        return (
            <div>
                <Nav/>
                <div className = 'schedule'>Schedule</div> 
            </div>
        )
    }
}