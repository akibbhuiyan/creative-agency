import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logos/logo.png'
import { FiShoppingCart, FiHardDrive, FiPlus } from 'react-icons/fi';
import { BiMessageSquareDots } from 'react-icons/bi';
import { MdOutlinePersonAddAlt } from 'react-icons/md';
import './SideBar.css'
import { UserContext } from '../../../App';
const SideBar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        fetch(`https://boiling-everglades-64438.herokuapp.com/isAdmin`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setIsAdmin(data))
    })
    return (
        <div className="col-md-3">
            <div className='container-fluid'>
                <div className="logo mb-5 pt-3 ps-3">
                    <Link to='/home'><img src={logo} alt="" width='150px' /></Link>
                </div>
                <ul className='sidebar mt-5'>
                    {
                        !isAdmin && <>
                            <li>
                                <Link to='/order'><FiShoppingCart /> Order</Link>
                            </li>
                            <li>
                                <Link to='/service'><FiHardDrive /> Service List</Link>
                            </li>
                            <li>
                                <Link to='/review'><BiMessageSquareDots /> Review</Link>
                            </li>
                        </>
                    }
                    {
                        isAdmin &&
                        <>
                            <li>
                                <Link to='/service'><FiHardDrive /> Service List</Link>
                            </li>
                            <li>
                                <Link to='/addService'><FiPlus /> Add Service</Link>
                            </li>
                            <li>
                                <Link to='/makeAdmin'><MdOutlinePersonAddAlt /> Make Admin</Link>
                            </li>
                        </>
                    }

                </ul>
            </div>
        </div>
    );
};

export default SideBar;