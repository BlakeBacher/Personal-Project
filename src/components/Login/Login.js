import React, { Component } from 'react';
import './Login.css'

export default class Login extends Component {
    render() {
        return (
            <div>
                <div className = 'logindiv'>
                    <div className='h1'>KjoStyles</div> 
                    <a href = {process.env.REACT_APP_LOGIN}>
                        <button className='loginbutton'>Login</button>
                    </a> 
                </div> 
            </div> 
        )
    }
}


