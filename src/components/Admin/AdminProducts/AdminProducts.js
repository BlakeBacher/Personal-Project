import React, {Component} from 'react';
import axios from 'axios'
import Navbar from './../../Navbar/Navbar'
import './AdminProducts.css'



export default class AdminProducts extends Component {
    constructor(){
        super()

        this.state = {
            products:'',
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    componentDidMount(){
        axios.get('/api/getproducts').then((res) => {
            this.setState({
                products: res.data[0].products,
            })
        })
    }
    editProducts(){
        let body = {
            products: this.state.products,
        }
        let id = 1
        axios.put(`/api/editproducts/${id}`, body).then(() => {
            alert('Success!')
        })
    }
     
    render() {
        return (
            <div>
            <Navbar/>
            <div className = 'adminproducts'>
                <div className = 'productsinputtitle'>Products</div>
                <textarea type='text' className='productsinput' name = 'products' value = {this.state.products} placeholder = 'Products' onChange = {this.handleChange}/>
                <button className='button' onClick = {() => {this.editProducts()}}>Upload</button>
            </div> 
        </div>
        )
    }
}