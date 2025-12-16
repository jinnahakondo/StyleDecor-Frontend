import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout"
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ServiceDetails from "../Pages/Service Details/ServiceDetails";
import DashBoardLayout from "../Layout/DashBoardLayout/DashBoardLayout";
import BeaDecorator from "../Pages/Be A Decorator/BeaDecorator";
import PrivateRoutes from "./PrivateRoutes";
import MyBookings from "../Pages/DashBoard/User/MyBookings";
import Loader from "../Components/Loader/Loader";
import PaymentSuccess from "../Pages/DashBoard/User/PaymentSuccess";
import PaymentHistroy from "../Pages/DashBoard/User/PaymentHistroy";
import TrackService from "../Pages/DashBoard/User/TrackService";
import MyProfile from "../Pages/DashBoard/User/MyProfile";
import AdminRoutes from "./AdminRoutes";
import ManageDecorators from "../Pages/DashBoard/Admin/ManageDecorators";
import ManageBookings from "../Pages/DashBoard/Admin/ManageBookings";
import ManageServices from "../Pages/DashBoard/Admin/ManageServices";
import AddService from "../Pages/DashBoard/Admin/AddService";
import DecoratorRoutes from "./DecoratorRoutes";
import AssignedProjects from "../Pages/DashBoard/Deocrator/AssignedProjects";
import UpdateStatus from "../Pages/DashBoard/Deocrator/UpdateStatus";
import TodaysSchedule from "../Pages/DashBoard/Deocrator/TodaysSchedule";
import Earnings from "../Pages/DashBoard/Deocrator/Earnings";
import UserRoutes from "./UserRoutes";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        hydrateFallbackElement: <Loader />,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/service-details/:id',
                Component: ServiceDetails
            },
            {
                path: '/be-a-decorator',
                element: <PrivateRoutes>
                    <BeaDecorator />
                </PrivateRoutes>
            },
        ]
    },
    {
        path: '/auth',
        Component: AuthLayout,
        children: [
            {
                index: true,
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            },
        ]
    },
    {
        path: '/dashboard',
        hydrateFallbackElement: <Loader />,
        element: <PrivateRoutes>
            <DashBoardLayout />
        </PrivateRoutes>,
        children: [
            {
                path: 'home',
                element: <p>Home</p>
            },
            {
                path: 'my-profile',
                Component: MyProfile
            },
            {
                path: 'my-bookings',
                element: <UserRoutes>
                    <MyBookings />
                </UserRoutes>
            },
            {
                path: 'payment-success',
                element: <UserRoutes>
                    <PaymentSuccess />
                </UserRoutes>
            },
            {
                path: 'payment-history',
                element: <UserRoutes>
                    <PaymentHistroy />
                </UserRoutes>
            },
            {
                path: 'admin/manage-decorators',
                element: <AdminRoutes>
                    <ManageDecorators />
                </AdminRoutes>
            },
            {
                path: 'admin/manage-bookings',
                element: <AdminRoutes>
                    <ManageBookings />
                </AdminRoutes>
            },
            {
                path: 'admin/add-services',
                element: <AdminRoutes>
                    <AddService />
                </AdminRoutes>
            },
            {
                path: 'admin/manage-services',
                element: <AdminRoutes>
                    <ManageServices />
                </AdminRoutes>
            },
            {
                path: 'decorator/asigned-projects',
                element: <DecoratorRoutes>
                    <AssignedProjects />
                </DecoratorRoutes>
            },
            {
                path: 'decorator/asigned-projects',
                element: <DecoratorRoutes>
                    <AssignedProjects />
                </DecoratorRoutes>
            },
            {
                path: 'decorator/update-status',
                element: <DecoratorRoutes>
                    <UpdateStatus />
                </DecoratorRoutes>
            },
            {
                path: 'decorator/todays-schedule',
                element: <DecoratorRoutes>
                    <TodaysSchedule />
                </DecoratorRoutes>
            },
            {
                path: 'decorator/earnings',
                element: <DecoratorRoutes>
                    <Earnings />
                </DecoratorRoutes>
            },
        ]
    },
    {
        path: '/track-service/:trakingId',
        Component: TrackService
    }
])