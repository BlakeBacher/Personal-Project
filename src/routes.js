import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Schedule from './components/Schedule/Schedule'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Blog from './components/Blog/Blog'

export default(
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/home' component={Home} />
        <Route path='/schedule' component={Schedule} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
        <Route path='/blog' component={Blog}/>
        {/* <Route path='/settings' component={Settings} />   Admin Only  */}
    </Switch>
)