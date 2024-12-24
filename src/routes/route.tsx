
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
import Areas from "../Pages/Area/Area";
import Developers from "../Pages/Developers/Developers";
import Amenites from "../Pages/Amenites/Amenites";
import CanvasComponent from "../Pages/Canvas";
import Types from "../Pages/PropertyTypes/Types";
import Categories from "../Pages/Categories/Categories";
import Properties from "../Pages/property/Properties";
import PropertyForm from "../Pages/property/PropertyForm";
import EditPropertyForm from "../Pages/property/EditPropertyForm";
import ChangePassword from "../Pages/ChangePassword";
import Services from "../Pages/services/Services";



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
            {
            path: "/home/areas",
            element: <Areas />,
            children: [],
        },
            {
            path: "/home/developers",
            element: <Developers />,
            children: [],
        },
            {
            path: "/home/amenites",
            element: <Amenites />,
            children: [],
        },
            {
            path: "/home/types",
            element: <Types />,
            children: [],
        },
            {
            path: "/home/categories",
            element: <Categories />,
            children: [],
        },
        {
            path: "/home/services",
            element: <Services />,
            children: [],
        },
            {
            path: "/home/properties",
            element: <Properties />,
            children: [],
        },
            {
            path: "/home/propertiesForm",
            element: <PropertyForm />,
            children: [],
        },
            {
            path: "/home/ediPropertiesForm/:propertyId",
            element: <EditPropertyForm />,
            children: [],
        },
            {
            path: "/home/canvas",
            element: <CanvasComponent />,
            children: [],
        },
            {
            path: "/home/changePassword",
            element: <ChangePassword />,
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