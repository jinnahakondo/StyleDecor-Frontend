import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import Container from '../Container/Container';
import useRole from '../../Hooks/useRole';

const Navbar = ({ style }) => {
    const { role, } = useRole()
    const { user, SignOUtUser } = useAuth()
    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/services'}> Services</NavLink></li>
        <li><NavLink to={'/about'}>About</NavLink></li>
        <li><NavLink to={'/contact'}> Contact</NavLink></li>
        {role === 'user' &&
            <li><NavLink to={'/be-a-decorator'}> Be A Decorator</NavLink></li
            >}
    </>

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
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-medium">
                                {links}
                            </ul>
                        </div>
                        <Link to={'/'} className="btn btn-ghost  lg:text-2xl text-primary font-bold">StyleDecor</Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 font-bold">
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
                                                src={user?.photoURL} />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex="-1"
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                        <li><Link to={'/dashboard'}>Dashboard</Link></li>
                                        <li><Link onClick={handelLogout}>Logout</Link></li>
                                    </ul>
                                </div>
                                :
                                <div className='flex flex-row gap-5'>
                                    <Link className="btn btn-primary" to={'/auth'}>Login</Link>
                                    <Link className="btn btn-outline btn-primary" to={'/be-a-decorator'}>Be a decorator</Link>
                                </div>
                        }
                    </div>
                </div>
            </Container>

        </div>
    );
};

export default Navbar;