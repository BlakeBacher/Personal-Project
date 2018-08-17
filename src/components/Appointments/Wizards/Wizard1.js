import React, {Component} from 'react';
import Navbar from './../../Navbar/Navbar'
import {Link} from 'react-router-dom'

export default class Wizard1 extends Component{
    constructor(){
        super()

        this.state={
            check: null,
            phonenumber:''
        }
        this.numbercheck = this.numbercheck.bind(this)
    }

    numbercheck(e){
        this.setState({phonenumber: e.target.value, check: false})
        let phone = (e.target.value.replace(/\D/g,''))
        if(phone.length === 10){
            this.setState({check: true})
        }else{
            this.setState({check: false})
        }
    }

    render(){
        return(
            <div>
                <Navbar/>
                    <div className='wizardreset'>
                        <div className=''>
                            <input 
                                type='text'
                                className='input'
                                placeholder = 'Firstname'
                                name = 'firstname'
                                // value = {this.state.firstname}
                                // onChange = {this.handleChange}
                                required
                                />
                            <input 
                                type='text'
                                className='input'
                                placeholder = 'Lastname'
                                name = 'lastname'
                                // value = {this.state.lastname}
                                // onChange = {this.handleChange}
                                required
                                />
                            <input 
                                type='tel' 
                                className = {this.state.check === null ? 'input' : this.state.check === false ? 'input phonered' : 
                                this.state.check === true ? 'input phonegreen' : ''} 
                                placeholder = 'Phone Number' 
                                name = 'phonenumber' 
                                value = {this.state.phonenumber}
                                onChange = {this.numbercheck}
                                required
                                />
                        </div> 
                        <Link to='/wizard2'><button className='button wizbutton'>Next</button></Link>
                    </div>
            </div>
        )
    }
}