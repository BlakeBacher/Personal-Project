import React, {Component} from 'react';
import Dropdown from './Dropdown';
import {connect} from 'react-redux'
import {getUser} from './../../ducks/reducer'


class Navbar extends Component{
    constructor(){
        super()
        
        this.state = {
            drawerToggle: false,
        }
        this.handleToggle = this.handleToggle.bind(this)
    }
    
    componentWillMount(){
        this.props.getUser()
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
            <Dropdown drawerToggle = {this.state.drawerToggle}
                      userAdmin = {this.props.user.admin}/>
        </div>
        )
    }
}


function mapStateToProps(state){
    return {
      user: state.user
    }
  }
  
  export default connect(mapStateToProps,{getUser})(Navbar)