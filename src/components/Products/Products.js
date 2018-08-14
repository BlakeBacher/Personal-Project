import React, {Component} from 'react';
import Navbar from './../Navbar/Navbar'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUser} from '../../ducks/reducer'

class Products extends Component{
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

    render(){
     return(
        <div>
            <Navbar/>
            {this.props.user.admin ? 
                <div className = 'reset'>
                    <div className = 'productsinputtitle'>Products</div>
                    <textarea type='text' className='productsinput' name = 'products' value = {this.state.products} placeholder = 'Products' onChange = {this.handleChange}/>
                    <button className='button' onClick = {() => {this.editProducts()}}>Upload</button>
                </div>
            :
                <div className = 'reset'>
                    <div className = 'productsinputtitle'>Products</div>
                    <textarea disabled type='text' className='productsinput' value = {this.state.products}/>
                </div> 
            }
        </div>
     )
    }
}
function mapStateToProps(state){
    return {
      user: state.user
    }
  }
  
  export default connect(mapStateToProps,{getUser})(Products)
