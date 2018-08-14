import React, { Component } from 'react';
import Nav from '../Navbar/Navbar';
import axios from 'axios';

import instagram_icon from './../Images/instagram_icon.png'
// import right_arrow_icon_pink from './../Images/right_arrow_icon_pink.svg'


export default class Instagram extends Component {
    constructor(){
        super()

        this.state = {
            images:[], 
            captions:[],
            currentuser:{}
        }
    }
    componentWillMount(){
        axios.get('/getphotos').then(res => {
            let captions = []
            res.data.captions.map((cap) => {  
                var caption = cap.replace(/#(.*)/g, '')
                captions.push(caption)
            })
            this.setState ({images:res.data.images, captions:captions})
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
                <div className = 'reset'>
                <div>
                    <div className='instalink border'>
                        <p style = {{fontSize: '22px', padding:'10px'}}>Click here to check out my Instagram!</p>
                        <a href = 'https://www.instagram.com/kjostyles/'><img alt = '' src = {instagram_icon} id='instaicon'/></a>
                    </div> 
                </div> 
                {mappedposts}
                </div>
            </div> 
        )
    }
}
