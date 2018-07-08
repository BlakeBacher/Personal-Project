import React, {Component }from 'react';
import Nav from '../Navbar/Navbar'
import './Pricing.css'
import axios from 'axios'

export default class About extends Component {
    constructor(){
        super()

        this.state = {
            hair:'',
            chemicaltreatment:'',
            lashes:''
        }
    }

    componentDidMount(){
        axios.get('/api/getpricing').then((res) => {
            this.setState({
                hair: res.data[0].hair,
                chemicaltreatment: res.data[0].chemical_treatment,
                lashes: res.data[0].lashes
            })
        })
    }

    render(){
     return(
            <div>
                <Nav/>
                <div className = 'pricing'>
                <div className = 'productsinputtitle'>Hair</div>
                <textarea disabled type='text' className='productsinput' value = {this.state.hair}/>
                <div className = 'productsinputtitle'>Chemical Treatment</div>
                <textarea disabled type='text' className='productsinput' value = {this.state.chemicaltreatment}/>
                <div className = 'productsinputtitle'>Lashes</div>
                <textarea disabled type='text' className='productsinput' value = {this.state.lashes}/>
                </div>
            </div>
        )
    }
}