import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout"
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ServiceDetails from "../Pages/Service Details/ServiceDetails";
import DashBoardLayout from "../Layout/DashBoardLayout/DashBoardLayout";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/service-details/:id',
                Component: ServiceDetails
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
        Component: DashBoardLayout
    }
])