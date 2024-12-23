import React, { useEffect } from "react"

import Sidebar from "./components/dashboard/Sidebar"
import { Outlet } from "react-router-dom"
import Navbar from "./components/nav/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./store"
import { useGetRecordsQuery } from "./apis/serveces"
import { permissionsActions } from "./store/permisions"

const App: React.FC = () => {
    const dispatch = useDispatch()
    const { data, isSuccess } = useGetRecordsQuery({ url: "admin/auth/permision", inValid: ["permisions"] })

    useEffect(() => {
        if (isSuccess) {
            //@ts-ignore
            dispatch(permissionsActions.setPermissions(data?.data?.permissions))
        }
    }, [isSuccess, data, dispatch])

    console.log("data feekll")
    const { openSidebar } = useSelector((state: RootState) => state.Model)
    return (
        <>
            <div className="dashboard-wrapper">
                {isSuccess && (
                    <div className="w-full flex">
                        <div
                            className={` ${openSidebar ? "w-0 !px-0  overflow-hidden" : "!w-[350px]"} duration-700   `}
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
                )}
            </div>
        </>
    )
}

export default App
