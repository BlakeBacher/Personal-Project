import React from 'react';
import './animate.css'
import {Link} from 'react-router-dom'

export default (props) => {
    return (
        <div>
                <div className={props.drawerToggle ? 'dropdown animated fadeInDownBig' : 'hiddenDD dropdown'}>
                    <div>
                        <Link to = '/home'><li className = 'dropdownbutton border'>Home</li></Link>
                        <Link to = '/instagram'><li className = 'dropdownbutton border'>Instagram</li></Link>
                        <Link to = '/blogandvlog'><li className = 'dropdownbutton border'>Blog & Vlog</li></Link>
                        <Link to = '/pricing'><li className = 'dropdownbutton border'>Pricing</li></Link>
                        <Link to = '/bookappointment'><li className = 'dropdownbutton border'>Book Appointment</li></Link>
                        <Link to = '/products'><li className = 'dropdownbutton border'>Products</li></Link>
                        <Link to = ''><li href = 'http://localhost:3030/auth/logout' className = 'dropdownbutton border'>Logout</li></Link>
                    </div>
                </div>
        </div>
    )
};


