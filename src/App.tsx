import React from "react";

import Sidebar from "./components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="dashboard-wrapper">
        
        <div className=""> {t("homee")} </div>

        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default App;
