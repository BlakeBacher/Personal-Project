import React, { Component } from 'react';
import Nav from '../Navbar/Navbar'
import './Schedule.css'
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
    addAppointment(e){
        e.preventDefault() //this allows us to not refresh the page after they clicked okay on the alert.
        if(this.state.firstname === ''||
                this.state.lastname === ''||
                this.state.phonenumber === ''||
                this.state.service === '' ||
                this.state.date === ''||
                this.state.time === ''){
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
            window.alert('Thank you for scheduling an appointment!');
            this.props.history.push('/home');
        }
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
                            required
                        />
                        <input 
                            type='text'
                            className=''
                            placeholder = 'Lastname'
                            name = 'lastname'
                            value = {this.state.lastname}
                            onChange = {this.handleChange}
                            required
                        />
                        <input 
                            type='tel' 
                            className='' 
                            placeholder = 'Phone Number' 
                            name = 'phonenumber' 
                            value = {this.state.phonenumber} 
                            onChange = {this.handleChange}
                            required
                        />
                        <select
                            required
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
                        <input
                            type = 'date'
                            className = ''
                            placeholder = 'Date'
                            name = 'date'
                            value = {this.state.date}
                            onChange = {this.handleChange}
                            required
                        />
                        <select 
                            required
                            className = 'picker padding'
                            name = 'time' 
                            value ={this.state.time} 
                            onChange = {this.handleChange}
                        >
                            <option hidden>Time</option>
                            <option>7:30 - 8:30AM</option>
                            <option>9:30 - 10:30AM</option>
                        </select> 

                        <button className='submit' onClick = {(e)=> { this.addAppointment(e)}}>Submit</button>
                    </form>
                </div> 
            </div>
        )
    }
}



