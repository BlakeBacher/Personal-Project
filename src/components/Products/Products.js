import React, {Component} from 'react';
import Nav from '../Navbar/Navbar'
import './Products.css'
import axios from 'axios'

export default class Products extends Component{
    constructor(){
        super()

        this.state = {
            products:'',
            hair:'',
            chemicaltreatment:'',
            lashes:''
        }
    }

    componentDidMount(){
        axios.get('/api/getproducts').then((res) => {
            this.setState({
                products: res.data[0].products,
                hair: res.data[0].hair,
                chemicaltreatment: res.data[0].chemicaltreatment,
                lashes: res.data[0].lashes,
            })
        })
    }

    render(){
     return(
        <div>
            <Nav/>
            <div className = 'products'>
                <div className = 'productsinputtitle'>Product</div>
                <textarea type='text' className='productsinput' value = {this.state.products}/>
                <div className = 'productsinputtitle'>Hair</div>
                <textarea type='text' className='productsinput' value = {this.state.hair}/>
                <div className = 'productsinputtitle'>Chemical Treatment</div>
                <textarea type='text' className='productsinput' value = {this.state.chemicaltreatment}/>
                <div className = 'productsinputtitle'>Lashes</div>
                <textarea type='text' className='productsinput' value = {this.state.lashes}/>
            </div> 
        </div>
     )
    }
}

