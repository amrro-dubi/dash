import React from "react";

import Sidebar from "./components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";




const App: React.FC = () => {
  localStorage.setItem("language",'ar')

  return (
    <>
      <div className="dashboard-wrapper">
     
      <div className="grid grid-cols-12">
        <div className="col-span-2"><Sidebar /></div>
        <div className="col-span-10">  <Outlet /></div>
      </div>

        
      
      </div>
    
    </>
  );
};

export default App;
