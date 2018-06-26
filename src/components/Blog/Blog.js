import React, { Component } from 'react';
import Nav from './../Navbar/Navbar'
import './Blog.css'
import axios from 'axios'
import moment from 'moment'

export default class Blog extends Component {
    constructor(){
        super()

        this.state ={
            posts: []
        }
    }

    componentDidMount(){
        axios.get('/api/blogposts').then((res) => {
            this.setState({posts: res.data})
        })
    }
    

    render() {
        console.log(this.state)
        let mappedposts = this.state.posts.map((e, i )=> 
            <div key = {i} className = 'blogpost'>
                <div className = 'blogposttitle'>{e.title}</div>
                <br/>
                {e.post}
                <div className = 'postinfo'>
                    <div className = 'postname'>{e.displayname}</div>
                    <div className = 'dateandtime'>{moment(e.date).format('M/D/YY')}</div>
                    <div className = 'dateandtime'>{moment(e.date).format('h:mm')}</div> 
                </div> 
            </div> 
        )
        return (
        <div>
            <Nav/>
            <div className = 'blog'></div>
            {mappedposts}
        </div>
        )
    }
}
