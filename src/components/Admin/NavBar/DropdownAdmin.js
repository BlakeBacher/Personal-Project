import React from 'react';
import './../../Navbar/animate.css'
import {Link} from 'react-router-dom'

export default (props) => {
    return (
        <div>
                <div className={props.drawerToggle ? 'dropdown animated fadeInDownBig' : 'hiddenDD dropdown'}>
                    <div>
                        <Link to = '/admin/home'><li className = 'dropdownbutton border'>Home</li></Link>
                        <Link to = '/admin/instagram'><li className = 'dropdownbutton border'>Instagram</li></Link>
                        <Link to = '/admin/blogandvlog'><li className = 'dropdownbutton border'>Blog & Vlog</li></Link>
                        <Link to = '/admin/pricing'><li className = 'dropdownbutton border'>Pricing</li></Link>
                        <Link to = '/admin/appointments'><li className = 'dropdownbutton border'>Appointments</li></Link>
                        <Link to = '/admin/products'><li className = 'dropdownbutton border'>Products</li></Link>
                        <Link to = ''><li href = 'http://localhost:3030/auth/logout' className = 'dropdownbutton border'>Logout</li></Link>
                    </div>
                </div>
        </div>
    )
};


