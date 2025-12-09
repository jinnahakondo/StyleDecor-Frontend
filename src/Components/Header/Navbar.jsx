import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import Container from '../Container/Container';

const Navbar = ({ style }) => {
    const links = <>
        <li><NavLink>Home</NavLink></li>
        <li><NavLink> Services</NavLink></li>
        <li><NavLink>About</NavLink></li>
        <li><NavLink> Contact</NavLink></li>
    </>
    const { user, SignOUtUser } = useAuth()

    const handelLogout = () => {
        SignOUtUser()
            .then(() => {
                toast.success('sign Out Successfull')
            })
            .catch(error => {
                toast.error(error.code)
            })
    }
    return (
        <div className=' bg-base-100 shadow-sm'>
            <Container>
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${style}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                {links}
                            </ul>
                        </div>
                        <a className="btn btn-ghost text-xl text-primary font-bold">StyleDecor</a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end">

                        {
                            user ?
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt="Tailwind CSS Navbar component"
                                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex="-1"
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                        <li>
                                            <a className="justify-between">
                                                Profile
                                                <span className="badge">New</span>
                                            </a>
                                        </li>
                                        <li><a>Settings</a></li>
                                        <li><Link onClick={handelLogout}>Logout</Link></li>
                                    </ul>
                                </div>
                                :
                                <Link className="btn btn-primary" to={'/auth'}>Login</Link>
                        }
                    </div>
                </div>
            </Container>

        </div>
    );
};

export default Navbar;