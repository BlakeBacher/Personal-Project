import React, { Component } from 'react';
import Nav from '../Navbar/Navbar';
import axios from 'axios';


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
                    <div className = 'photos'>
                        <img alt='' src={element}/>
                    </div> 
                </div> 
        )
        return (
            <div>
                <Nav/>
                <div>Home
                    <br/>
                    {mappedphotos}
                </div>
            </div> 
        )
    }
}