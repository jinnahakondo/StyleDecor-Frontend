import React from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import Container from '../Container/Container';
import useRole from '../../Hooks/useRole';
import Logo from '../Logo/Logo';

const Navbar = ({ style }) => {
    const { role } = useRole();
    const { user, SignOUtUser } = useAuth();

    const links = (
        <>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/services'>Services</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/contact'>Contact</NavLink></li>
            {role === 'user' && (
                <li><NavLink to='/be-a-decorator'>Be A Decorator</NavLink></li>
            )}
        </>
    );

    const handleLogout = () => {
        SignOUtUser()
            .then(() => {
                toast.success('Sign Out Successful');
            })
            .catch(error => {
                toast.error(error.code);
            });
    };

    return (
        <div className='bg-base-100 shadow-sm sticky top-0 z-50 '>
            <Container>
                <div className="navbar px-0">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${style}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box 
                                z-[1] mt-3 w-52 p-2 shadow font-medium">
                                {links}
                            </ul>
                        </div>
                        <Link to='/' className="btn btn-ghost lg:text-2xl text-primary font-bold p-0">
                            <Logo />
                        </Link>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 font-bold gap-2">
                            {links}
                        </ul>
                    </div>

                    <div className="navbar-end">
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="User Profile"
                                            src={user?.photoURL || 'https://via.placeholder.com/150'}
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li className='px-4 py-2 font-semibold text-primary'>{user?.displayName}</li>
                                    <div className='divider my-0'></div>
                                    <li><Link to='/dashboard'>Dashboard</Link></li>
                                    <li><button onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </div>
                        ) : (
                            <div className='flex flex-row gap-2 lg:gap-5'>
                                <Link className="btn btn-primary btn-sm lg:btn-md" to='/auth'>Login</Link>
                                <Link className="btn btn-outline btn-primary btn-sm lg:btn-md hidden sm:flex" to='/be-a-decorator'>
                                    Join as Decorator
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Navbar;