import React, { Component } from 'react';
import AdminNav from './../NavBar/AdminNav';
import axios from 'axios';
import './AdminHome.css'


export default class Home extends Component {
    constructor(){
        super()

        this.state = {
            images:[], 
            captions:[],
            currentuser:{}
        }
    }
    componentDidMount(){
        axios.get('/getphotos').then(res => {
            this.setState ({images:res.data.images, captions: res.data.captions})
            })
        axios.get('/getcurrentuser').then(res => {
            this.setState ({currentuser: res.data})
        })
    }
    
    render() {
        let mappedposts = this.state.images.map((element, i) => 
            <div key = {i}>
                <div className = 'imgcap'>
                    <img className = 'photos' alt='' src={element}/>
                    <br/>
                    {this.state.captions[i]}
                </div> 
            </div> 
        )
        
           
        return (
            <div>
                <AdminNav/>
                <div className = 'home'>
                    <div className = 'userinfo'>
                        <div><img alt = '' className = 'currentuserphoto' src = {this.state.currentuser.picture}/></div>
                        <div>Hi, {this.state.currentuser.displayname}!</div>
                        <br/>
                        {/* <p>Welcome to KJOSTYLES! Here you can schedule appointments, look at my most recent work or check out my blog.</p> */}
                    </div> 
                    <br/>
                {mappedposts}
                </div>
            </div> 
        )
    }
}







