import React, { Component } from 'react';
import Nav from '../Navbar/Navbar'
import './BookAppointment.css'
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
            time:'',
            check: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.addAppointment =  this.addAppointment.bind(this)
        this.numbercheck = this.numbercheck.bind(this)
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    numbercheck(e){
        this.setState({phonenumber: e.target.value, check: false})
        let phone = (e.target.value.replace(/\D/g,''))
        if(phone.length === 10){
            this.setState({check: true})
        }else{
            this.setState({check: false})
        }
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
            window.alert('Thank you for scheduling an appointment!');
            this.props.history.push('/home');
        }
    }


    render() {
        return (
            <div>
                <Nav/>
                <div className = 'bookappointment'>
                    <br/>
                    <div className = 'textbox'>Fill out the form below to book an appointment!</div> 
                    <br/>
                    <form>
                        <input 
                            type='text'
                            className='input'
                            placeholder = 'Firstname'
                            name = 'firstname'
                            value = {this.state.firstname}
                            onChange = {this.handleChange}
                            required
                        />
                        <input 
                            type='text'
                            className='input'
                            placeholder = 'Lastname'
                            name = 'lastname'
                            value = {this.state.lastname}
                            onChange = {this.handleChange}
                            required
                        />
                        <input 
                            type='tel' 
                            className= {this.state.check === null ? 'input' : this.state.check === false ? 'input phonered' : 
                                this.state.check === true ? 'input phonegreen' : ''} 
                            placeholder = 'Phone Number' 
                            name = 'phonenumber' 
                            value = {this.state.phonenumber} 
                            onChange = {this.numbercheck}
                            required
                        />
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
                            className = 'input'
                            placeholder = 'Date'
                            name = 'date'
                            value = {this.state.date}
                            onChange = {this.handleChange}
                            required
                        />
                        <select 
                            required
                            className = 'input'
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

                        <button className='button' onClick = {(e)=> { 

                            e.preventDefault()
                            //this allows us to not refresh the page after they clicked okay on the alert.

                            if(this.state.check === false){
                                alert('Invalid phone number.')
                            }else{
                                this.addAppointment(e)
                            }}}>Submit
                        </button>
                    </form>
                        {/* <button className='button' onClick ={this.sendText}>Testing</button> */}
                </div> 
            </div>
        )
    }
}



