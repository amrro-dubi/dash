import React, { useEffect, useState } from "react"

import Sidebar from "./components/dashboard/Sidebar"
import { Outlet } from "react-router-dom"
import Navbar from "./components/nav/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./store"
import { useGetRecordsQuery } from "./apis/serveces"
import { permissionsActions } from "./store/permisions"
import { modelActions } from "./store/modelSlice"

const App: React.FC = () => {
    const dispatch = useDispatch()
    const { data, isSuccess } = useGetRecordsQuery({ url: "admin/auth/permision", inValid: ["permisions"] })

    useEffect(() => {
        if (isSuccess) {
            //@ts-ignore
            dispatch(permissionsActions.setPermissions(data?.data?.permissions))
        }
    }, [isSuccess, data, dispatch])

    const { openSidebar } = useSelector((state: RootState) => state.Model)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    
    useEffect(() => {

        if (windowWidth > 1024) {
            dispatch(modelActions.setOpenSidebar())
        }
    }, [windowWidth, dispatch]);
 
      
    return (
        <>
            <div className="dashboard-wrapper" >
                
                    <div className="w-full flex">
                        
                        <div
                            className={` ${openSidebar ? "lg:block !w-[100px] md:w-[220px] lg:!w-[350px] " : "w-0 !px-0  overflow-hidden  "} duration-700   `}
                        >
                            <Sidebar />
                        </div>
                        <div
                            className={` flex flex-col   w-full  duration-700   !overflow-hidden bg-white min-h-screen`}
                        >
                            <Navbar />
                            <Outlet />
                        </div>

                    </div>
             
            </div>
        </>
    )
}

export default App
