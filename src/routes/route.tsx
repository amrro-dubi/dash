
import App from "../App";
import Home from "../components/homePage/Home";

import DashboardProfile from "../components/profile/profile";

import LoginPage from "../Pages/LoginPage";
import { AuthProvider } from "../components/AuthProvider/AuthProvider";
import ForgetPassword from "../components/Auth/forgetPass/ForgetPassword";
import PinInput from "../components/Auth/ConfirmCode/ConfirmCode";
import ResetPassword from "../components/Auth/resetPassword/ResetPassword";
import Admins from "../Pages/Admin/Admin";
import Roles from "../Pages/Roles/Roles";
import Cites from "../Pages/cites/Cites";



const routes = [
    {
        path: "/home",

        element:<AuthProvider><App /></AuthProvider> ,
        children: [
            {
            path: "/home",
            element: <Home />,
            children: [],
        },
            {
            path: "/home/profile",
            element: <DashboardProfile />,
            children: [],
        },
            {
            path: "/home/admins",
            element: <Admins />,
            children: [],
        },
            {
            path: "/home/roles",
            element: <Roles />,
            children: [],
        },
            {
            path: "/home/cites",
            element: <Cites />,
            children: [],
        },
    
    ],
    },
    {
        path: "/",
        element: <LoginPage />,
        children: [
           
    
    ],
    },
    {
        path: "/forgetPass",
        element: <ForgetPassword/>,
        children: [
           
    
    ],
    },
    {
        path: "/confirmCode",
        element: <PinInput/>,
        children: [
           
    
    ],
    },
    {
        path: "/resetPassword",
        element: <ResetPassword/>,
        children: [
           
    
    ],
    },
    // {
    //     path: "/test",
    //     element: <Test />,
    //     children: [
           
    
    // ],
    // },
 
    
 
];

export default routes;