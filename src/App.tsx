import React from "react";

import Sidebar from "./components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./components/nav/Navbar";




const App: React.FC = () => {
 

  return (
    <>
      <div className="dashboard-wrapper">
     
      <div className="grid grid-cols-12">
        <div className="col-span-2"><Sidebar /></div>
        <div className="flex flex-col gap-6 col-span-10">  
          <Navbar/>
        <Outlet />
        </div>
      </div>

        
      
      </div>
    
    </>
  );
};

export default App;
