import React from 'react';
import './Dropdown.css'
import './animate.css'
import {Link} from 'react-router-dom'

export default (props) => {
    return (
        <div>
                <div className={props.drawerToggle ? 'dropDown animated fadeInDownBig' : 'hiddenDD dropDown'}>
                    <div className='dropDownContent'>
                        <Link to = '/home'><li className = 'listitem'>Home</li></Link>
                        <Link to = '/Schedule'><li className = 'listitem'>Schedule</li></Link>
                        <Link to = '/blog'><li className = 'listitem'>Blog</li></Link>
                        <Link to = '/About'><li className = 'listitem'>About</li></Link>
                        <Link to = '/Contact'><li className = 'listitem'>Contact</li></Link>
                        <Link to = ''><li href = 'http://localhost:3030/auth/logout' className = 'listitem'>Logout</li></Link>
                    </div>
                </div>
        </div>
    )
};


