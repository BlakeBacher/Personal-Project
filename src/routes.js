import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import axios from 'axios'

//Admins
import Admin_Appointment from './components/Appointments/Admin_Appointment'
import AdminBlogandVlog from './components/BlogandVlog/AdminBlogandVlog'


//Users
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Instagram from './components/Instagram/Instagram'
import Client_Appointment from './components/Appointments/Client_Appointment'
import Pricing from './components/Pricing/Pricing'
import Products from './components/Products/Products'
import BlogandVlog from './components/BlogandVlog/BlogandVlog'


//Appointment Wizards
import Wizard1 from './components/Appointments/Wizards/Wizard1'
import Wizard2 from './components/Appointments/Wizards/Wizard2'
import Wizard3 from './components/Appointments/Wizards/Wizard3'
import Wizard4 from './components/Appointments/Wizards/Wizard4'




///////////this is how to make an admin login page.///////////
class PrivateRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticated: null
		};
	}

	componentDidMount() {
		axios.get("/auth/me").then(res => {
			this.setState({
				authenticated: res.data
			});
    })
    .catch(err => {
      this.setState({authenticated: false})

    });
	}

	render() {
    const {component: Component, /*...rest*/} = this.props
		return this.state.authenticated === null ? (
			<div>Loading...</div>
		) : this.state.authenticated === false ? (
			<Redirect to="/home" />
		) : (
			<Component {...this.props}/>
		);
	}
}
///////////////////////////////////////////////////////////////


export default(
    <Switch>
		{/* Client */}
        <Route exact path='/' component={Login}/>
		<Route path='/home' component={Home}/>
        <Route path='/instagram' component={Instagram}/>
        <Route path='/pricing' component={Pricing}/>
        <Route path='/blogandvlog' component={BlogandVlog}/>
        <Route path='/appointments' component={Client_Appointment}/>
        <Route path='/products' component={Products}/>
		<Route path='/wizard1' component={Wizard1}/>
		<Route path='/wizard2' component={Wizard2}/>
		<Route path='/wizard3' component={Wizard3}/>
		<Route path='/wizard4' component={Wizard4}/>
		
		{/* Admin */}
		<PrivateRoute  path = '/admin/blogandvlog' component = {AdminBlogandVlog}/>
        <PrivateRoute exact path='/admin/appointments' component={Admin_Appointment}/>
    </Switch>
)