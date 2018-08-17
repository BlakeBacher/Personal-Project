import React, { Component } from 'react';
import Navbar from './../../Navbar/Navbar'
import {Link} from 'react-router-dom'


export default class Wizard4 extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className='wizardreset'>
                    Wizard 4
                    <Link to='/appointments'><button className='button'>Submit</button></Link>
                </div> 
            </div>
        )
    }
}