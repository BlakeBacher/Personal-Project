import React, { Component } from 'react';
import Nav from '../Navbar/Navbar'
import './Schedule.css'
import axios from 'axios'
const schedule = require('node-schedule')

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
        this.sendText = this.sendText.bind(this)
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

    sendText(){
        let dateArr = this.state.date.split('-')
        //  YYYY  MM  DD  HH MM  S

        // this is how to filter time into 10, 30, 12, 30
        // var filter = test.replace(/[AMP]|\s/g,'')
        // var newtime = filter.split(/[:-]/);




        var date = new Date(dateArr[0], dateArr[1], dateArr[2], 5, 30, 0);
        var j = schedule.scheduleJob(date, function(){
            console.log('The world is going to end today.');
        });
    }

    render() {
        return (
            <div>
                <Nav/>
                <div className = 'bookappointment'>Fill out the form below to book an appointment!
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
                            <option>7:30 - 8:30AM</option>
                            <option>9:30 - 10:30AM</option>
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
                        <button className='button' onClick ={this.sendText()}>Testing</button>
                </div> 
            </div>
        )
    }
}



