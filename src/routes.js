import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import axios from 'axios'

import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Schedule from './components/Schedule/Schedule'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Blog from './components/Blog/Blog'
import Admin from './components/Admin/Admin'


///////////this is how to make an admin login page.///////////
class PrivateRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticated: null
		};
	}

	componentDidMount() {
		axios.get("/auth/me").then(response => {
			this.setState({
				authenticated: response
			});
    })
    .catch(err => {
      this.setState({authenticated: false})

    });
	}

	render() {
    const {component: Component, ...rest} = this.props
		return this.state.authenticated === null ? (
			<div>Loading...</div>
		) : this.state.authenticated === false ? (
			<Redirect to="/" />
		) : (
			<Component {...this.props} />
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
        <PrivateRoute path='/admin' component={Admin} />
    </Switch>
)