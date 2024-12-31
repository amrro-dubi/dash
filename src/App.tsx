import React, { useEffect } from "react"

import Sidebar from "./components/dashboard/sidebar/Sidebar"
import { Outlet } from "react-router-dom"
import Navbar from "./components/nav/Navbar"
import { useDispatch } from "react-redux"

import { useGetRecordsQuery } from "./apis/serveces"
import { permissionsActions } from "./store/permisions"

import { formatDateTime } from "./uitils/helpers"
// import { showAlert } from "./components/Error"

const App: React.FC = () => {
    const dispatch = useDispatch()
    const { data, isSuccess } = useGetRecordsQuery({ url: "admin/auth/permision", inValid: ["permisions"] })

    useEffect(() => {
        if (isSuccess) {
            //@ts-ignore
            dispatch(permissionsActions.setPermissions(data?.data?.permissions))
        }
    }, [isSuccess, data, dispatch])

  
  
 
    const date = new Date("2024-01-25T08:54:31.000000Z")

   console.log( formatDateTime(date))
    console.log(date.getHours(), date.getMinutes(), date.getSeconds())

//   useEffect(()=>{

//      const habndle = ()=>{
//         console.log("offline")
//         showAlert('error', 'You are offline')
//      }
//     // window.addEventListener('online', habndle);
//     window.addEventListener('offline', habndle);

   
//   },[])




    return (
        <>
            <div className="dashboard-wrapper" >
                
                    <div className="w-full flex">
                        
                       
                            <Sidebar />
                       
                        {/* <div
                            className={` ${openSidebar ? " !w-[100px] md:w-[220px] lg:!w-[350px] md:absolute lg:fixed top-0 left-0 z-9999  translate-x-[0px] " : "translate-x-[-300px] w-0 !px-0  overflow-hidden  "} duration-700   `}
                        >
                            <Sidebar />
                        </div> */}
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
