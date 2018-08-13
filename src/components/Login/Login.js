import React, { Component } from 'react';
import './Login.css'

export default class Login extends Component {
    render() {
            if(window.innerWidth < 500){
                return(
                    <div className = 'login'>
                        <div className = 'logindiv'>
                            <div className='h1'>KjoStyles</div> 
                            <a href = {process.env.REACT_APP_LOGIN}>
                                <button className='button'>Login</button>
                            </a> 
                        </div> 
                    </div>
                )
            }
        return(
        <div className = 'login'>
            <div className='warning'>
                <p>Please switch to a mobile device for a better experecne. Thank you.</p>
                <p>-Kjostyles</p>
            </div> 
            <div className = 'logindiv'>
                <div className='h1'>Kjostyles</div> 
                <a href = {process.env.REACT_APP_LOGIN}>
                    <button className='button'>Login</button>
                </a> 
            </div> 
        </div>
        )
    }
}


