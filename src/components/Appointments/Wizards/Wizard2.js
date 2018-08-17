import React, { Component } from 'react';
import Navbar from './../../Navbar/Navbar'
import {Link} from 'react-router-dom'


export default class Wizard2 extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className='wizardreset'>
                    Wizard 2
                    <Link to='/wizard3'><button className='button'>Next</button></Link>
                </div> 
            </div>
        )
    }
}