import React, {Component} from 'react';
import Nav from '../Navbar/Navbar'
import './Products.css'
import axios from 'axios'

export default class Products extends Component{
    constructor(){
        super()

        this.state = {
            products:[]
        }
    }

    componentDidMount(){
        axios.get('/api/getproducts').then((res) => {
            let resdata = res.data[0].products
            let string = resdata.split( "\n" )
            this.setState({products: string})
        })
    }

    render(){
        let mappedproducts = this.state.products.map((e,i) => 
            <div key = {i} className = 'mappedproducts'>{e}</div> 
        )
     return(
        <div>
            <Nav/>
            <div className = 'products'>
                <div className = 'textbox'>
                Products Currently Avalible:
                <br/>
                <br/>
                    {mappedproducts}
                </div> 
            </div> 
        </div>
     )
    }
}

