import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import sideBarImg from "../../../assets/img/dashboard/goldLogo.png";
import { useLogoutMutation } from "../../../apis/authSlice";
import { useTranslation } from "react-i18next";

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { MdAdminPanelSettings, MdOutlineDeveloperMode } from "react-icons/md";

import usePermissionGurd from "../../../hooks/permession/usePermissionGurd";
import { modelActions } from "../../../store/modelSlice";
import { useEffect, useState } from "react";
import AnimatedDev from "../../reusableComponents/animatedDev/AnimatedDev";

import { RiTeamFill } from "react-icons/ri";

import ProperitiesIcon from "../../Icon/ProperitiesIcon";
import PropSettingsIcon from "../../Icon/PropSettingsIcon";

import { MdLogout } from "react-icons/md";
import BlogsIcon from "../../Icon/BlogsIcon";
import { GrServices } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import './sidebar.css'

const Sidebar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { openSidebar } = useSelector((state: RootState) => state.Model);
  const { t } = useTranslation();
  const [logout] = useLogoutMutation();
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState<number | null>(null);
  const [currentSubItem, setCurrentSubItem] = useState<number | null>(null);

  //   const isActive = (path: string) =>
  //     pathname === path ? "bg-primary  rounded-[8px] " : "";
  const isSubMenu = (path: string) => {
    // setCurrentItem(null)
   
    return pathname === path ? "!text-primary " : "";
   
  };
  const isDrop = (id: number) =>
    id === currentItem ? "bg-primary active rounded-[8px] " : "";

  const setOpenHandler = (id: number) => {
    setCurrentSubItem(null);
    if (currentItem === null) {
      setCurrentItem(id);
      setOpen(true);
    } else if (currentItem === id) {
      setCurrentItem(id);
      setOpen(!open);
    } else if (id !== currentItem) {
      setCurrentItem(id);
      setOpen(true);
    } else {
      setCurrentItem(null);
      setOpen(false);
    }
    
  };

  const handleLogOut = async () => {
    const data = await logout();
    console.log(data);
    if (data?.data?.status === 200) {
      localStorage.removeItem("auth_data");
      navigate("/");
    }
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

 
  const dispatch = useDispatch();
  const toggoleSideBar = (id: number) => {
    setCurrentSubItem(null);
    if (currentItem === null) {
      setCurrentItem(id);
    } else if (currentItem === id) {
      setCurrentItem(id);
    } else {
      setCurrentItem(id);
      setOpen(false);
    }
    if (windowWidth < 1024) {
      dispatch(modelActions.setOpenSidebar());
    }
  };

  const openCloseSubMenu = (id: number) => {
    setCurrentSubItem(null);

    if (id === currentSubItem) {
      setCurrentSubItem(null);
    } else setCurrentSubItem(id);
    
  };

  const categoryPermission = usePermissionGurd("category", "view");
  const rolePermisstion = usePermissionGurd("role", "view");
  const cityPermission = usePermissionGurd("city", "view");
  const typePermission = usePermissionGurd("type", "view");
  const aminityPermission = usePermissionGurd("amenities", "view");
  const developerPermission = usePermissionGurd("developer", "view");
  const areasPermission = usePermissionGurd("area", "view");
  const adminPermission = usePermissionGurd("admin", "view");

  

  return (
    <div className={`  ${openSidebar? "open-sidebar" : "close-sidebar"}   `}>
    <div
      className={`dashboard-sidebar-wrapper  relative `}
    >
      <button className="absolute top-0 right-1 xl:hidden" onClick={()=>toggoleSideBar(0)} > <IoClose className="size-6 font-bold text-primary" /></button>
      <div className="dashboard-sidebar-logo">
        <Link to="/">
          <img
            className="w-[200px] h-[200px]"
            src={sideBarImg}
            alt="Dashboard Sidebar Logo"
          />
        </Link>
      </div>

      <div className="dashboard-sidebar-menu">
        <ul>
          {(areasPermission ||
            cityPermission ||
            developerPermission ||
            typePermission ||
            aminityPermission ||
            categoryPermission) && (
            <>
              <li
                onClick={() => setOpenHandler(3)}
                className={`${isDrop(
                  3
                )}  flex pe-2 justify-between items-center  `}
              >
                <div className="flex gap-2    w-full  py-[15px] ps-[25px] pe-[7px] ">
                  <ProperitiesIcon
                    color={currentItem === 3 ? "white" : "black"}
                  />

                  <h6 className=" text-[15px]">Property settings</h6>
                </div>
                {open && currentItem === 3 ? (
                  <IoIosArrowUp className="size-4" />
                ) : (
                  <IoIosArrowDown className="size-4" />
                )}
              </li>

              <AnimatedDev open={open && currentItem == 3}>
                {categoryPermission && (
                  <li>
                    <Link  to="/home/categories" className="!p-3 ">
                      <h6 className={isSubMenu("/home/categories")}>
                        - &nbsp; {t("tableForms.categoriesTitle")}
                      </h6>
                    </Link>
                  </li>
                )}

                {(areasPermission || cityPermission) && (
                  <>
                    <li
                      onClick={() => openCloseSubMenu(3)}
                      className={` flex pe-2 justify-between items-center text-white `}
                    >
                      <div className="flex gap-2  text-primary w-full  py-[15px]  px-[12px] ">
                        <h6 className="text-white text-[15px]">
                          - &nbsp; {t("tableForms.areasTitle")} &{" "}
                          {t("tableForms.citiesTitle")}
                        </h6>
                      </div>

                      {open && currentSubItem == 3 ? (
                        <IoIosArrowUp className="size-4" />
                      ) : (
                        <IoIosArrowDown className="size-4" />
                      )}
                    </li>
                    <AnimatedDev open={open && currentSubItem == 3}>
                      {areasPermission && (
                        <li>
                          <Link to="/home/areas" className="!p-3 ">
                            <h6 className={` ${isSubMenu("/home/areas")} `}>
                              - &nbsp; {t("tableForms.areasTitle")}
                            </h6>
                          </Link>
                        </li>
                      )}

                      {cityPermission && (
                        <li>
                          <Link to="/home/cites" className="!p-3 text-white">
                            <h6 className={` ${isSubMenu("/home/cites")} `}>
                              {" "}
                              - &nbsp; {t("tableForms.citiesTitle")}
                            </h6>
                          </Link>
                        </li>
                      )}
                    </AnimatedDev>
                  </>
                )}

                {typePermission && (
                  <li>
                    <Link to="/home/types" className="!p-3 ">
                      <h6 className={isSubMenu("/home/types")}>
                        {" "}
                        - &nbsp; {t("tableForms.typesTitle")}
                      </h6>
                    </Link>
                  </li>
                )}
                {developerPermission && (
                  <li>
                    <Link to="/home/developers" className="!p-3 ">
                      <h6 className={isSubMenu("/home/developers")}>
                        {" "}
                        - &nbsp; {t("tableForms.developersTitle")}
                      </h6>
                    </Link>
                  </li>
                )}
                {aminityPermission && (
                  <li>
                    <Link to="/home/amenites" className="!p-3">
                      <h6 className={isSubMenu("/home/amenites")}>
                        {" "}
                        - &nbsp; {t("tableForms.amenitiesTitle")}
                      </h6>
                    </Link>
                  </li>
                )}
              </AnimatedDev>
            </>
          )}

          {usePermissionGurd("product", "view") && (
            <li onClick={() => toggoleSideBar(4)} className={`${isDrop(4)}`}>
              <Link to="/home/properties">
                <PropSettingsIcon
                  color1={currentItem === 4 ? "#eabf92" : "white"}
                  color={currentItem === 4 ? "white" : "black"}
                />

                <h6>{t("tableForms.propertiesTitle")}</h6>
              </Link>
            </li>
          )}

          {usePermissionGurd("service", "view") && (
            <li onClick={() => toggoleSideBar(5)} className={isDrop(5)}>
              <Link to="/home/services">
                <GrServices
                  className={`${
                    currentItem === 5 ? "text-white" : "text-black"
                  } size-5`}
                />
                <h6>{t("tableForms.servicesTitle")}</h6>
              </Link>
            </li>
          )}

          {usePermissionGurd("agent", "view") && (
            <li onClick={() => toggoleSideBar(8)} className={isDrop(8)}>
              <Link to="/home/agents">
                <RiTeamFill className="size-5" />
                <h6>{t("tableForms.agentsTitle")}</h6>
              </Link>
            </li>
          )}

          {usePermissionGurd("blog", "view") && (
            <li onClick={() => toggoleSideBar(6)} className={isDrop(6)}>
              <Link to="/home/blogs">
                <BlogsIcon color={currentItem === 6 ? "white" : "black"} />
                <h6>{t("tableForms.blogsTitle")}</h6>
              </Link>
            </li>
          )}
          {/* {usePermissionGurd("faq", "view") && (
                        <li onClick={() => toggoleSideBar(10)} className={isDrop(10)}>
                            <Link to="/home/faqs">
                                <FaQuestion className="size-5" />
                                <h6>FAQ</h6>
                            </Link>
                        </li>
                    )} */}
          {/* {usePermissionGurd("terms_and_conditions", "view") && (
                        <li onClick={() => toggoleSideBar(11)} className={isDrop(11)}>
                            <Link to="/home/terms">
                                <FaScroll className="size-5" />
                                <h6>Terms</h6>
                            </Link>
                        </li>
                    )} */}

          {(adminPermission || rolePermisstion) && (
            <>
              <li
                onClick={() => setOpenHandler(7)}
                className={`${isDrop(
                  7
                )} flex pe-2 justify-between items-center text-white `}
              >
                <div className="flex gap-2  text-primary w-full  py-[15px]  px-[25px] ">
                  <MdAdminPanelSettings className="size-[25px]" />
                  <h6 className="text-white text-[15px]">
                    {t("tableForms.adminsTitle")}
                  </h6>
                </div>
                {open && currentItem === 7 ? (
                  <IoIosArrowUp className="size-4" />
                ) : (
                  <IoIosArrowDown className="size-4" />
                )}
              </li>

              <AnimatedDev open={open && currentItem == 7}>
                {adminPermission && (
                  <li className={isSubMenu("/home/admins")}>
                    <Link to="/home/admins" className="!p-3 ">
                      <h6 className={` ${isSubMenu("/home/admins")} `}>
                        - &nbsp; {t("tableForms.adminsTitle")}
                      </h6>
                    </Link>
                  </li>
                )}

                {rolePermisstion && (
                  <li className={isSubMenu("/home/roles")}>
                    <Link to="/home/roles" className="!p-3 text-white">
                      <h6 className={` ${isSubMenu("/home/roles")} `}>
                        {" "}
                        - &nbsp; {t("tableForms.rolesTitle")}
                      </h6>
                    </Link>
                  </li>
                )}
              </AnimatedDev>
            </>
          )}

          <li onClick={() => toggoleSideBar(9)} className={isDrop(9)}>
            <Link to="/home/changePassword">
              <MdOutlineDeveloperMode className="size-5" />
              <h6>{t("auth.resetPassword.changeTitle")}</h6>
            </Link>
          </li>

          <button onClick={handleLogOut} className="logout  ">
            <li className="flex gap-3 items-center ">
              <MdLogout className="size-5 !text-black" />
              <h6 className="">{t("tableForms.labels.logout")}</h6>
            </li>
          </button>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Sidebar;
