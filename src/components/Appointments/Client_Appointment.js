import React, { Component } from 'react';
import Navbar from './../Navbar/Navbar'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Schedule extends Component {
    constructor(){
        super()

        this.state = {
            firstname:'',
            lastname:'',
            phonenumber:'',
            service:'',
            date:'',
            time:'',
            check: null,
        }
        this.handleChange = this.handleChange.bind(this)
        this.addAppointment =  this.addAppointment.bind(this)
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    bookappointmenttoggle = ()=> {
        this.setState({bookappointment: !this.state.bookappointment})
    }
    
    addAppointment(e){
        if(this.state.firstname === ''||
                this.state.lastname === ''||
                this.state.phonenumber === ''||
                this.state.service === '' ||
                this.state.date === ''||
                this.state.time === '' ||
                this.state.check === false){
            alert('Please fill out form.');
        }else{
            let body = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                phonenumber: this.state.phonenumber,
                service: this.state.service,
                date: this.state.date,
                time: this.state.time
            }
            axios.post('/api/addappointment', body);
            window.alert('Thank you for scheduling an appointment! As a reminder you will recieve two texts before your appointment. See you soon!');
            this.props.history.push('/home');
        }
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className = 'reset'>
                    <div className = 'textbox'>Here you can schedule for an appointment or view upcoming appointments!</div>
                    <Link to='/wizard1'><button className='button'>Book Appointment</button></Link>
                        {/* <div>

                            <select
                                required
                                type='text'
                                className='input'
                                placeholder = 'Service'
                                name = 'service'
                                value = {this.state.service}
                                onChange = {this.handleChange}
                            >
                                <option hidden>Service</option>
                                <option>Hair Cut</option>
                                <option>Eyelashes</option>
                                <option>Color</option>
                            </select>
                            <input
                                type = 'date'
                                className='input'
                                placeholder = 'Date'
                                name = 'date'
                                value = {this.state.date}
                                onChange = {this.handleChange}
                                required
                            />
                            <select 
                                required
                                className='input'
                                name = 'time' 
                                value ={this.state.time} 
                                onChange = {this.handleChange}
                            >
                                <option hidden>Time</option>
                                <option>8:00 - 9:30AM</option>
                                <option>10:00 - 11:30AM</option>
                                <option>12:00 - 1:30PM</option>
                                <option>2:00 - 3:30AM</option>
                                <option>4:00 - 5:30AM</option>
                            </select> 
                                <br/>
                                <button className='button' onClick={this.bookappointmenttoggle}>Cancel</button>
                            <button className='button' onClick = {(e)=> { 
                                e.preventDefault()
                                //this allows us to not refresh the page after they clicked okay on the alert.
                                if(this.state.check === false){
                                    alert('Invalid phone number.')
                                }else{
                                    this.addAppointment(e)
                                }}}>Submit
                            </button>
                        </div> */}
                        <div>
                        </div> 
                </div> 
            </div>
        )
    }
}
