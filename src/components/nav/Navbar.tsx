import  { useEffect, useRef, useState } from "react";
import i18n from "../../i18n";
import { modelActions } from "../../store/modelSlice";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useLanguage from "../../hooks/useLanguage";
import './navbar.css'
import { FaUser } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { LuLogOut  } from "react-icons/lu";
import { useLogoutMutation } from "../../apis/authSlice";
import enFlag from '../../assets/img/dashboard/en flag.svg'
import frFlag from '../../assets/img/dashboard/fr flag.jpg'


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const {t} = useTranslation()
   useLanguage()

   const [logout] = useLogoutMutation();
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
    // document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toggoleSideBar = ()=>{
    dispatch(modelActions.setOpenSidebar())
  }

  const handleLogOut = async () => {
    const data = await logout();
    console.log(data);
    if (data?.data?.status === 200) {
      localStorage.removeItem("auth_data");
      navigate("/");
    }
  };
  return (
    <div>
      <header className="antialiased">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-5 dark:bg-gray-800">
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

             <div className="flex gap-10 items-center">
             {i18n.language === "en" ? (
                <a
                  href=""
                  onClick={() => changeLanguage("ar")}
                   className=" cursor-pointer flex gap-3 items-center font-semibold px-[3px] rounded-[4px]"
                >
                  <img src={frFlag} className="h-5 w-7 rounded-[4px]" alt="" /> <span>Fr</span>
                </a>
              ) : (
                <a
                  href=""
                  onClick={() => changeLanguage("en")}
                   className=" cursor-pointer flex gap-3 items-center font-semibold px-[3px] rounded-[4px]"
                >
                  <img src={enFlag} className="h-7 w-7 rounded-[4px]" alt="" /> <span>En</span>
                </a>
              )}
<div className="h-5 border border-gray-300"></div>
              <div className="flex">
                <h6>admin</h6>
              </div>
             </div>
           <div  className="relative rounded-full">
           <button
                type="button"
                className="flex mx-3 text-sm bg-gray-800 border-[2px] border-gray-200 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="dropdown"
                onClick={() => setIsOpen(!isOpen)}
             
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-10 h-10 rounded-full "
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user photo"
                />
              </button>

              <div ref={dropdownRef} className={`  bg-white ${isOpen? "flex": "hidden"} flex-col transition-all ease-out duration-1000 absolute top-[50px]   z-50 ltr:right-0 rtl:left-0 p-2 w-[130px]  rounded-[4px] border-[1px] border-[#eaebed]`}>
                <Link to="" className="flex gap-2 text-[16px] font-semibold  items-center"> <FaUser className="size-5" /> Profile</Link>
                <Link to="" className="flex gap-2 text-[16px] font-semibold  items-center"> <IoMdSettings  className="size-5" /> settings</Link>
                <button onClick={handleLogOut}  className="flex gap-2 text-[16px] font-semibold  items-center"> <LuLogOut   className="size-5" /> log out</button>
               
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
