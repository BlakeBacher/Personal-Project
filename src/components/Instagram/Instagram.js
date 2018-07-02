import React, { Component } from 'react';
import Nav from '../Navbar/Navbar';
import axios from 'axios';
import './Instagram.css'
import InstagramLogo from './../Images/instalogo.svg'
import arrow from './../Images/arrow.svg'


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
                <div>
                    <div className = 'textbox' style = {{marginTop: '18px', marginBottom: '18px', height: '50px'}}>
                        <div style = {{height: '30px', float: 'left', padding: '8px'}}>Check out my Instagram!</div>
                        <img alt = '' src = {arrow} style = {{height: '30px'}}/>
                        <a href = 'https://www.instagram.com/kjostyles/'><img alt = '' src = {InstagramLogo} style = {{height: '30px', float: 'right'}}/></a>
                    </div> 
                </div> 
                {mappedposts}
                </div>
            </div> 
        )
    }
}









