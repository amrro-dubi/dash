import  { useEffect, useRef, useState } from "react";
import i18n from "../../i18n";
import { modelActions } from "../../store/modelSlice";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {t} = useTranslation()
  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("language");

    document.documentElement.dir = savedLanguage
      ? savedLanguage === "ar"
        ? "rtl"
        : "ltr"
      : "rtl";
  }, []);
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);

    window.localStorage.setItem("language", lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  const dispatch = useDispatch()
  const toggoleSideBar = ()=>{
    dispatch(modelActions.setOpenSidebar())
  }

  
  return (
    <div>
      <header className="antialiased">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
              <button
           onClick={toggoleSideBar}
                id="toggleSidebar"
                aria-expanded="true"
                aria-controls="sidebar"
                className="hidden p-2 mr-3 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  {" "}
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h14M1 6h14M1 11h7"
                  />{" "}
                </svg>
              </button>
              <button
  onClick={toggoleSideBar}
                aria-expanded="true"
                aria-controls="sidebar"
                className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
                <span className="sr-only">Toggle sidebar</span>
              </button>
            </div>

            <div className="flex items-center lg:order-2 gap-4 ">
              {i18n.language === "en" ? (
                <a
                  href=""
                  onClick={() => changeLanguage("ar")}
                   className="font-medium cursor-pointer text-[#efb93f] border-[1px] border-[#efb93f] px-[3px] rounded-[4px]"
                >
                  Ar
                </a>
              ) : (
                <a
                  href=""
                  onClick={() => changeLanguage("en")}
                  className="font-medium cursor-pointer text-[#efb93f] border-[1px] border-[#efb93f] px-[3px] rounded-[4px]"
                >
                  En
                </a>
              )}
           <div className="relative">
           <button
                type="button"
                className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="dropdown"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user photo"
                />
              </button>

              <div ref={dropdownRef} className={`  bg-white ${isOpen? "flex": "hidden"} transition-all ease-out duration-1000 absolute top-[50px] text-[#efb93f] ltr:right-0 rtl:left-0 px-2 py-4 w-[170px] shadow-lg`}>
                <Link to="/home/changePassword">  {t("auth.resetPassword.changeTitle")}</Link>
          </div>
           </div>
        
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
