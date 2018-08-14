import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import moment from 'moment'

export default class AdminBlog extends Component {
    constructor(){
        super()

        this.state = {
            id: 0,
            title:'',
            blogpost:'',
            posts:[],
            editpopup: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.cancel = this.cancel.bind(this)
        this.addBlogPost = this.addBlogPost.bind(this)
        this.handlePopUp = this.handlePopUp.bind(this)
        this.editBlogPost = this.editBlogPost.bind(this)
    }
    componentDidMount(){
        axios.get('/api/blogposts').then((res) => {
            this.setState({posts: res.data})
        })
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    handlePopUp(e){
        this.setState({
            id: e.id,
            title: e.title,
            blogpost: e.post,
            editpopup: !this.state.editpopup
        })
    }
    cancel(){
        this.setState({
            editpopup: false,
            title: '',
            blogpost:''
        })
    }
    addBlogPost(){
        let body = {
            title: this.state.title,
            blogpost: this.state.blogpost,
        }
        axios.post('/api/addblogpost', body).then((res) => {
            this.setState({posts: res.data, title:'', blogpost:''})
        })
        
    }
    deleteblogpost(id){
        let result = window.confirm('Are you sure you want to delete this blog post?')
        if (result === true){
        axios.delete(`/api/deleteblogpost/${id}`).then((res) => {
            this.setState({posts: res.data})
        })}
    }
    editBlogPost(id){
        this.setState({editpopup: false})
        let body = {
            title: this.state.title,
            post: this.state.blogpost
        }
        axios.put(`/api/editblogpost/${id}`, body).then(res => {
            this.setState({
                posts: res.data,
                title: '',
                blogpost:''
            })
        })
    }


    render() {
        let mappedposts = this.state.posts.map((e,i) => 
            <div key = {i} className = 'post'>
                <div className = 'titleOnPost'>{e.title}</div>
                <br/>
                {e.post}
                <br/>
                <div className = 'postinfo'>
                    <div className = 'postname'>{e.displayname}</div>
                    <div className = 'dateandtime'>{moment(e.date).format('M/D/YY')}</div>
                    <div className = 'dateandtime'>{moment(e.date).format('h:mm')}</div> 
                </div> 
                <br/>
                <button className='smallbutton' onClick = {() =>  { this.handlePopUp(e) }}>Edit</button>
                <button className='smallbutton' onClick = {(id) => {this.deleteblogpost(e.id)}}>Delete</button>
            </div> 
        )  
        return (
            <div>
                <Navbar/>
                <div className = 'reset'>
                    <input type='text' name = 'title' value = {this.state.title} onChange = {this.handleChange} className='input' placeholder = 'Title'/>
                    <textarea type='text' name = 'blogpost' value = {this.state.blogpost} onChange = {this.handleChange} id='blogpost' placeholder = 'Content'/>
                    <button className='button' onClick = {() => {this.addBlogPost()}}>Post</button>
                    <div className = {this.state.editpopup ? 'editpopup animated fadeInUp' : 'editpopuphide animated fadeOutUp'}>
                        <input type='text' name = 'title' className='input' placeholder = 'Title' value = {this.state.title} onChange = {this.handleChange}/>
                        <textarea type='text' name = 'blogpost' id='blogpost' style = {{height: '340px'}} placeholder = 'Content' value = {this.state.blogpost} onChange = {this.handleChange}/>
                        <button className='button' onClick = {this.cancel} style = {{margin: '30px 10px 10px 10px'}}>Cancel</button>
                        <button className = 'button' style = {{margin: '30px 10px 10px 10px'}} onClick = {(id) => {this.editBlogPost(this.state.id)}}>Update</button> 
                    </div>
                    {mappedposts}
                </div>
            </div> 
        )
    }
}