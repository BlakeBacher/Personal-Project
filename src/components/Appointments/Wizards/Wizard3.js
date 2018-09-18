import React, { Component } from 'react';
import Navbar from './../../Navbar/Navbar'
import {Link} from 'react-router-dom'


export default class Wizard3 extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className='wizardreset'>
                    Wizard 3
                    <Link to='/wizard4'><button className='button wizbutton'>Next</button></Link>
                </div> 
            </div>
        )
    }
}