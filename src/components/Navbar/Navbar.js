import React, {Component} from 'react';
import './Navbar.css'
import Dropdown from './Dropdown';
// import {Dropdownmenu, MenuItem} from 'react-bootstrap-dropdown-menu'
// import {Navdropdown} from 'react-bootstrap'

export default class Navbar extends Component{
    constructor(){
        super()

        this.state = {
            drawerToggle: false
        }
        this.handleToggle = this.handleToggle.bind(this)
    }


    handleToggle(){
        this.setState({drawerToggle: !this.state.drawerToggle})
    }

    render(){
     return(
        <div>
            <header>
                <div className = 'title'>KJOSTYLES</div>
                <div onClick = {this.handleToggle} className = {this.state.drawerToggle ? 'barbox barbox1' : 'barbox'}>
                    <div className = {this.state.drawerToggle ? 'bar bar1' : 'bar'}></div> 
                    <div className = {this.state.drawerToggle ? 'bar bar2' : 'bar'}></div> 
                </div>
                <ul className = 'list'>
                    <li className='listitem'></li>
                    <li className='listitem'></li>
                    <li className='listitem'></li>
                    <li className='listitem'></li>
                    <li className='listitem'></li>
                    <li className='listitem'></li>
                </ul>
            </header> 
            <Dropdown drawerToggle = {this.state.drawerToggle}/>
        </div>
        )
    }
}