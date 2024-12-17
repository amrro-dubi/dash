import React from "react";

import Sidebar from "./components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "./store";





const App: React.FC = () => {
 
const {openSidebar} = useSelector((state:RootState)=> state.Model)
  return (
    <>
      <div className="dashboard-wrapper">
     
      <div className="w-full flex">
        <div className={` ${openSidebar ? "w-0 !px-0  overflow-hidden": "!w-[350px]"} duration-700   `}><Sidebar /></div>
        <div  className={` flex flex-col   w-full  duration-700   `}>  
      
          <Navbar/>
        <Outlet />
        </div>
      </div>

        
      
      </div>
    
    </>
  );
};

export default App;
