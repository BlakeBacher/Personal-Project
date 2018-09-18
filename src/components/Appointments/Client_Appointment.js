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
                    <div className = 'textbox'>Here you can schedule for an appointment or view your upcoming appointments!</div>
                    <div className='squarelink'>
                        <a target="_top" href="https://squareup.com/appointments/book/D41KGJ7SVT9HD/kjostyles" rel="nofollow">Book Appointment</a>
                    </div> 
                    {/* <Link to='/wizard1'><button className='button'>Book Appointment</button></Link> */}
                        <div>
                    </div> 
                </div> 
            </div>
        )
    }
}
