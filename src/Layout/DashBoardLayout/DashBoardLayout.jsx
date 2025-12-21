import React from 'react';
import Navbar from '../../Components/Header/Navbar';
import SideBar from '../../Components/SideBar/SideBar';
import { Link, NavLink, Outlet } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaCalendarCheck, FaClock } from "react-icons/fa6";
import { ReceiptText } from 'lucide-react';
import useRole from '../../Hooks/useRole';
import { FaMoneyCheckAlt, FaUserCog } from "react-icons/fa";
import Loader from '../../Components/Loader/Loader';
import { LuCalendarCog } from "react-icons/lu";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import { BiSolidCoinStack } from "react-icons/bi";
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdDashboard } from "react-icons/md";


const DashBoardLayout = () => {
    const { user, SignOUtUser, loading } = useAuth()
    const { role, isLoading } = useRole()

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

    const axiosSecure = useAxiosSecure()

    const { data = [], isLoading: statusLoading, isPending, refetch } = useQuery({
        queryKey: ['workingStatus', user?.email],
        queryFn: async () => {
            const result = axiosSecure.get(`/decorator/${user?.email}`)
            return (await result).data
        },
        enabled: !!user
    })
    const { workingStatus } = data;

    //toggle working status
    const handelUpdateWorkingStatus = async (checked) => {
        console.log(checked);
        if (checked) {
            const res = await axiosSecure.patch(`/decorators/update/${user?.email}`, { workingStatus: 'working' })
            console.log(res.data);
            refetch()
            return
        }
        if (!checked) {
            const res = await axiosSecure.patch(`/decorators/update/${user?.email}`, { workingStatus: 'available' })
            console.log(res.data);
            refetch()
            return
        }
    }

    if (isLoading) {
        return <span className='h-screen grid place-items-center'><Loader /></span>
    }


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
                                <Link to={'/'} className="btn btn-ghost text-xl text-primary font-bold">StyleDecor</Link>
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
                                                        src={user?.email} />
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
                    <div className="px-10 py-4 bg-gray-50 min-h-screen">
                        <Outlet />
                    </div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-white is-drawer-close:w-14 is-drawer-open:w-64 border-r border-gray-300">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow space-y-3">
                            {/* List item */}
                            {/* toggle button  */}
                            {
                                role === 'decorator' &&
                                <div className='flex items-center gap-2 mt-10'>
                                    <span className='text-green-600 font-medium text-lg is-drawer-close:hidden'>{workingStatus}</span>
                                    <input
                                        disabled={statusLoading || isPending || loading}
                                        checked={workingStatus === 'working'}
                                        onChange={(e) => handelUpdateWorkingStatus(e.target.checked)}
                                        type="checkbox"

                                        className="toggle border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-primary "
                                    />
                                </div>
                            }

                            {/* user links */}
                            {
                                role === 'user' && <>
                                    <li>
                                        <NavLink to={"/dashboard/my-bookings"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard mt-20" data-tip="My Bookings ">
                                            {/* booking icon */}
                                            <FaCalendarCheck className="text-2xl" />
                                            <span className="is-drawer-close:hidden">
                                                My Bookings
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/payment-history'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard" data-tip="Payment History
">
                                            {/* payment icon */}
                                            <ReceiptText className='text-2xl' />
                                            <span className="is-drawer-close:hidden">Payment History
                                            </span>
                                        </NavLink>
                                    </li>
                                </>
                            }

                            {/* admin links */}
                            {
                                role === 'admin' && <>

                                    <li>
                                        <NavLink to={"/dashboard/admin-dashboard"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard mt-20" data-tip="Dashboard">
                                            {/* user icon */}
                                            <MdDashboard className="text-2xl" />
                                            <span className="is-drawer-close:hidden">
                                                Dashboard
                                            </span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to={"/dashboard/admin/manage-decorators"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard" data-tip="Manage Decorators ">
                                            {/* user icon */}
                                            <FaUserCog className="text-2xl" />
                                            <span className="is-drawer-close:hidden">
                                                Manage Decorators
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/dashboard/admin/manage-bookings"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard" data-tip="Manage Bookings">
                                            {/*manage booking icon */}
                                            <LuCalendarCog className="text-2xl" />
                                            <span className="is-drawer-close:hidden">
                                                Manage Bookings
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/dashboard/admin/add-services"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard" data-tip=" Add Services">
                                            {/*manage service icon */}
                                            <IoIosAddCircleOutline className="text-3xl" />
                                            <span className="is-drawer-close:hidden">
                                                Add Services
                                            </span>

                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/dashboard/admin/manage-services"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard" data-tip=" Manage Services">
                                            {/*manage service icon */}
                                            <FaScrewdriverWrench className="text-2xl" />
                                            <span className="is-drawer-close:hidden">
                                                Manage Services
                                            </span>

                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/dashboard/admin/pending-decorator-payments"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard" data-tip=" Pending Decorator Payments">
                                            {/*manage service icon */}
                                            <FaMoneyCheckAlt className="text-2xl" />
                                            <span className="is-drawer-close:hidden">
                                                Pending Decorator Payments
                                            </span>

                                        </NavLink>
                                    </li>
                                </>
                            }
                            {/* decorators link  */}
                            {
                                role === 'decorator' && <>

                                    <li>
                                        <NavLink to={"/dashboard/decorator/asigned-projects"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard" data-tip=" Assigned Projects">
                                            {/*  icon */}
                                            <FaTasks className="text-2xl" />
                                            <span className="is-drawer-close:hidden">
                                                Assigned Projects
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/dashboard/decorator/update-status"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard" data-tip="Update Status">
                                            {/* icon */}
                                            <BsCheckCircle className="text-2xl" />
                                            <span className="is-drawer-close:hidden">
                                                Update Status
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/dashboard/decorator/todays-schedule"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard" data-tip="Today’s Schedule">
                                            {/* icon */}
                                            <FaClock className="text-2xl" />
                                            <span className="is-drawer-close:hidden">
                                                Today’s Schedule
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/dashboard/decorator/earnings"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard" data-tip="Earnings">
                                            {/*manage service icon */}
                                            <BiSolidCoinStack className="text-2xl" />
                                            <span className="is-drawer-close:hidden">
                                                Earnings
                                            </span>

                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/dashboard/decorator-payment-history'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard" data-tip="Payment History
">
                                            {/* payment icon */}
                                            <ReceiptText className='text-2xl' />
                                            <span className="is-drawer-close:hidden">Payment History
                                            </span>
                                        </NavLink>
                                    </li>
                                </>
                            }
                            <li>
                                <NavLink to={"/dashboard/my-profile"} className={`is-drawer-close:tooltip is-drawer-close:tooltip-right dashboard 
                                     `} data-tip="My Profile">
                                    {/* profile icon */}
                                    <CgProfile className="text-2xl" />
                                    <span className="is-drawer-close:hidden">
                                        My Profile
                                    </span>
                                </NavLink>
                            </li>
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