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
            <div style ={{ height: '100vh', display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center', fontSize: '30px'}}>
                <p>Please switch to a mobile device. Thank you.</p>
                <br/>
                <p>- kjostyles</p>
            </div> 
        )
    }
}


