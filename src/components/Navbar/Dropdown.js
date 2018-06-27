import React from 'react';
import './animate.css'
import {Link} from 'react-router-dom'

export default (props) => {
    return (
        <div>
                <div className={props.drawerToggle ? 'dropdown animated fadeInDownBig' : 'hiddenDD dropdown'}>
                    <div>
                        <Link to = '/home'><li className = 'dropdownbutton'>Home</li></Link>
                        <Link to = '/Schedule'><li className = 'dropdownbutton'>Schedule</li></Link>
                        <Link to = '/blog'><li className = 'dropdownbutton'>Blog</li></Link>
                        <Link to = '/About'><li className = 'dropdownbutton'>About</li></Link>
                        <Link to = '/Contact'><li className = 'dropdownbutton'>Contact</li></Link>
                        <Link to = ''><li href = 'http://localhost:3030/auth/logout' className = 'dropdownbutton'>Logout</li></Link>
                    </div>
                </div>
        </div>
    )
};


