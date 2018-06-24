import React, { Component } from 'react';
import Nav from '../Navbar/Navbar'
import './Schedule.css'
// import DatePicker from './Datepicker'
import axios from 'axios'


export default class Schedule extends Component {
    constructor(){
        super()

        this.state = {
            firstname:'',
            lastname:'',
            phonenumber:'',
            service:'',
            date:'',
            time:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.addAppointment =  this.addAppointment.bind(this)
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    addAppointment(){
        let body = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phonenumber: this.state.phonenumber,
            service: this.state.service,
            date: this.state.date,
            time: this.state.time
        }
        axios.post('/api/addappointment', body).then(() => {
            alert('Thank you for scheduling an appointment!')
            this.props.history.push('/home')
        })
    }
    


    render() {
        return (
            <div>
                <Nav/>
                <div className = 'schedule'>Schedule an appointment here
                    <br/>
                    <form>
                        <input 
                            type='text'
                            className=''
                            placeholder = 'Firstname'
                            name = 'firstname'
                            value = {this.state.firstname}
                            onChange = {this.handleChange}
                        />
                        <input 
                            type='text'
                            className=''
                            placeholder = 'Lastname'
                            name = 'lastname'
                            value = {this.state.lastname}
                            onChange = {this.handleChange}
                        />
                        <input 
                            type='tel' 
                            className='' 
                            placeholder = 'Phone Number' 
                            name = 'phonenumber' 
                            value = {this.state.phonenumber} 
                            onChange = {this.handleChange}
                        />
                        <select
                            type='text'
                            className='picker padding'
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
                        {/* <DatePicker
                            className='picker'
                            value ={this.state.date}
                            name = 'date'
                            onChange = {this.handleChange}
                        /> */}
                        <input
                            type = 'date'
                            className = ''
                            placeholder = 'Date'
                            name = 'date'
                            value = {this.state.date}
                            onChange = {this.handleChange}
                        />
                        <select 
                            className = 'picker padding'
                            name = 'time' 
                            value ={this.state.time} 
                            onChange = {this.handleChange}
                        >
                            <option hidden>Time</option>
                            <option>7:30 - 8:30AM</option>
                            <option>9:30 - 10:30AM</option>
                        </select> 

                        <button className='submit' onClick = {this.addAppointment}>Submit</button>
                    </form>
                </div> 
            </div>
        )
    }
}



