import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import sideBarImg from "../../assets/img/dashboard/goldLogo.png";
import { useLogoutMutation } from "../../apis/authSlice";
import { useTranslation } from "react-i18next";
// import { RiAdminLine } from "react-icons/ri";
import { LiaCriticalRole } from "react-icons/lia";
// import { PiMapPinAreaFill } from "react-icons/pi";
// import { LiaCitySolid } from "react-icons/lia";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { MdOutlineDeveloperMode } from "react-icons/md";
// import { PiLightbulbFilamentThin } from "react-icons/pi";
// import { LuTypeOutline } from "react-icons/lu";
// import { BiCategoryAlt } from "react-icons/bi";
// import { MdProductionQuantityLimits } from "react-icons/md";

import usePermissionGurd from "../../hooks/permession/usePermissionGurd";
import { modelActions } from "../../store/modelSlice";
import { useEffect, useState } from "react";
import AnimatedDev from "../reusableComponents/animatedDev/AnimatedDev";
import { AiFillHome  } from "react-icons/ai";
// import { TbHomeStar } from "react-icons/tb";
import { RiHomeGearLine } from "react-icons/ri";

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
    return pathname === path ? "!text-primary  rounded-[8px] " : "";
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

  console.log(categoryPermission);
  return (
    <div
      className={`dashboard-sidebar-wrapper fixed  overflow-y-scroll scrollbar-hide ${
        openSidebar ? "z-10" : "!w-[0px] !px-0 !overflow-hidden  -z-40 "
      }`}
    >
      <div className="dashboard-sidebar-logo">
        <Link to="/">
          <img
            className="d-md-block d-none"
            src={sideBarImg}
            alt="Dashboard Sidebar Logo"
          />
        </Link>
      </div>

      <div className="dashboard-sidebar-menu">
        <ul>
          {/* <li className={isDrop(1)} onClick={() => toggoleSideBar(1)}>
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 18 18"
              >
                <g clipPath="url(#clip0_920_531)">
                  <path d="M8.42631 0.0843773C8.31381 0.130079 8.16264 0.210939 8.09233 0.260159C8.0185 0.309376 6.24311 2.0707 4.14076 4.17305C1.06108 7.25977 0.305216 8.0332 0.231388 8.18086C-0.106112 8.86289 0.00638798 9.6082 0.523185 10.1285C0.846623 10.4484 1.25795 10.6172 1.72904 10.6172H1.96811V13.4297C1.96811 15.3316 1.98217 16.2984 2.00678 16.425C2.14037 17.0648 2.65717 17.6449 3.29701 17.8664C3.52905 17.9473 3.54662 17.9473 5.24467 17.9473C6.91811 17.9473 6.95678 17.9473 7.0517 17.8734C7.10444 17.8348 7.18178 17.7574 7.22045 17.7047C7.29428 17.6098 7.29428 17.5641 7.31186 15.2613L7.32944 12.9129L7.43491 12.7406C7.5685 12.5262 7.8392 12.3539 8.09936 12.3223C8.1978 12.3082 8.68998 12.3047 9.19272 12.3117L10.1068 12.3223L10.2931 12.4242C10.4689 12.5227 10.5814 12.6387 10.6904 12.832C10.729 12.9059 10.7431 13.3383 10.7572 15.2648C10.7747 17.5641 10.7747 17.6098 10.8486 17.7047C10.8872 17.7574 10.9646 17.8348 11.0173 17.8734C11.1122 17.9473 11.1509 17.9473 12.8244 17.9473C14.5224 17.9473 14.54 17.9473 14.772 17.8664C15.4119 17.6449 15.9287 17.0648 16.0623 16.425C16.0869 16.2984 16.1009 15.3316 16.1009 13.4297V10.6172H16.34C17.0009 10.6172 17.5775 10.2656 17.8623 9.68555C17.9818 9.44297 17.9818 9.43594 17.9818 8.96484C17.9818 8.16328 18.3861 8.63789 13.872 4.12735C9.38608 -0.362108 9.83608 0.0246105 9.06967 0.00703239C8.67241 1.90735e-06 8.61264 0.00703239 8.42631 0.0843773ZM9.29467 1.08985C9.50209 1.18828 16.8498 8.54648 16.9271 8.72578C17.0009 8.90508 16.9939 9.05625 16.906 9.23203C16.7759 9.50274 16.6669 9.54141 15.9884 9.5625C15.3521 9.58008 15.3064 9.59414 15.1376 9.82266C15.0638 9.91758 15.0638 9.95625 15.0462 13.1063L15.0287 16.2949L14.9302 16.4602C14.8775 16.5516 14.7826 16.6676 14.7193 16.7133C14.4732 16.9031 14.3994 16.9102 13.0564 16.9102H11.8119V14.9414C11.8119 13.6512 11.7978 12.9129 11.7732 12.7898C11.6361 12.1289 11.1052 11.5594 10.4232 11.3449C10.1912 11.2711 10.1138 11.2676 9.03451 11.2676C7.77592 11.2676 7.71264 11.2746 7.26264 11.5031C6.81615 11.7281 6.40131 12.2836 6.29584 12.7898C6.27123 12.9129 6.25717 13.6512 6.25717 14.9414V16.9102H5.01264C3.66967 16.9102 3.59584 16.9031 3.34975 16.7133C3.28647 16.6676 3.19155 16.5516 3.13881 16.4602L3.04037 16.2949L3.02279 13.1063C3.00522 9.95625 3.00522 9.91758 2.93139 9.82266C2.76264 9.59414 2.71694 9.58008 2.08061 9.5625C1.40209 9.54141 1.29311 9.50274 1.16303 9.23203C1.07514 9.05625 1.06811 8.90508 1.14194 8.72578C1.21576 8.55 8.56694 1.1918 8.77084 1.08985C8.95014 1.00196 9.11537 1.00196 9.29467 1.08985Z" />
                </g>
              </svg>
              <h6>{t("tableForms.dashboardTitle")}</h6>
            </Link>
          </li> */}

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
                <div className="flex gap-2    w-full  py-[15px]  px-[25px] ">
                <RiHomeGearLine  className="size-5" />

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
                    <Link to="/home/categories" className="!p-3 ">
                      {/* <BiCategoryAlt /> */}
                      {/* <h6>{t("tableForms.categoriesTitle")}</h6> */}
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
                        {/* <LiaCriticalRole className="size-[21px]" /> */}
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
                      {/* {typePermission && ( <li className={` ${isSubMenu("/home/types")} `}>
                        <Link to="/home/types" className="!p-3 text-white">
                          <h6> - &nbsp; {t("tableForms.typesTitle")}</h6>
                        </Link>
                      </li>)} */}
                    </AnimatedDev>
                  </>
                )}

                {typePermission && (
                  <li>
                    <Link to="/home/types" className="!p-3 text-white">
                      <h6 className={isSubMenu("/home/types")}>
                        {" "}
                        - &nbsp; {t("tableForms.typesTitle")}
                      </h6>
                    </Link>
                  </li>
                )}
                {developerPermission && (
                  <li className={isSubMenu("/home/developers")}>
                    <Link to="/home/developers" className="!p-3 text-white">
                      <h6 className={isSubMenu("/home/developers")}>
                        {" "}
                        - &nbsp; {t("tableForms.developersTitle")}
                      </h6>
                    </Link>
                  </li>
                )}
                {aminityPermission && (
                  <li>
                    <Link to="/home/amenites" className="!p-3 text-white">
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
              <AiFillHome  className="size-6" />

                <h6>{t("tableForms.propertiesTitle")}</h6>
              </Link>
            </li>
          )}

          {usePermissionGurd("service", "view") && (
            <li onClick={() => toggoleSideBar(5)} className={isDrop(5)}>
              <Link to="/home/services">
                <MdOutlineDeveloperMode className="size-5" />
                <h6>{t("tableForms.servicesTitle")}</h6>
              </Link>
            </li>
          )}

          {usePermissionGurd("agent", "view") && (
            <li onClick={() => toggoleSideBar(8)} className={isDrop(8)}>
              <Link to="/home/agents">
                <MdOutlineDeveloperMode className="size-5" />
                <h6>{t("tableForms.agentsTitle")}</h6>
              </Link>
            </li>
          )}

          {usePermissionGurd("blog", "view") && (
            <li onClick={() => toggoleSideBar(6)} className={isDrop(6)}>
              <Link to="/home/blogs">
                <MdOutlineDeveloperMode className="size-5" />
                <h6>{t("tableForms.blogsTitle")}</h6>
              </Link>
            </li>
          )}
          {usePermissionGurd("faq", "view") && (
            <li onClick={() => toggoleSideBar(10)} className={isDrop(10)}>
              <Link to="/home/faqs">
                <MdOutlineDeveloperMode className="size-5" />
                <h6>FAQ</h6>
              </Link>
            </li>
          )}
          {usePermissionGurd("terms_and_conditions", "view") && (
            <li onClick={() => toggoleSideBar(11)} className={isDrop(11)}>
              <Link to="/home/terms">
                <MdOutlineDeveloperMode className="size-5" />
                <h6>Terms</h6>
              </Link>
            </li>
          )}

          {(adminPermission || rolePermisstion) && (
            <>
              <li
                onClick={() => setOpenHandler(7)}
                className={`${isDrop(
                  7
                )} flex pe-2 justify-between items-center text-white `}
              >
                <div className="flex gap-2  text-primary w-full  py-[15px]  px-[25px] ">
                  <LiaCriticalRole className="size-[21px]" />
                  <h6 className="text-white text-[15px]">
                    {t("tableForms.adminsTitle")} & {t("tableForms.rolesTitle")}
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
                      <h6 className="!text-white">
                        - &nbsp; {t("tableForms.adminsTitle")}
                      </h6>
                    </Link>
                  </li>
                )}

                {rolePermisstion && (
                  <li className={isSubMenu("/home/roles")}>
                    <Link to="/home/roles" className="!p-3 text-white">
                      <h6> - &nbsp; {t("tableForms.rolesTitle")}</h6>
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

          <button onClick={handleLogOut} className="logout ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 18 18"
            >
              <g clipPath="url(#clip0_998_2016)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.75 14.0625C6.75 14.2117 6.80926 14.3548 6.91475 14.4602C7.02024 14.5657 7.16332 14.625 7.3125 14.625H16.3125C16.4617 14.625 16.6048 14.5657 16.7102 14.4602C16.8157 14.3548 16.875 14.2117 16.875 14.0625V3.9375C16.875 3.78832 16.8157 3.64524 16.7102 3.53975C16.6048 3.43426 16.4617 3.375 16.3125 3.375H7.3125C7.16332 3.375 7.02024 3.43426 6.91475 3.53975C6.80926 3.64524 6.75 3.78832 6.75 3.9375V6.1875C6.75 6.33668 6.69074 6.47976 6.58525 6.58525C6.47976 6.69074 6.33668 6.75 6.1875 6.75C6.03832 6.75 5.89524 6.69074 5.78975 6.58525C5.68426 6.47976 5.625 6.33668 5.625 6.1875V3.9375C5.625 3.48995 5.80279 3.06072 6.11926 2.74426C6.43572 2.42779 6.86495 2.25 7.3125 2.25H16.3125C16.7601 2.25 17.1893 2.42779 17.5057 2.74426C17.8222 3.06072 18 3.48995 18 3.9375V14.0625C18 14.5101 17.8222 14.9393 17.5057 15.2557C17.1893 15.5722 16.7601 15.75 16.3125 15.75H7.3125C6.86495 15.75 6.43572 15.5722 6.11926 15.2557C5.80279 14.9393 5.625 14.5101 5.625 14.0625V11.8125C5.625 11.6633 5.68426 11.5202 5.78975 11.4148C5.89524 11.3093 6.03832 11.25 6.1875 11.25C6.33668 11.25 6.47976 11.3093 6.58525 11.4148C6.69074 11.5202 6.75 11.6633 6.75 11.8125V14.0625Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.164279 9.39823C0.111895 9.34598 0.0703346 9.2839 0.0419773 9.21557C0.0136201 9.14723 -0.000976563 9.07397 -0.000976562 8.99998C-0.000976563 8.92599 0.0136201 8.85273 0.0419773 8.78439C0.0703346 8.71605 0.111895 8.65398 0.164279 8.60173L3.53928 5.22673C3.59158 5.17443 3.65367 5.13294 3.722 5.10464C3.79033 5.07634 3.86357 5.06177 3.93753 5.06177C4.01149 5.06177 4.08473 5.07634 4.15306 5.10464C4.22139 5.13294 4.28348 5.17443 4.33578 5.22673C4.38808 5.27903 4.42956 5.34111 4.45787 5.40945C4.48617 5.47778 4.50074 5.55102 4.50074 5.62498C4.50074 5.69894 4.48617 5.77218 4.45787 5.84051C4.42956 5.90884 4.38808 5.97093 4.33578 6.02323L1.9204 8.43748H11.8125C11.9617 8.43748 12.1048 8.49674 12.2103 8.60223C12.3158 8.70772 12.375 8.85079 12.375 8.99998C12.375 9.14916 12.3158 9.29224 12.2103 9.39773C12.1048 9.50322 11.9617 9.56248 11.8125 9.56248H1.9204L4.33578 11.9767C4.38808 12.029 4.42956 12.0911 4.45787 12.1594C4.48617 12.2278 4.50074 12.301 4.50074 12.375C4.50074 12.4489 4.48617 12.5222 4.45787 12.5905C4.42956 12.6588 4.38808 12.7209 4.33578 12.7732C4.28348 12.8255 4.22139 12.867 4.15306 12.8953C4.08473 12.9236 4.01149 12.9382 3.93753 12.9382C3.86357 12.9382 3.79033 12.9236 3.722 12.8953C3.65367 12.867 3.59158 12.8255 3.53928 12.7732L0.164279 9.39823Z"
                />
              </g>
            </svg>
            <h6 className="">{t("tableForms.labels.logout")}</h6>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
