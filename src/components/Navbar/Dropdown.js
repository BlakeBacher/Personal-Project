import React from 'react';
import './Dropdown.css'
import './animate.css'
import {Link} from 'react-router-dom'

export default (props) => {
    return (
        <div>
                <div className={props.drawerToggle ? 'dropDown animated fadeInDownBig' : 'hiddenDD dropDown'}>
                    <div className='dropDownContent'>
                        <Link to = '/home'><div className = 'listitem'>Home</div></Link>
                        <Link to = '/Schedule'><div className = 'listitem'>Schedule</div></Link>
                        <Link to = '/blog'><div className = 'listitem'>Blog</div></Link>
                        <Link to = '/About'><div className = 'listitem'>About</div></Link>
                        <Link to = '/Contact'><div className = 'listitem'>Contact</div></Link>
                        <Link to = ''><div href = 'http://localhost:3030/auth/logout' className = 'listitem'>Logout</div></Link>
                    </div>
                </div>
        </div>
    )
};


