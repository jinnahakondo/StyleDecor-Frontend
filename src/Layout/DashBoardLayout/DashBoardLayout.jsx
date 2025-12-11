import React from 'react';
import Navbar from '../../Components/Header/Navbar';
import SideBar from '../../Components/SideBar/SideBar';
import { Link, NavLink, Outlet } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaCalendarCheck } from "react-icons/fa6";
import { ReceiptText } from 'lucide-react';
import useRole from '../../Hooks/useRole';
import { FaUserCog } from "react-icons/fa";
import Loader from '../../Components/Loader/Loader';
import { LuCalendarCog } from "react-icons/lu";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";

const DashBoardLayout = () => {
    const { user, SignOUtUser } = useAuth()
    const { role, isLoading } = useRole()
    // const role = 'admin'

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
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/services'}> Services</NavLink></li>
        <li><NavLink to={'/about'}>About</NavLink></li>
        <li><NavLink to={'/contact'}> Contact</NavLink></li>
    </>

    if (isLoading) <Loader />
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
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
                    <div className="px-10 py-4 ">
                        <Outlet />
                    </div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-white is-drawer-close:w-14 is-drawer-open:w-64 border-r border-gray-300">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow space-y-3">
                            {/* List item */}
                            <li className='mt-14'>
                                <NavLink to={'/dashboard'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard" data-tip="Homepage">
                                    {/* Home icon */}
                                    <AiOutlineHome className="text-2xl" />
                                    <span className="is-drawer-close:hidden">Homepage</span>
                                </NavLink>
                            </li>
                            {/* user links */}
                            {
                                role === 'user' && <>
                                    <li>
                                        <NavLink to={"/dashboard/myprofile"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard" data-tip="My Profile">
                                            {/* profile icon */}
                                            <CgProfile className="text-2xl" />
                                            <span className="is-drawer-close:hidden">
                                                My Profile
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/dashboard/my-bookings"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard" data-tip="My Bookings">
                                            {/* booking icon */}
                                            <FaCalendarCheck className="text-2xl" />
                                            <span className="is-drawer-close:hidden">
                                                My Bookings
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History
">
                                            {/* payment icon */}
                                            <ReceiptText className='text-2xl' />
                                            <span className="is-drawer-close:hidden">Payment History
                                            </span>
                                        </button>
                                    </li>
                                </>
                            }

                            {/* admin links */}
                            {
                                role === 'admin' && <>

                                    <li>
                                        <NavLink to={"/dashboard/myprofile"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard" data-tip="Manage Decorators ">
                                            {/* user icon */}
                                            <FaUserCog className="text-2xl" />
                                            <span className="is-drawer-close:hidden">
                                                Manage Decorators
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/dashboard/my-bookings"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard" data-tip="Manage Bookings">
                                            {/*manage booking icon */}
                                            <LuCalendarCog className="text-2xl" />
                                            <span className="is-drawer-close:hidden">
                                                Manage Bookings
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/dashboard/my-bookings"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard" data-tip=" Manage Services">
                                            {/*manage service icon */}
                                            <FaScrewdriverWrench className="text-2xl" />
                                            <span className="is-drawer-close:hidden">
                                                Manage Services
                                            </span>
                                        </NavLink>
                                    </li>
                                    {/* <li>
                                        <NavLink to={"/dashboard/my-bookings"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard" data-tip=" Assign Decorator">
                                            Assign Decorator icon
                                            <FaUserPlus className="text-2xl" />
                                            <span className="is-drawer-close:hidden">
                                                Assign Decorator
                                            </span>
                                        </NavLink>
                                    </li> */}
                                </>
                            }
                            {/* admin links */}

                            {/* List item */}

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashBoardLayout;