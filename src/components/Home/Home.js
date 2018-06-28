import React, { Component } from 'react';
import axios from 'axios'
import Nav from '../Navbar/Navbar'
import './Home.css'

export default class Home extends Component {
    constructor(){
        super()

        this.state ={
            currentuser:{},
            images:[]
        }
    }

    componentDidMount(){
        axios.get('/getcurrentuser').then(res => {
            this.setState ({currentuser: res.data})
        })
        axios.get('/getphotos').then(res => {
            this.setState ({images:res.data.images})
            })
    }

    render() {
        let mappedimages = this.state.images.map((e, i) => 
            <img key = {i} className = 'images border' alt='' src={e}/>
        )
        return (
            <div>
                <Nav/>
                <div className = 'home'>
                <div className = 'userinfo'>
                        <div><img alt = '' className = 'currentuserphoto border' src = {this.state.currentuser.picture}/></div>
                        <div>Hi, {this.state.currentuser.displayname}!</div>
                        <br/>
                        <p>Welcome to KJOSTYLES! Here you can schedule appointments, look at my most recent work or check out my blog.</p>
                    </div> 
                    {mappedimages}
                </div>
            </div> 
        )
    }
}