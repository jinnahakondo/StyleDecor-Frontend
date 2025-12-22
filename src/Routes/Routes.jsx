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
import Services from "../Pages/Services/Services";
import ErrorPage from "../Pages/ErrorPage";
import DecoratorHome from "../Pages/DashBoard/Deocrator/DecoratorHome";
import PendingDecoratorPayments from "../Pages/DashBoard/Admin/PendingDecoratorPayments";
import PaymentHistoryDecorator from "../Pages/DashBoard/Deocrator/PaymentHistoryDecorator";
import AdminDashBoard from "../Layout/Admin/AdminDashBoard";
import Contact from "../Pages/Contact/Contact";
import AboutUs from "../Pages/AboutUs/AboutUs";
import DashboardIndex from "./DashboardIndex";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        hydrateFallbackElement: <div className="h-screen grid place-items-center"> <Loader /></div>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/services',
                Component: Services
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
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/about',
                element: <AboutUs />
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
        hydrateFallbackElement: <div className="h-screen grid place-items-center"> <Loader /></div>,
        errorElement: <ErrorPage />,
        element: <PrivateRoutes>
            <DashBoardLayout />
        </PrivateRoutes>,
        children: [

            {
                path: 'my-profile',
                Component: MyProfile
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
                index: true,
                element: <PrivateRoutes>
                    <DashboardIndex />
                </PrivateRoutes>
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
                path: 'admin/pending-decorator-payments',
                element: <AdminRoutes>
                    <PendingDecoratorPayments />
                </AdminRoutes>
            },
            //decorator 

            {
                path: 'decorator/home',
                element: <DecoratorRoutes>
                    <DecoratorHome />
                </DecoratorRoutes>
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
            {
                path: 'decorator-payment-history',
                element: <DecoratorRoutes>
                    <PaymentHistoryDecorator />
                </DecoratorRoutes>
            },
        ]
    },
    {
        path: '/track-service/:trackingId',
        Component: TrackService
    },

])