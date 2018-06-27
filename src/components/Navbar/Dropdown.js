import React from 'react';
import './animate.css'
import {Link} from 'react-router-dom'

export default (props) => {
    return (
        <div>
                <div className={props.drawerToggle ? 'dropdown animated fadeInDownBig' : 'hiddenDD dropdown'}>
                    <div>
                        <Link to = '/home'><li className = 'dropdownbutton'>Home</li></Link>
                        <Link to = '/instagram'><li className = 'dropdownbutton'>Instagram</li></Link>
                        <Link to = '/blogandvlog'><li className = 'dropdownbutton'>Blog & Vlog</li></Link>
                        <Link to = '/pricing'><li className = 'dropdownbutton'>Pricing</li></Link>
                        <Link to = '/bookappointment'><li className = 'dropdownbutton'>Book Appointment</li></Link>
                        <Link to = '/products'><li className = 'dropdownbutton'>Products</li></Link>
                        <Link to = ''><li href = 'http://localhost:3030/auth/logout' className = 'dropdownbutton'>Logout</li></Link>
                    </div>
                </div>
        </div>
    )
};


