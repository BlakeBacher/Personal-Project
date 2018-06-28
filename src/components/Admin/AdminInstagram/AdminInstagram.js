import React, { Component } from 'react';
import Nav from './../NavBar/AdminNav';
import axios from 'axios';
import './AdminInstagram.css'


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
    }
    
    render() {
        let mappedposts = this.state.images.map((element, i) => 
            <div key = {i}>
                <div className = 'imgcap'>
                    <img className = 'photos border' alt='' src={element}/>
                    <br/>
                    {this.state.captions[i]}
                </div> 
            </div> 
        )
        
           
        return (
            <div>
                <Nav/>
                <div className = 'admininstagram'>
                <div>Link instagram with button taking you to instagram</div> 
                {mappedposts}
                </div>
            </div> 
        )
    }
}







