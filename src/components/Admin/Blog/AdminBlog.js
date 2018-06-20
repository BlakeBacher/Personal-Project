import React, { Component } from 'react';
import AdminNav from './../NavBar/AdminNav'
import './AdminBlog.css'
import axios from 'axios'

export default class AdminBlog extends Component {
    constructor(){
        super()

        this.state = {
            title:'',
            blogpost:'',
            posts:[]
        }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount(){
        axios.get('/api/blogposts').then((res) => {
            this.setState({posts: res.data})
        })
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    addBlogPost(){
        let body = {
            title: this.state.title,
            blogpost: this.state.blogpost,
        }
        axios.post('/api/addblogpost', body).then((res) => {
            this.setState({posts: res.data})
        })
    }

    render() {
        return (
            <div>
                <AdminNav/>
                <div className = 'adminblog'>
                    <input type='text' name = 'title' value = {this.state.title} onChange = {this.handleChange} className='input' placeholder = 'Title'/>
                    <textarea type='text' name = 'blogpost' value = {this.state.blogpost} onChange = {this.handleChange} id='blogpost' placeholder = 'Content'/>
                    <button className='post' onClick = {this.addBlogPost()}>Post</button>
                </div>
            </div> 
        )
    }
}