import React from 'react';
import { Link, Navigate, NavLink, Outlet } from 'react-router';
import { toast } from 'react-toastify';
import {
    LayoutDashboard,
    UserCircle,
    CalendarCheck,
    Clock,
    Settings,
    PlusCircle,
    Wrench,
    Wallet,
    ClipboardList,
    CheckCircle,
    History,
    Home,
    LogOut,
    Menu,
    Coins,
    ShieldCheck,
    UserPlus
} from 'lucide-react';

import useAuth from '../../Hooks/useAuth';
import useRole from '../../Hooks/useRole';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Components/Loader/Loader';
import Logo from '../../Components/Logo/Logo';

const DashBoardLayout = () => {
    const { user, SignOUtUser, loading } = useAuth();
    const { role, isLoading } = useRole();


    const axiosSecure = useAxiosSecure();

    const handelLogout = () => {
        SignOUtUser()
            .then(() => toast.success('Logged out successfully'))
            .catch(error => toast.error(error.code));
    };

    const { data: decoratorData = {}, isLoading: statusLoading, refetch } = useQuery({
        queryKey: ['workingStatus', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/decorator/${user?.email}`);
            return result.data;
        },
        enabled: !!user && role === 'decorator'
    });

    const { workingStatus } = decoratorData;

    const handelUpdateWorkingStatus = async (checked) => {
        const newStatus = checked ? 'available' : 'working';
        await axiosSecure.patch(`/decorators/update/${user?.email}`, { workingStatus: newStatus });
        refetch();
    };

    if (isLoading) return <div className='h-screen flex items-center justify-center'><Loader /></div>;

    const navItemClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm group ${isActive
            ? 'bg-primary/10 text-primary border-r-4 border-primary shadow-sm'
            : 'hover:bg-base-200 text-base-content/60 hover:text-base-content'
        }`;

    return (
        <div className="bg-base-100 min-h-screen">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content flex flex-col bg-slate-50/50">
                    {/* --- Modern Glassmorphism Navbar --- */}
                    <header className="navbar bg-base-100/80 backdrop-blur-md px-6 border-b border-base-200 sticky top-0 z-20 h-16">
                        <div className="navbar-start lg:hidden">
                            <label htmlFor="my-drawer" className="btn btn-ghost btn-circle">
                                <Menu size={22} />
                            </label>
                        </div>

                        <div className="navbar-start hidden lg:flex">
                            {/* <h1 className="text-lg font-semibold tracking-tight">Dashboard Overview</h1> */}
                        </div>

                        <div className="navbar-end gap-3">
                            {role === 'decorator' && (
                                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                                    <span className={`text-[10px] font-black uppercase tracking-wider ${workingStatus === 'working' ? 'text-orange-500' : 'text-green-600'}`}>
                                        {workingStatus}
                                    </span>
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary toggle-sm"
                                        checked={workingStatus === 'available'}
                                        onChange={(e) => {
                                            handelUpdateWorkingStatus(e.target.checked)
                                        }}
                                    />
                                </div>
                            )}

                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="avatar hover:opacity-80 transition-opacity">
                                    <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={user?.photoURL || "https://ui-avatars.com/api/?name=" + user?.displayName} alt="profile" />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-2xl w-56 border border-base-200">
                                    <div className="px-4 py-3 border-b border-base-100 mb-1">
                                        <p className="text-sm font-bold truncate">{user?.displayName}</p>
                                        <p className="text-[10px] opacity-50 truncate">{user?.email}</p>
                                    </div>
                                    <li><Link to="/"><Home size={16} /> Website Home</Link></li>
                                    <li><Link to="/dashboard/my-profile"><Settings size={16} /> Account Settings</Link></li>
                                    <li className="mt-2 pt-2 border-t border-base-100">
                                        <button onClick={handelLogout} className="text-error"><LogOut size={16} /> Sign Out</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </header>

                    {/* --- Page Area --- */}
                    <main className="">
                        <Outlet />
                    </main>
                </div>

                {/* --- Clean Sidebar --- */}
                <div className="drawer-side z-30">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <aside className="w-64 min-h-full bg-base-100 border-r border-base-200 flex flex-col p-5">
                        {/* StyleDecor Logo */}
                        <Link to={'/'} className='mb-10'>
                            <Logo />
                        </Link>

                        <nav className="flex-1 space-y-1">
                            {/* Admin Section */}
                            {role === 'admin' && (
                                <div className="pb-4">
                                    <p className="px-4 text-[11px] font-bold text-base-content/30 uppercase tracking-widest mb-3">Management</p>
                                    <NavLink end to="/dashboard" className={navItemClass}><LayoutDashboard size={18} /> Overview</NavLink>
                                    <NavLink to="/dashboard/admin/manage-decorators" className={navItemClass}><UserPlus size={18} /> Decorators</NavLink>
                                    <NavLink to="/dashboard/admin/manage-bookings" className={navItemClass}><CalendarCheck size={18} /> Bookings</NavLink>
                                    <NavLink to="/dashboard/admin/add-services" className={navItemClass}><PlusCircle size={18} /> Create Service</NavLink>
                                    <NavLink to="/dashboard/admin/manage-services" className={navItemClass}><Wrench size={18} /> Services List</NavLink>
                                    <NavLink to="/dashboard/admin/pending-decorator-payments" className={navItemClass}><Wallet size={18} /> Payouts</NavLink>
                                </div>
                            )}

                            {/* User Section */}
                            {role === 'user' && (
                                <div className="pb-4">
                                    <p className="px-4 text-[11px] font-bold text-base-content/30 uppercase tracking-widest mb-3">Customer</p>
                                    <NavLink end to="/dashboard" className={navItemClass}><CalendarCheck size={18} /> My Bookings</NavLink>
                                    <NavLink to="/dashboard/payment-history" className={navItemClass}><History size={18} /> My Payouts</NavLink>
                                </div>
                            )}

                            {/* Decorator Section */}
                            {role === 'decorator' && (
                                <div className="pb-4">
                                    <p className="px-4 text-[11px] font-bold text-base-content/30 uppercase tracking-widest mb-3">Decorator Workspace</p>

                                    <NavLink end to="/dashboard" className={navItemClass}><ClipboardList size={18} /> Active Tasks</NavLink>

                                    <NavLink to="/dashboard/decorator/update-status" className={navItemClass}><CheckCircle size={18} /> Progress</NavLink>

                                    <NavLink to="/dashboard/decorator/todays-schedule" className={navItemClass}><Clock size={18} /> Schedule</NavLink>

                                    <NavLink to="/dashboard/decorator/earnings" className={navItemClass}><Coins size={18} /> Income</NavLink>

                                    <NavLink to="/dashboard/decorator-payment-history" className={navItemClass}><History size={18} /> Payout Logs</NavLink>
                                </div>
                            )}

                            <div className="pt-4 mt-4 border-t border-base-200">
                                <p className="px-4 text-[11px] font-bold text-base-content/30 uppercase tracking-widest mb-3">Profile</p>
                                <NavLink to="/dashboard/my-profile" className={navItemClass}><UserCircle size={18} /> My Account</NavLink>
                            </div>
                        </nav>

                        {/* User Summary at Bottom */}
                        <div className="mt-auto pt-4 bg-slate-50 -mx-5 -mb-5 p-5 border-t border-base-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase">
                                    {role?.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-xs font-bold capitalize">{role} Account</p>
                                    <p className="text-[10px] opacity-50">Verified Member</p>
                                </div>
                            </div>
                            <Link to={'/'} className="btn btn-error btn-sm btn-block btn-outline border-none hover:bg-error/10 text-error">
                                <LogOut size={14} /> Exit Dashboard
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;