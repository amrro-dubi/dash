import React from "react";

import Sidebar from "./components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

import { useTranslation } from "react-i18next";


const App: React.FC = () => {
  const { t } = useTranslation();

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
