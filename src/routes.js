import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import axios from 'axios'

//Admins
import AdminHome from './components/Admin/Home/AdminHome'
import Appointments from './components/Admin/Appointments/Appointments'
import AdminBlog from './components/Admin/Blog/AdminBlog'


//Users
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Schedule from './components/Schedule/Schedule'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Blog from './components/Blog/Blog'


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
        <Route exact path='/' component={Login} />
        <Route path='/home' component={Home} />
        <Route path='/schedule' component={Schedule} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
        <Route path='/blog' component={Blog}/>
		<PrivateRoute path = '/admin/home' component = {AdminHome}/>
		<PrivateRoute  path = '/admin/blog' component = {AdminBlog}/>
        <PrivateRoute exact path='/admin/Appointments' component={Appointments}/>
    </Switch>
)