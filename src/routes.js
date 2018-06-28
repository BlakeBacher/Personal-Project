import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import axios from 'axios'

//Admins
import AdminHome from './components/Admin/AdminHome/AdminHome'
import AdminInstagram from './components/Admin/AdminInstagram/AdminInstagram'
import AdminPricing from './components/Admin/AdminPricing/AdminPricing'
import Appointments from './components/Admin/Appointments/Appointments'
import AdminBlogandVlog from './components/Admin/AdminBlogandVlog/AdminBlogandVlog'
import AdminProducts from './components/Admin/AdminProducts/AdminProducts'


//Users
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Instagram from './components/Instagram/Instagram'
import BookAppointment from './components/BookAppointment/BookAppointment'
import Pricing from './components/Pricing/Pricing'
import Products from './components/Products/Products'
import BlogandVlog from './components/BlogandVlog/BlogandVlog'


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
        <Route exact path='/' component={Login} />
		<Route path='/home' component={Home} />
        <Route path='/instagram' component={Instagram} />
        <Route path='/pricing' component={Pricing} />
        <Route path='/blogandvlog' component={BlogandVlog}/>
        <Route path='/bookappointment' component={BookAppointment} />
        <Route path='/products' component={Products} />
		{/* Admin */}
		<PrivateRoute path = '/admin/home' component = {AdminHome}/>
		<PrivateRoute path = '/admin/instagram' component = {AdminInstagram}/>
		<PrivateRoute exact path='/admin/pricing' component={AdminPricing}/>
		<PrivateRoute  path = '/admin/blogandvlog' component = {AdminBlogandVlog}/>
        <PrivateRoute exact path='/admin/appointments' component={Appointments}/>
		<PrivateRoute exact path='/admin/products' component={AdminProducts}/>
    </Switch>
)