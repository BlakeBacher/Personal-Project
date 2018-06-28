import React, { Component } from 'react';
import Nav from '../Navbar/Navbar';
import axios from 'axios';
import './Instagram.css'


export default class Instagram extends Component {
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
                <div className = 'instagram'>
                <div>Link instagram with button taking you to instagram</div> 
                {mappedposts}
                </div>
            </div> 
        )
    }
}









