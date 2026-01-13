import React, { use, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import Container from '../Container/Container';
import useRole from '../../Hooks/useRole';
import Logo from '../Logo/Logo';
// import { themeChange } from 'theme-change'
import PrimaryButton from '../buttons/PrimaryButton';

const Navbar = ({ style }) => {

    const [theme, setTheme] = useState('light')

    useEffect(() => {

        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            setTheme(savedTheme)
        }
        document.documentElement.setAttribute("data-theme", savedTheme)

    }, [theme])

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
            {
                role === 'decorator' && (
                    <li><NavLink to='/dashboard'>My Tasks</NavLink></li>
                )
            }
            {
                role === 'admin' && (
                    <li><NavLink to='/dashboard'>My Dashboard</NavLink></li>
                )
            }
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
        <div className='bg-base-100 shadow-sm top-0 z-9999 fixed w-full'>
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

                    <div className="navbar-end flex items-center gap-3">

                        <label className="swap swap-rotate ">
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" className="theme-controller" value="synthwave" checked={theme === 'dark'}
                                onChange={() => {
                                    const newTheme = theme === 'light' ? 'dark' : 'light';
                                    setTheme(newTheme);
                                    document.documentElement.setAttribute('data-theme', newTheme);
                                    localStorage.setItem('theme', newTheme);
                                }} />

                            {/* sun icon */}
                            <svg
                                className="swap-off h-7 w-7 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            {/* moon icon */}
                            <svg
                                className="swap-on h-7 w-7 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>

                        {user ? (
                            <div className="dropdown dropdown-end ">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="User Profile"
                                            src={user?.photoURL}
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
                                <PrimaryButton path='/auth'>Login</PrimaryButton>
                                <PrimaryButton style={'btn-outline hidden sm:flex'} path='/be-a-decorator'>
                                    Join as Decorator
                                </PrimaryButton>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Navbar;