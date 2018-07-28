 import React, {Component} from 'react';
import Dropdown from './Dropdown';


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
            </header> 
            <Dropdown drawerToggle = {this.state.drawerToggle}/>
        </div>
        )
    }
}