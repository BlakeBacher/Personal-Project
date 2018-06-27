import React from 'react';
import './../../Navbar/animate.css'
import {Link} from 'react-router-dom'

export default (props) => {
    return (
        <div>
                <div className={props.drawerToggle ? 'dropdown animated fadeInDownBig' : 'hiddenDD dropdown'}>
                    <div>
                        <Link to = '/admin/home'><li className = 'dropdownbutton'>Home</li></Link>
                        <Link to = '/admin/instagram'><li className = 'dropdownbutton'>Instagram</li></Link>
                        <Link to = '/admin/blogandvlog'><li className = 'dropdownbutton'>Blog & Vlog</li></Link>
                        <Link to = '/admin/pricing'><li className = 'dropdownbutton'>Pricing</li></Link>
                        <Link to = '/admin/appointments'><li className = 'dropdownbutton'>Appointments</li></Link>
                        <Link to = '/admin/products'><li className = 'dropdownbutton'>Products</li></Link>
                        <Link to = ''><li href = 'http://localhost:3030/auth/logout' className = 'dropdownbutton'>Logout</li></Link>
                    </div>
                </div>
        </div>
    )
};


