import React, { Component } from 'react';
import Nav from '../Navbar/Navbar';
import axios from 'axios';
import './Home.css'


export default class Home extends Component {
    constructor(){
        super()

        this.state = {
            photos:[]
                
            
        }
    }
    componentDidMount(){
        axios.get('/getphotos').then(res => {
            this.setState ({photos: res.data})
            }) 
        }
    
    render() {
        let mappedphotos = this.state.photos.map((element, i) => 
                <div key = {i}>
                    <div>
                        <img className = 'photos' alt='' src={element}/>
                    </div> 
                </div> 
        )
        return (
            <div>
                <Nav/>
                <div className = 'home'>
                    <div className = 'userinfo'>Picture of Person logged in</div> 
                    <br/>
                    {mappedphotos}
                </div>
            </div> 
        )
    }
}