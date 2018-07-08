import React, {Component} from 'react';
import Nav from '../Navbar/Navbar'
import './Products.css'
import axios from 'axios'

export default class Products extends Component{
    constructor(){
        super()

        this.state = {
            products:'',
        }
    }

    componentDidMount(){
        axios.get('/api/getproducts').then((res) => {
            this.setState({
                products: res.data[0].products,
            })
        })
    }

    render(){
     return(
        <div>
            <Nav/>
            <div className = 'products'>
                <div className = 'productsinputtitle'>Products</div>
                <textarea disabled type='text' className='productsinput' value = {this.state.products}/>
            </div> 
        </div>
     )
    }
}

