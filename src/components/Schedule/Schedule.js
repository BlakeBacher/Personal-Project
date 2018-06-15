import React, { Component } from 'react';
import Nav from '../Navbar/Navbar'
import './Schedule.css'
import DatePicker from './Datepicker'

export default class Schedule extends Component {
    constructor(){
        super()

        this.state = {
            
        }
    }
    render() {
        return (
            <div>
                <Nav/>
                <div className = 'schedule'>Schedule an appointment here
                    <br/>
                    <form>
                        <input type='text' className='' placeholder = 'Firstname'/>
                        <input type='text' className='' placeholder = 'Lastname'/>
                    
                        <input type='number' className='' placeholder = 'Phone Number'/>
                      
                        <input type='' className='' placeholder = 'Service'/>
                        <DatePicker/>
                        <button className=''>Submit</button>
                    </form>
                </div> 
            </div>
        )
    }
}