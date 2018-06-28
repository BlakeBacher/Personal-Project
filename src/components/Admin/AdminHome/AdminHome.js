import React, { Component } from 'react';
import axios from 'axios'
import Nav from './../NavBar/AdminNav'
import './AdminHome.css'

export default class Home extends Component {
    constructor(){
        super()

        this.state = {
            currentuser:{}
        }
    }
    componentDidMount(){
        axios.get('/getcurrentuser').then(res => {
            this.setState ({currentuser: res.data})
        })
    }

    render() {
        return (
            <div>
                <Nav/>
                <div className = 'adminhome'>
                <div className = 'userinfo'>
                        <div><img alt = '' className = 'currentuserphoto border' src = {this.state.currentuser.picture}/></div>
                        <div>Hi, {this.state.currentuser.displayname}!</div>
                        <br/>
                    </div> 
                </div>
            </div> 
        )
    }
}