import React from 'react';
import './../../Navbar/animate.css'
import {Link} from 'react-router-dom'

export default (props) => {
    return (
        <div>
                <div className={props.drawerToggle ? 'dropdown animated fadeInDownBig' : 'hiddenDD dropdown'}>
                    <div>
                        <Link to = '/admin/home'><li className = 'dropdownbutton'>Home</li></Link>
                        <Link to = '/admin/Appointments'><li className = 'dropdownbutton'>Appointments</li></Link>
                        <Link to = '/admin/blog'><li className = 'dropdownbutton'>Blog</li></Link>
                        {/* <Link to = '/About'><li className = 'listitem'>About</li></Link>
                        <Link to = '/Contact'><li className = 'listitem'>Contact</li></Link> */}
                        <Link to = ''><li href = 'http://localhost:3030/auth/logout' className = 'dropdownbutton'>Logout</li></Link>
                    </div>
                </div>
        </div>
    )
};


