import React from 'react';
import Navbar from '../../Components/Header/Navbar';
import SideBar from '../../Components/SideBar/SideBar';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import { Container } from 'lucide-react';
;

const DashBoardLayout = () => {
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

    const links = <>
        <li><NavLink>Home</NavLink></li>
        <li><NavLink> Services</NavLink></li>
        <li><NavLink>About</NavLink></li>
        <li><NavLink> Contact</NavLink></li>
    </>

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input
                 id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <div className=' bg-base-100 shadow-sm'>
                        <div className="navbar">
                            <div className="navbar-start">
                                {/* Sidebar toggle icon */}
                                <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost ">
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 `} fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                                </label>
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
                    </div>
                    {/* Page content here */}
                    <div className="p-4">Page Content</div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-white is-drawer-close:w-14 is-drawer-open:w-64 border-r border-gray-300">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">
                            {/* List item */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                    {/* Home icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                    <span className="is-drawer-close:hidden">Homepage</span>
                                </button>
                            </li>

                            {/* List item */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                    {/* Settings icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                    <span className="is-drawer-close:hidden">Settings</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashBoardLayout;