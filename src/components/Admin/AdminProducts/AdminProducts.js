
import React, {Component} from 'react';
import axios from 'axios'
import Nav from './../NavBar/AdminNav'
import './AdminProducts.css'



export default class AdminProducts extends Component {
    constructor(){
        super()

        this.state = {
            products:''
        }
        this.handleChange = this.handleChange.bind(this)
        // this.uploadProducts = this.uploadProducts.bind(this)
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    componentDidMount(){
        axios.get('/api/getproducts').then((res) => {
            this.setState({products: res.data[0].products})
        })
    }
    editProducts(){
        let body = {products: this.state.products}
        let id = 1

        axios.put(`/api/editproducts/${id}`, body).then(() => {
            alert('Success!')
        })
    }
     
    render() {
        return (
            <div>
            <Nav/>
            <div className = 'pricing'>
                <textarea type='text' className='pricinginput' name = 'products'value = {this.state.products} placeholder = 'Type Avalible Products' onChange = {this.handleChange}/>
                <button className='button' onClick = {() => {this.editProducts()}}>Upload</button>
            </div> 
        </div>
        )
    }
}