import React, { Component } from 'react';
import './Appointments.css'
import AdminNav from './../NavBar/AdminNav'
import axios from 'axios';

export default class AdminPage extends Component {
    constructor(){
        super()

        this.state = {
            appointments:[],
            firstname:'',
            lastname:'',
            phonenumber:'',
            service:'',
            date:'',
            time:'',
            notes:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.addAppointment = this.addAppointment.bind(this)
        this.deleteAppointment = this.deleteAppointment.bind(this)
    }
    componentDidMount(){
        axios.get('/api/getappointments').then((res) => {
            this.setState({appointments: res.data})
        })
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
            time: this.state.time,
            notes: this.state.notes
        }
        axios.post('/api/addappointment', body).then(() => {
            alert('Submitted!')
        })
    }
    deleteAppointment(id){
        let result = window.confirm('Are you sure you want to delete appointment?')
        if(result === true){
        axios.delete(`/api/deleteappointment/${id}`).then((res)=> {
            this.setState({appointments: res.data})
        })}
    }

    render() {
        let mappedappointments = this.state.appointments.map((e, i) => 
            <div key = {i}>
                <div className = 'items'>
                    <p>Name: {e.firstname} {e.lastname}</p>
                    <p>Phone: {e.phonenumber}</p>
                    <p>Service: {e.service}</p>
                    <p>Date: {e.date}</p>
                    <p>Time: {e.time}</p>
                    <p>Notes: {e.notes}</p>
                    <button className='itembutton'>Edit</button>
                    <button className='itembutton' onClick = {(id)=> { this.deleteAppointment(e.id)}}>Delete</button>
                </div> 
            </div> 
        )
        return (
            <div>
                <AdminNav/>
                <div className = 'appointments'>
                <form>
                        <input 
                            type='text'
                            className='input'
                            placeholder = 'Firstname'
                            name = 'firstname'
                            value = {this.state.firstname}
                            onChange = {this.handleChange}
                        />
                        <input 
                            type='text'
                            className='input'
                            placeholder = 'Lastname'
                            name = 'lastname'
                            value = {this.state.lastname}
                            onChange = {this.handleChange}
                        />
                        <input 
                            type='tel' 
                            className='input' 
                            placeholder = 'Phone Number' 
                            name = 'phonenumber' 
                            value = {this.state.phonenumber} 
                            onChange = {this.handleChange}
                        />
                        <select
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
                        />
                        <select 
                            className = 'input'
                            name = 'time' 
                            value ={this.state.time} 
                            onChange = {this.handleChange}
                        >
                            <option hidden>Time</option>
                            <option>7:30 - 8:30AM</option>
                            <option>9:30 - 10:30AM</option>
                        </select>
                        <textarea 
                            type = 'text'
                            id = 'notes'
                            placeholder = 'Notes'
                            name = 'notes'
                            value = {this.state.notes}
                            onChange = {this.handleChange}
                        />
                        <button className='submit' onClick = {this.addAppointment}>Submit</button>
                    </form>
                    <div className = 'break'></div> 
                    {mappedappointments}
                </div>
            </div> 
        )
    }
}