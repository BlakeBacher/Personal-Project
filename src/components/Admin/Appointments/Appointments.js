import React, { Component } from 'react';
import './Appointments.css'
import AdminNav from './../NavBar/AdminNav'
import axios from 'axios';
import './../../Navbar/animate.css'

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
            editpopup: false
        }
        this.handlePopUp = this.handlePopUp.bind(this)
        this.cancel = this.cancel.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addAppointment = this.addAppointment.bind(this)
        this.deleteAppointment = this.deleteAppointment.bind(this)
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
    cancel(){
        this.setState({
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
                <div className = 'items'>
                    <p>Name: {e.firstname} {e.lastname}</p>
                    <p>Phone: {e.phonenumber}</p>
                    <p>Service: {e.service}</p>
                    <p>Date: {e.date}</p>
                    <p>Time: {e.time}</p>
                    <p>Notes: {e.notes}</p>

                    <button className='itembutton' onClick = {() => { this.handlePopUp(e) }}>Edit</button>
                    <button className='itembutton' onClick = {(id) => { this.deleteAppointment(e.id) }}>Delete</button>
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

                    <div className = {this.state.editpopup ? 'popup animated fadeInUp' : 'nopopup animated fadeOutUp'}>
                        <input type='firstname' name = 'firstname' value = {this.state.firstname} onChange = {this.handleChange} className='input' placeholder = 'Firstname'/>
                        <input type='lastname' name = 'lastname' value = {this.state.lastname} onChange = {this.handleChange} className='input' placeholder = 'Lastname'/>
                        <input type='phonenumber' name = 'phonenumber' value = {this.state.phonenumber} onChange = {this.handleChange} className='input' placeholder = 'Phone Number'/>
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
                            id = 'notespopup'
                            placeholder = 'Notes'
                            name = 'notes'
                            value = {this.state.notes}
                            onChange = {this.handleChange}
                        />
                        <button className='submit' onClick = {this.cancel}>Cancel</button>
                        <button className = 'submit' onClick = {(id) => {this.editAppointment(this.state.id)}}>Update</button> 
                    </div> 
                    
                    {mappedappointments}
                </div>
            </div> 
        )
    }
}