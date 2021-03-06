import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import './../../animate.css'

export default class AdminPage extends Component {
    constructor(){
        super()

        this.state = {
            appointments:[],
            id: 0,
            firstname:'',
            lastname:'',
            phonenumber:'',
            service:'',
            date:'',
            time:'',
            notes:'',
            editpopup: false,
            appointmentpopup: false
        }
        this.handlePopUp = this.handlePopUp.bind(this)
        this.cancel = this.cancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addAppointment = this.addAppointment.bind(this)
        this.deleteAppointment = this.deleteAppointment.bind(this)
        this.handleAddingAppointment = this.handleAddingAppointment.bind(this)
    }
    handlePopUp(e){
        this.setState({
            editpopup: !this.state.editpopup,
            firstname: e.firstname,
            lastname: e.lastname,
            phonenumber: e.phonenumber,
            service: e.service,
            date: e.date,
            time: e.time,
            notes: e.notes,
            id: e.id
        })
    }
    handleAddingAppointment(){
        this.setState({appointmentpopup: true})
    }
    cancel(){
        this.setState({
            appointmentpopup:false,
            editpopup: false,
            firstname:'',
            lastname:'',
            phonenumber:'',
            date:'',
            time:'',
            notes:''
        })
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
            this.setState({appointmentpopup: false})
        })
    }
    deleteAppointment(id){
        let result = window.confirm('Are you sure you want to delete appointment?')
        if(result === true){
        axios.delete(`/api/deleteappointment/${id}`).then((res)=> {
            this.setState({appointments: res.data})
        })}
    }
    editAppointment(id){
        this.setState({editpopup: false})
        let body = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phonenumber: this.state.phonenumber,
            service: this.state.service,
            date: this.state.date,
            time: this.state.time,
            notes: this.state.notes
        }
        axios.put(`/api/editappointment/${id}`, body).then(res => {
            this.setState({
                appointments: res.data,
                firstname:'',
                lastname: '',
                phonenumber: '',
                service: '',
                date: '',
                time: '',
                notes: ''
            })
        })
    }

    render() {
        let mappedappointments = this.state.appointments.map((e, i) => 
        <div key = {i}>
                <div className = 'appointments'>
                    <p>Name: {e.firstname} {e.lastname}</p>
                    <p>Phone: {e.phonenumber}</p>
                    <p>Service: {e.service}</p>
                    <p>Date: {e.date}</p>
                    <p>Time: {e.time}</p>
                    <p>Notes: {e.notes}</p>

                    <button className='smallbutton' onClick = {() => { this.handlePopUp(e) }}>Edit</button>
                    <button className='smallbutton' onClick = {(id) => { this.deleteAppointment(e.id) }}>Delete</button>
                </div>
            </div>
        )
        return (
            <div>
                <Navbar/>
                <div className = 'reset'>
                    <div className={this.state.appointmentpopup ? 'addappointment animated fadeInUp' : 'hiddenappointment addappointment'}>
                        <input 
                            type='text'
                        className='editpopupinput'
                            placeholder = 'Firstname'
                            name = 'firstname'
                            value = {this.state.firstname}
                            onChange = {this.handleChange}
                            />
                        <input 
                            type='text'
                        className='editpopupinput'
                            placeholder = 'Lastname'
                            name = 'lastname'
                            value = {this.state.lastname}
                            onChange = {this.handleChange}
                            />
                        <input 
                            type='tel' 
                        className='editpopupinput' 
                            placeholder = 'Phone Number' 
                            name = 'phonenumber' 
                            value = {this.state.phonenumber} 
                            onChange = {this.handleChange}
                            />
                        <select
                            type='text'
                        className='editpopupinput'
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
                            className = 'editpopupinput'
                            placeholder = 'Date'
                            name = 'date'
                            value = {this.state.date}
                            onChange = {this.handleChange}
                            />
                        <select 
                            className = 'editpopupinput'
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
                        <textarea 
                            type = 'text'
                            className = 'editpopupnotes'
                            placeholder = 'Notes'
                            name = 'notes'
                            value = {this.state.notes}
                            onChange = {this.handleChange}
                            />
                        <button className='smallbutton' onClick={this.cancel}>Cancel</button>
                        <button className='smallbutton' onClick={this.addAppointment}>Add</button>
                    </div>
                        <button className='button' onClick={()=> {this.handleAddingAppointment()}}>Add Appointment</button>

<div className = {this.state.editpopup ? 'editpopup animated fadeInUp' : 'editpopuphide animated fadeOutUp'}>
                        <input type='firstname' name = 'firstname' value = {this.state.firstname} onChange = {this.handleChange} className='editpopupinput' placeholder = 'Firstname'/>
                        <input type='lastname' name = 'lastname' value = {this.state.lastname} onChange = {this.handleChange} className='editpopupinput' placeholder = 'Lastname'/>
                        <input type='phonenumber' name = 'phonenumber' value = {this.state.phonenumber} onChange = {this.handleChange} className='editpopupinput' placeholder = 'Phone Number'/>
                        <select
                            type='text'
                            className='editpopupinput'
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
                            className ='editpopupinput'
                            placeholder = 'Date'
                            name = 'date'
                            value = {this.state.date}
                            onChange = {this.handleChange}
                        />
                        <select 
                            className ='editpopupinput'
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
                        <textarea 
                            type = 'text'
                            className ='editpopupnotes'
                            placeholder = 'Notes'
                            name = 'notes'
                            value = {this.state.notes}
                            onChange = {this.handleChange}
                        />
                        <button className='smallbutton' onClick = {this.cancel}>Cancel</button>
                        <button className = 'smallbutton' onClick = {(id) => {this.editAppointment(this.state.id)}}>Update</button> 
                    </div> 
                    
                    {mappedappointments}
                </div>
            </div> 
        )
    }
}
