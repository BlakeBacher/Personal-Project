
import React, {Component} from 'react';
import axios from 'axios'
import Nav from './../NavBar/AdminNav'
import './AdminProducts.css'



export default class AdminProducts extends Component {
    constructor(){
        super()

        this.state = {
            products:'',
            hair:'',
            chemicaltreatment:'',
            lashes:''
        }
        this.handleChange = this.handleChange.bind(this)
        // this.uploadProducts = this.uploadProducts.bind(this)
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    componentDidMount(){
        axios.get('/api/getproducts').then((res) => {
            console.log(res.data)
            this.setState({
                products: res.data[0].products,
                hair: res.data[0].hair,
                chemicaltreatment: res.data[0].chemicaltreatment,
                lashes: res.data[0].lashes,
            })
        })
    }
    editProducts(){
        let body = {
            products: this.state.products,
            hair: this.state.hair,
            chemicaltreatment: this.state.chemicaltreatment,
            lashes: this.state.lashes
        }
        let id = 1
        axios.put(`/api/editproducts/${id}`, body).then(() => {
            alert('Success!')
        })
    }
     
    render() {
        return (
            <div>
            <Nav/>
            <div className = 'adminproducts'>
                <div className = 'productsinputtitle'>Product</div>
                <textarea type='text' className='productsinput' name = 'products'value = {this.state.products} placeholder = 'Product' onChange = {this.handleChange}/>
                <div className = 'productsinputtitle'>Hair</div>
                <textarea type='text' className='productsinput' name = 'hair'value = {this.state.hair} placeholder = 'Hair' onChange = {this.handleChange}/>
                <div className = 'productsinputtitle'>Chemical Treatment</div>
                <textarea type='text' className='productsinput' name = 'chemicaltreatment'value = {this.state.chemicaltreatment} placeholder = 'Chemical Treatment' onChange = {this.handleChange}/>
                <div className = 'productsinputtitle'>Lashes</div>
                <textarea type='text' className='productsinput' name = 'lashes'value = {this.state.lashes} placeholder = 'Lashes' onChange = {this.handleChange}/>
                <button className='button' onClick = {() => {this.editProducts()}}>Upload</button>
            </div> 
        </div>
        )
    }
}