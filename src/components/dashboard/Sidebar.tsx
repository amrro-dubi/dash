import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import sideBarImg from '../../assets/img/dashboard/icon/dashboard-sidebar-logo.svg';
import { useLogoutMutation } from '../../apis/authSlice';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { openSidebar } = useSelector((state: RootState) => state.Model);
  const {t} = useTranslation()
  const [logout] = useLogoutMutation()
  const location = useLocation();
  const pathname = location.pathname;
const navigate = useNavigate()
  // Function to check if a route is active
  const isActive = (path: string) => (pathname === path ? "active" : "");
const handleLogOut = async ()=>{
 const data  = await logout()
 console.log(data)
 if(data?.data?.status === 200){
  localStorage.removeItem('auth_data')
  navigate('/')
 }
  
}

console.log(openSidebar)
  return (
    <div className={`dashboard-sidebar-wrapper w-[350px] `}>
      {/* Render this only if openSidebar is true */}
    

      <div className="dashboard-sidebar-logo">
        <Link to="/">
          <img
            className="d-md-block d-none"
            src={sideBarImg}
            alt="Dashboard Sidebar Logo"
          />
        </Link>
        {/* <Link to="/">
          <img
            className="d-md-none d-block"
            src={sideBarImg}
            alt="Small Dashboard Sidebar Logo"
          />
        </Link> */}
      </div>

      <div className="dashboard-sidebar-menu">
        <ul>
          <li className={isActive("/home")}>
            <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                            <g clipPath="url(#clip0_920_531)">
                                <path d="M8.42631 0.0843773C8.31381 0.130079 8.16264 0.210939 8.09233 0.260159C8.0185 0.309376 6.24311 2.0707 4.14076 4.17305C1.06108 7.25977 0.305216 8.0332 0.231388 8.18086C-0.106112 8.86289 0.00638798 9.6082 0.523185 10.1285C0.846623 10.4484 1.25795 10.6172 1.72904 10.6172H1.96811V13.4297C1.96811 15.3316 1.98217 16.2984 2.00678 16.425C2.14037 17.0648 2.65717 17.6449 3.29701 17.8664C3.52905 17.9473 3.54662 17.9473 5.24467 17.9473C6.91811 17.9473 6.95678 17.9473 7.0517 17.8734C7.10444 17.8348 7.18178 17.7574 7.22045 17.7047C7.29428 17.6098 7.29428 17.5641 7.31186 15.2613L7.32944 12.9129L7.43491 12.7406C7.5685 12.5262 7.8392 12.3539 8.09936 12.3223C8.1978 12.3082 8.68998 12.3047 9.19272 12.3117L10.1068 12.3223L10.2931 12.4242C10.4689 12.5227 10.5814 12.6387 10.6904 12.832C10.729 12.9059 10.7431 13.3383 10.7572 15.2648C10.7747 17.5641 10.7747 17.6098 10.8486 17.7047C10.8872 17.7574 10.9646 17.8348 11.0173 17.8734C11.1122 17.9473 11.1509 17.9473 12.8244 17.9473C14.5224 17.9473 14.54 17.9473 14.772 17.8664C15.4119 17.6449 15.9287 17.0648 16.0623 16.425C16.0869 16.2984 16.1009 15.3316 16.1009 13.4297V10.6172H16.34C17.0009 10.6172 17.5775 10.2656 17.8623 9.68555C17.9818 9.44297 17.9818 9.43594 17.9818 8.96484C17.9818 8.16328 18.3861 8.63789 13.872 4.12735C9.38608 -0.362108 9.83608 0.0246105 9.06967 0.00703239C8.67241 1.90735e-06 8.61264 0.00703239 8.42631 0.0843773ZM9.29467 1.08985C9.50209 1.18828 16.8498 8.54648 16.9271 8.72578C17.0009 8.90508 16.9939 9.05625 16.906 9.23203C16.7759 9.50274 16.6669 9.54141 15.9884 9.5625C15.3521 9.58008 15.3064 9.59414 15.1376 9.82266C15.0638 9.91758 15.0638 9.95625 15.0462 13.1063L15.0287 16.2949L14.9302 16.4602C14.8775 16.5516 14.7826 16.6676 14.7193 16.7133C14.4732 16.9031 14.3994 16.9102 13.0564 16.9102H11.8119V14.9414C11.8119 13.6512 11.7978 12.9129 11.7732 12.7898C11.6361 12.1289 11.1052 11.5594 10.4232 11.3449C10.1912 11.2711 10.1138 11.2676 9.03451 11.2676C7.77592 11.2676 7.71264 11.2746 7.26264 11.5031C6.81615 11.7281 6.40131 12.2836 6.29584 12.7898C6.27123 12.9129 6.25717 13.6512 6.25717 14.9414V16.9102H5.01264C3.66967 16.9102 3.59584 16.9031 3.34975 16.7133C3.28647 16.6676 3.19155 16.5516 3.13881 16.4602L3.04037 16.2949L3.02279 13.1063C3.00522 9.95625 3.00522 9.91758 2.93139 9.82266C2.76264 9.59414 2.71694 9.58008 2.08061 9.5625C1.40209 9.54141 1.29311 9.50274 1.16303 9.23203C1.07514 9.05625 1.06811 8.90508 1.14194 8.72578C1.21576 8.55 8.56694 1.1918 8.77084 1.08985C8.95014 1.00196 9.11537 1.00196 9.29467 1.08985Z" />
                            </g>
                            </svg>
                            <h6>{t("tableForms.dashboardTitle")}</h6>
            </Link>
          </li>
          {/* <li className={isActive("/home/profile")}>
            <Link to="/home/profile">
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                            <g clipPath="url(#clip0_920_524)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16.235 14.3539C17.3441 12.8578 18 11.0055 18 9C18 4.0294 13.9705 0 9 0C4.0294 0 0 4.0294 0 9C0 13.9705 4.0294 18 9 18C11.6078 18 13.9565 16.8909 15.6004 15.1186C15.8257 14.8755 16.0376 14.6202 16.235 14.3539ZM15.736 13.5C16.5975 12.2129 17.0999 10.6651 17.0999 9C17.0999 4.5265 13.4735 0.899981 8.99991 0.899981C4.5265 0.899981 0.899981 4.5265 0.899981 9C0.899981 10.6652 1.4024 12.2129 2.26401 13.5C3.351 11.8761 5.00963 10.6672 6.95206 10.1612C6.01418 9.51125 5.39998 8.4274 5.39998 7.19994C5.39998 5.21174 7.0118 3.59992 9 3.59992C10.9882 3.59992 12.6 5.21174 12.6 7.19994C12.6 8.4273 11.9857 9.51125 11.0479 10.1611C12.9903 10.6672 14.649 11.876 15.736 13.5ZM15.1563 14.2643C13.8932 12.1873 11.6087 10.8 9.0001 10.8C6.39142 10.8 4.1068 12.1873 2.84373 14.2644C4.32933 16 6.53616 17.1 9 17.1C11.4638 17.1 13.6707 15.9999 15.1563 14.2643ZM9 9.89998C10.4912 9.89998 11.7 8.69124 11.7 7.19994C11.7 5.70874 10.4913 4.49991 9 4.49991C7.50871 4.49991 6.29996 5.70884 6.29996 7.20004C6.29996 8.69124 7.5088 9.89998 9 9.89998Z" />
                            </g>
                            </svg>
              <h6>My Profile</h6>
            </Link>
          </li> */}
          <li className={isActive("/home/admins")}>
            <Link to="/home/admins">
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                        <mask id="mask0_920_506" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x={0} y={0} width={18} height={18}>
                            <rect width={18} height={18} />
                        </mask>
                        <g mask="url(#mask0_920_506)">
                            <path d="M1.56532 2.57153C0.700975 2.57153 0 3.28957 0 4.17565C0 5.06109 0.700975 5.77853 1.56532 5.77853C2.42966 5.77853 3.13063 5.06109 3.13063 4.17565C3.13063 3.28957 2.42966 2.57153 1.56532 2.57153Z" />
                            <path d="M1.56532 7.39502C0.700975 7.39502 0 8.11246 0 8.99854C0 9.88397 0.700975 10.602 1.56532 10.602C2.42966 10.602 3.13063 9.88397 3.13063 8.99854C3.13063 8.11246 2.42966 7.39502 1.56532 7.39502Z" />
                            <path d="M1.56532 12.2214C0.700975 12.2214 0 12.9395 0 13.8249C0 14.7104 0.700975 15.4284 1.56532 15.4284C2.42966 15.4284 3.13063 14.7104 3.13063 13.8249C3.13063 12.9395 2.42966 12.2214 1.56532 12.2214Z" />
                            <path d="M16.8214 2.9707H5.68684C5.03685 2.9707 4.50977 3.51065 4.50977 4.1771C4.50977 4.84299 5.03681 5.38289 5.68684 5.38289H16.8214C17.4714 5.38289 17.9985 4.84299 17.9985 4.1771C17.9985 3.51065 17.4714 2.9707 16.8214 2.9707Z" />
                            <path d="M16.8214 7.79199H5.68684C5.03685 7.79199 4.50977 8.3319 4.50977 8.99839C4.50977 9.66428 5.03681 10.2042 5.68684 10.2042H16.8214C17.4714 10.2042 17.9985 9.66428 17.9985 8.99839C17.9985 8.3319 17.4714 7.79199 16.8214 7.79199Z" />
                            <path d="M16.8214 12.6172H5.68684C5.03685 12.6172 4.50977 13.1571 4.50977 13.823C4.50977 14.4888 5.03681 15.0287 5.68684 15.0287H16.8214C17.4714 15.0287 17.9985 14.4888 17.9985 13.823C17.9985 13.1571 17.4714 12.6172 16.8214 12.6172Z" />
                        </g>
                        </svg>
              <h6>{t("tableForms.adminsTitle")}</h6>
            </Link>
          </li>
          <li className={isActive("/home/roles")}>
            <Link to="/home/roles">
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                        <mask id="mask0_920_506" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x={0} y={0} width={18} height={18}>
                            <rect width={18} height={18} />
                        </mask>
                        <g mask="url(#mask0_920_506)">
                            <path d="M1.56532 2.57153C0.700975 2.57153 0 3.28957 0 4.17565C0 5.06109 0.700975 5.77853 1.56532 5.77853C2.42966 5.77853 3.13063 5.06109 3.13063 4.17565C3.13063 3.28957 2.42966 2.57153 1.56532 2.57153Z" />
                            <path d="M1.56532 7.39502C0.700975 7.39502 0 8.11246 0 8.99854C0 9.88397 0.700975 10.602 1.56532 10.602C2.42966 10.602 3.13063 9.88397 3.13063 8.99854C3.13063 8.11246 2.42966 7.39502 1.56532 7.39502Z" />
                            <path d="M1.56532 12.2214C0.700975 12.2214 0 12.9395 0 13.8249C0 14.7104 0.700975 15.4284 1.56532 15.4284C2.42966 15.4284 3.13063 14.7104 3.13063 13.8249C3.13063 12.9395 2.42966 12.2214 1.56532 12.2214Z" />
                            <path d="M16.8214 2.9707H5.68684C5.03685 2.9707 4.50977 3.51065 4.50977 4.1771C4.50977 4.84299 5.03681 5.38289 5.68684 5.38289H16.8214C17.4714 5.38289 17.9985 4.84299 17.9985 4.1771C17.9985 3.51065 17.4714 2.9707 16.8214 2.9707Z" />
                            <path d="M16.8214 7.79199H5.68684C5.03685 7.79199 4.50977 8.3319 4.50977 8.99839C4.50977 9.66428 5.03681 10.2042 5.68684 10.2042H16.8214C17.4714 10.2042 17.9985 9.66428 17.9985 8.99839C17.9985 8.3319 17.4714 7.79199 16.8214 7.79199Z" />
                            <path d="M16.8214 12.6172H5.68684C5.03685 12.6172 4.50977 13.1571 4.50977 13.823C4.50977 14.4888 5.03681 15.0287 5.68684 15.0287H16.8214C17.4714 15.0287 17.9985 14.4888 17.9985 13.823C17.9985 13.1571 17.4714 12.6172 16.8214 12.6172Z" />
                        </g>
                        </svg>
                        <h6>{t("tableForms.rolesTitle")}</h6>
            </Link>
          </li>
          <li className={isActive("/home/cites")}>
            <Link to="/home/cites">
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                        <mask id="mask0_920_506" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x={0} y={0} width={18} height={18}>
                            <rect width={18} height={18} />
                        </mask>
                        <g mask="url(#mask0_920_506)">
                            <path d="M1.56532 2.57153C0.700975 2.57153 0 3.28957 0 4.17565C0 5.06109 0.700975 5.77853 1.56532 5.77853C2.42966 5.77853 3.13063 5.06109 3.13063 4.17565C3.13063 3.28957 2.42966 2.57153 1.56532 2.57153Z" />
                            <path d="M1.56532 7.39502C0.700975 7.39502 0 8.11246 0 8.99854C0 9.88397 0.700975 10.602 1.56532 10.602C2.42966 10.602 3.13063 9.88397 3.13063 8.99854C3.13063 8.11246 2.42966 7.39502 1.56532 7.39502Z" />
                            <path d="M1.56532 12.2214C0.700975 12.2214 0 12.9395 0 13.8249C0 14.7104 0.700975 15.4284 1.56532 15.4284C2.42966 15.4284 3.13063 14.7104 3.13063 13.8249C3.13063 12.9395 2.42966 12.2214 1.56532 12.2214Z" />
                            <path d="M16.8214 2.9707H5.68684C5.03685 2.9707 4.50977 3.51065 4.50977 4.1771C4.50977 4.84299 5.03681 5.38289 5.68684 5.38289H16.8214C17.4714 5.38289 17.9985 4.84299 17.9985 4.1771C17.9985 3.51065 17.4714 2.9707 16.8214 2.9707Z" />
                            <path d="M16.8214 7.79199H5.68684C5.03685 7.79199 4.50977 8.3319 4.50977 8.99839C4.50977 9.66428 5.03681 10.2042 5.68684 10.2042H16.8214C17.4714 10.2042 17.9985 9.66428 17.9985 8.99839C17.9985 8.3319 17.4714 7.79199 16.8214 7.79199Z" />
                            <path d="M16.8214 12.6172H5.68684C5.03685 12.6172 4.50977 13.1571 4.50977 13.823C4.50977 14.4888 5.03681 15.0287 5.68684 15.0287H16.8214C17.4714 15.0287 17.9985 14.4888 17.9985 13.823C17.9985 13.1571 17.4714 12.6172 16.8214 12.6172Z" />
                        </g>
                        </svg>
                        <h6>{t("tableForms.citiesTitle")}</h6>
            </Link>
          </li>
          <li className={isActive("/home/areas")}>
            <Link to="/home/areas">
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                        <mask id="mask0_920_506" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x={0} y={0} width={18} height={18}>
                            <rect width={18} height={18} />
                        </mask>
                        <g mask="url(#mask0_920_506)">
                            <path d="M1.56532 2.57153C0.700975 2.57153 0 3.28957 0 4.17565C0 5.06109 0.700975 5.77853 1.56532 5.77853C2.42966 5.77853 3.13063 5.06109 3.13063 4.17565C3.13063 3.28957 2.42966 2.57153 1.56532 2.57153Z" />
                            <path d="M1.56532 7.39502C0.700975 7.39502 0 8.11246 0 8.99854C0 9.88397 0.700975 10.602 1.56532 10.602C2.42966 10.602 3.13063 9.88397 3.13063 8.99854C3.13063 8.11246 2.42966 7.39502 1.56532 7.39502Z" />
                            <path d="M1.56532 12.2214C0.700975 12.2214 0 12.9395 0 13.8249C0 14.7104 0.700975 15.4284 1.56532 15.4284C2.42966 15.4284 3.13063 14.7104 3.13063 13.8249C3.13063 12.9395 2.42966 12.2214 1.56532 12.2214Z" />
                            <path d="M16.8214 2.9707H5.68684C5.03685 2.9707 4.50977 3.51065 4.50977 4.1771C4.50977 4.84299 5.03681 5.38289 5.68684 5.38289H16.8214C17.4714 5.38289 17.9985 4.84299 17.9985 4.1771C17.9985 3.51065 17.4714 2.9707 16.8214 2.9707Z" />
                            <path d="M16.8214 7.79199H5.68684C5.03685 7.79199 4.50977 8.3319 4.50977 8.99839C4.50977 9.66428 5.03681 10.2042 5.68684 10.2042H16.8214C17.4714 10.2042 17.9985 9.66428 17.9985 8.99839C17.9985 8.3319 17.4714 7.79199 16.8214 7.79199Z" />
                            <path d="M16.8214 12.6172H5.68684C5.03685 12.6172 4.50977 13.1571 4.50977 13.823C4.50977 14.4888 5.03681 15.0287 5.68684 15.0287H16.8214C17.4714 15.0287 17.9985 14.4888 17.9985 13.823C17.9985 13.1571 17.4714 12.6172 16.8214 12.6172Z" />
                        </g>
                        </svg>
                        <h6>{t("tableForms.areasTitle")}</h6>
            </Link>
          </li>
          <li className={isActive("/home/developers")}>
            <Link to="/home/developers">
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                        <mask id="mask0_920_506" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x={0} y={0} width={18} height={18}>
                            <rect width={18} height={18} />
                        </mask>
                        <g mask="url(#mask0_920_506)">
                            <path d="M1.56532 2.57153C0.700975 2.57153 0 3.28957 0 4.17565C0 5.06109 0.700975 5.77853 1.56532 5.77853C2.42966 5.77853 3.13063 5.06109 3.13063 4.17565C3.13063 3.28957 2.42966 2.57153 1.56532 2.57153Z" />
                            <path d="M1.56532 7.39502C0.700975 7.39502 0 8.11246 0 8.99854C0 9.88397 0.700975 10.602 1.56532 10.602C2.42966 10.602 3.13063 9.88397 3.13063 8.99854C3.13063 8.11246 2.42966 7.39502 1.56532 7.39502Z" />
                            <path d="M1.56532 12.2214C0.700975 12.2214 0 12.9395 0 13.8249C0 14.7104 0.700975 15.4284 1.56532 15.4284C2.42966 15.4284 3.13063 14.7104 3.13063 13.8249C3.13063 12.9395 2.42966 12.2214 1.56532 12.2214Z" />
                            <path d="M16.8214 2.9707H5.68684C5.03685 2.9707 4.50977 3.51065 4.50977 4.1771C4.50977 4.84299 5.03681 5.38289 5.68684 5.38289H16.8214C17.4714 5.38289 17.9985 4.84299 17.9985 4.1771C17.9985 3.51065 17.4714 2.9707 16.8214 2.9707Z" />
                            <path d="M16.8214 7.79199H5.68684C5.03685 7.79199 4.50977 8.3319 4.50977 8.99839C4.50977 9.66428 5.03681 10.2042 5.68684 10.2042H16.8214C17.4714 10.2042 17.9985 9.66428 17.9985 8.99839C17.9985 8.3319 17.4714 7.79199 16.8214 7.79199Z" />
                            <path d="M16.8214 12.6172H5.68684C5.03685 12.6172 4.50977 13.1571 4.50977 13.823C4.50977 14.4888 5.03681 15.0287 5.68684 15.0287H16.8214C17.4714 15.0287 17.9985 14.4888 17.9985 13.823C17.9985 13.1571 17.4714 12.6172 16.8214 12.6172Z" />
                        </g>
                        </svg>
                        <h6>{t("tableForms.developersTitle")}</h6>
            </Link>
          </li>
          <li className={isActive("/home/amenites")}>
            <Link to="/home/amenites">
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                        <mask id="mask0_920_506" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x={0} y={0} width={18} height={18}>
                            <rect width={18} height={18} />
                        </mask>
                        <g mask="url(#mask0_920_506)">
                            <path d="M1.56532 2.57153C0.700975 2.57153 0 3.28957 0 4.17565C0 5.06109 0.700975 5.77853 1.56532 5.77853C2.42966 5.77853 3.13063 5.06109 3.13063 4.17565C3.13063 3.28957 2.42966 2.57153 1.56532 2.57153Z" />
                            <path d="M1.56532 7.39502C0.700975 7.39502 0 8.11246 0 8.99854C0 9.88397 0.700975 10.602 1.56532 10.602C2.42966 10.602 3.13063 9.88397 3.13063 8.99854C3.13063 8.11246 2.42966 7.39502 1.56532 7.39502Z" />
                            <path d="M1.56532 12.2214C0.700975 12.2214 0 12.9395 0 13.8249C0 14.7104 0.700975 15.4284 1.56532 15.4284C2.42966 15.4284 3.13063 14.7104 3.13063 13.8249C3.13063 12.9395 2.42966 12.2214 1.56532 12.2214Z" />
                            <path d="M16.8214 2.9707H5.68684C5.03685 2.9707 4.50977 3.51065 4.50977 4.1771C4.50977 4.84299 5.03681 5.38289 5.68684 5.38289H16.8214C17.4714 5.38289 17.9985 4.84299 17.9985 4.1771C17.9985 3.51065 17.4714 2.9707 16.8214 2.9707Z" />
                            <path d="M16.8214 7.79199H5.68684C5.03685 7.79199 4.50977 8.3319 4.50977 8.99839C4.50977 9.66428 5.03681 10.2042 5.68684 10.2042H16.8214C17.4714 10.2042 17.9985 9.66428 17.9985 8.99839C17.9985 8.3319 17.4714 7.79199 16.8214 7.79199Z" />
                            <path d="M16.8214 12.6172H5.68684C5.03685 12.6172 4.50977 13.1571 4.50977 13.823C4.50977 14.4888 5.03681 15.0287 5.68684 15.0287H16.8214C17.4714 15.0287 17.9985 14.4888 17.9985 13.823C17.9985 13.1571 17.4714 12.6172 16.8214 12.6172Z" />
                        </g>
                        </svg>
                        <h6>{t("tableForms.amenitiesTitle")}</h6>
            </Link>
          </li>
          <li className={isActive("/home/types")}>
            <Link to="/home/types">
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                        <mask id="mask0_920_506" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x={0} y={0} width={18} height={18}>
                            <rect width={18} height={18} />
                        </mask>
                        <g mask="url(#mask0_920_506)">
                            <path d="M1.56532 2.57153C0.700975 2.57153 0 3.28957 0 4.17565C0 5.06109 0.700975 5.77853 1.56532 5.77853C2.42966 5.77853 3.13063 5.06109 3.13063 4.17565C3.13063 3.28957 2.42966 2.57153 1.56532 2.57153Z" />
                            <path d="M1.56532 7.39502C0.700975 7.39502 0 8.11246 0 8.99854C0 9.88397 0.700975 10.602 1.56532 10.602C2.42966 10.602 3.13063 9.88397 3.13063 8.99854C3.13063 8.11246 2.42966 7.39502 1.56532 7.39502Z" />
                            <path d="M1.56532 12.2214C0.700975 12.2214 0 12.9395 0 13.8249C0 14.7104 0.700975 15.4284 1.56532 15.4284C2.42966 15.4284 3.13063 14.7104 3.13063 13.8249C3.13063 12.9395 2.42966 12.2214 1.56532 12.2214Z" />
                            <path d="M16.8214 2.9707H5.68684C5.03685 2.9707 4.50977 3.51065 4.50977 4.1771C4.50977 4.84299 5.03681 5.38289 5.68684 5.38289H16.8214C17.4714 5.38289 17.9985 4.84299 17.9985 4.1771C17.9985 3.51065 17.4714 2.9707 16.8214 2.9707Z" />
                            <path d="M16.8214 7.79199H5.68684C5.03685 7.79199 4.50977 8.3319 4.50977 8.99839C4.50977 9.66428 5.03681 10.2042 5.68684 10.2042H16.8214C17.4714 10.2042 17.9985 9.66428 17.9985 8.99839C17.9985 8.3319 17.4714 7.79199 16.8214 7.79199Z" />
                            <path d="M16.8214 12.6172H5.68684C5.03685 12.6172 4.50977 13.1571 4.50977 13.823C4.50977 14.4888 5.03681 15.0287 5.68684 15.0287H16.8214C17.4714 15.0287 17.9985 14.4888 17.9985 13.823C17.9985 13.1571 17.4714 12.6172 16.8214 12.6172Z" />
                        </g>
                        </svg>
                        <h6>{t("tableForms.typesTitle")}</h6>
            </Link>
          </li>
          <li className={isActive("/home/categories")}>
            <Link to="/home/categories">
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                        <mask id="mask0_920_506" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x={0} y={0} width={18} height={18}>
                            <rect width={18} height={18} />
                        </mask>
                        <g mask="url(#mask0_920_506)">
                            <path d="M1.56532 2.57153C0.700975 2.57153 0 3.28957 0 4.17565C0 5.06109 0.700975 5.77853 1.56532 5.77853C2.42966 5.77853 3.13063 5.06109 3.13063 4.17565C3.13063 3.28957 2.42966 2.57153 1.56532 2.57153Z" />
                            <path d="M1.56532 7.39502C0.700975 7.39502 0 8.11246 0 8.99854C0 9.88397 0.700975 10.602 1.56532 10.602C2.42966 10.602 3.13063 9.88397 3.13063 8.99854C3.13063 8.11246 2.42966 7.39502 1.56532 7.39502Z" />
                            <path d="M1.56532 12.2214C0.700975 12.2214 0 12.9395 0 13.8249C0 14.7104 0.700975 15.4284 1.56532 15.4284C2.42966 15.4284 3.13063 14.7104 3.13063 13.8249C3.13063 12.9395 2.42966 12.2214 1.56532 12.2214Z" />
                            <path d="M16.8214 2.9707H5.68684C5.03685 2.9707 4.50977 3.51065 4.50977 4.1771C4.50977 4.84299 5.03681 5.38289 5.68684 5.38289H16.8214C17.4714 5.38289 17.9985 4.84299 17.9985 4.1771C17.9985 3.51065 17.4714 2.9707 16.8214 2.9707Z" />
                            <path d="M16.8214 7.79199H5.68684C5.03685 7.79199 4.50977 8.3319 4.50977 8.99839C4.50977 9.66428 5.03681 10.2042 5.68684 10.2042H16.8214C17.4714 10.2042 17.9985 9.66428 17.9985 8.99839C17.9985 8.3319 17.4714 7.79199 16.8214 7.79199Z" />
                            <path d="M16.8214 12.6172H5.68684C5.03685 12.6172 4.50977 13.1571 4.50977 13.823C4.50977 14.4888 5.03681 15.0287 5.68684 15.0287H16.8214C17.4714 15.0287 17.9985 14.4888 17.9985 13.823C17.9985 13.1571 17.4714 12.6172 16.8214 12.6172Z" />
                        </g>
                        </svg>
                        <h6>{t("tableForms.categoriesTitle")}</h6>
            </Link>
          </li>
          <li className={isActive("/home/properties")}>
            <Link to="/home/properties">
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                        <mask id="mask0_920_506" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x={0} y={0} width={18} height={18}>
                            <rect width={18} height={18} />
                        </mask>
                        <g mask="url(#mask0_920_506)">
                            <path d="M1.56532 2.57153C0.700975 2.57153 0 3.28957 0 4.17565C0 5.06109 0.700975 5.77853 1.56532 5.77853C2.42966 5.77853 3.13063 5.06109 3.13063 4.17565C3.13063 3.28957 2.42966 2.57153 1.56532 2.57153Z" />
                            <path d="M1.56532 7.39502C0.700975 7.39502 0 8.11246 0 8.99854C0 9.88397 0.700975 10.602 1.56532 10.602C2.42966 10.602 3.13063 9.88397 3.13063 8.99854C3.13063 8.11246 2.42966 7.39502 1.56532 7.39502Z" />
                            <path d="M1.56532 12.2214C0.700975 12.2214 0 12.9395 0 13.8249C0 14.7104 0.700975 15.4284 1.56532 15.4284C2.42966 15.4284 3.13063 14.7104 3.13063 13.8249C3.13063 12.9395 2.42966 12.2214 1.56532 12.2214Z" />
                            <path d="M16.8214 2.9707H5.68684C5.03685 2.9707 4.50977 3.51065 4.50977 4.1771C4.50977 4.84299 5.03681 5.38289 5.68684 5.38289H16.8214C17.4714 5.38289 17.9985 4.84299 17.9985 4.1771C17.9985 3.51065 17.4714 2.9707 16.8214 2.9707Z" />
                            <path d="M16.8214 7.79199H5.68684C5.03685 7.79199 4.50977 8.3319 4.50977 8.99839C4.50977 9.66428 5.03681 10.2042 5.68684 10.2042H16.8214C17.4714 10.2042 17.9985 9.66428 17.9985 8.99839C17.9985 8.3319 17.4714 7.79199 16.8214 7.79199Z" />
                            <path d="M16.8214 12.6172H5.68684C5.03685 12.6172 4.50977 13.1571 4.50977 13.823C4.50977 14.4888 5.03681 15.0287 5.68684 15.0287H16.8214C17.4714 15.0287 17.9985 14.4888 17.9985 13.823C17.9985 13.1571 17.4714 12.6172 16.8214 12.6172Z" />
                        </g>
                        </svg>
                        <h6>{t("tableForms.propertiesTitle")}</h6>
            </Link>
          </li>
          {/* <li className={isActive("/home/admin")}>
            <Link to="/my-listing">
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                        <mask id="mask0_920_506" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x={0} y={0} width={18} height={18}>
                            <rect width={18} height={18} />
                        </mask>
                        <g mask="url(#mask0_920_506)">
                            <path d="M1.56532 2.57153C0.700975 2.57153 0 3.28957 0 4.17565C0 5.06109 0.700975 5.77853 1.56532 5.77853C2.42966 5.77853 3.13063 5.06109 3.13063 4.17565C3.13063 3.28957 2.42966 2.57153 1.56532 2.57153Z" />
                            <path d="M1.56532 7.39502C0.700975 7.39502 0 8.11246 0 8.99854C0 9.88397 0.700975 10.602 1.56532 10.602C2.42966 10.602 3.13063 9.88397 3.13063 8.99854C3.13063 8.11246 2.42966 7.39502 1.56532 7.39502Z" />
                            <path d="M1.56532 12.2214C0.700975 12.2214 0 12.9395 0 13.8249C0 14.7104 0.700975 15.4284 1.56532 15.4284C2.42966 15.4284 3.13063 14.7104 3.13063 13.8249C3.13063 12.9395 2.42966 12.2214 1.56532 12.2214Z" />
                            <path d="M16.8214 2.9707H5.68684C5.03685 2.9707 4.50977 3.51065 4.50977 4.1771C4.50977 4.84299 5.03681 5.38289 5.68684 5.38289H16.8214C17.4714 5.38289 17.9985 4.84299 17.9985 4.1771C17.9985 3.51065 17.4714 2.9707 16.8214 2.9707Z" />
                            <path d="M16.8214 7.79199H5.68684C5.03685 7.79199 4.50977 8.3319 4.50977 8.99839C4.50977 9.66428 5.03681 10.2042 5.68684 10.2042H16.8214C17.4714 10.2042 17.9985 9.66428 17.9985 8.99839C17.9985 8.3319 17.4714 7.79199 16.8214 7.79199Z" />
                            <path d="M16.8214 12.6172H5.68684C5.03685 12.6172 4.50977 13.1571 4.50977 13.823C4.50977 14.4888 5.03681 15.0287 5.68684 15.0287H16.8214C17.4714 15.0287 17.9985 14.4888 17.9985 13.823C17.9985 13.1571 17.4714 12.6172 16.8214 12.6172Z" />
                        </g>
                        </svg>
              <h6>My Listing</h6>
            </Link>
          </li> */}
          {/* <li className={isActive("/add-property")}>
            <Link to="/dashboard/add-property">
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                            <g clipPath="url(#clip0_920_501)">
                                <path d="M9 16.875C6.91142 16.875 4.90838 16.0453 3.43153 14.5685C1.95468 13.0916 1.125 11.0886 1.125 9C1.125 6.91142 1.95468 4.90838 3.43153 3.43153C4.90838 1.95468 6.91142 1.125 9 1.125C11.0886 1.125 13.0916 1.95468 14.5685 3.43153C16.0453 4.90838 16.875 6.91142 16.875 9C16.875 11.0886 16.0453 13.0916 14.5685 14.5685C13.0916 16.0453 11.0886 16.875 9 16.875ZM9 18C11.3869 18 13.6761 17.0518 15.364 15.364C17.0518 13.6761 18 11.3869 18 9C18 6.61305 17.0518 4.32387 15.364 2.63604C13.6761 0.948212 11.3869 0 9 0C6.61305 0 4.32387 0.948212 2.63604 2.63604C0.948212 4.32387 0 6.61305 0 9C0 11.3869 0.948212 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18Z" />
                                <path d="M9 4.5C9.14918 4.5 9.29226 4.55926 9.39775 4.66475C9.50324 4.77024 9.5625 4.91332 9.5625 5.0625V8.4375H12.9375C13.0867 8.4375 13.2298 8.49676 13.3352 8.60225C13.4407 8.70774 13.5 8.85082 13.5 9C13.5 9.14918 13.4407 9.29226 13.3352 9.39775C13.2298 9.50324 13.0867 9.5625 12.9375 9.5625H9.5625V12.9375C9.5625 13.0867 9.50324 13.2298 9.39775 13.3352C9.29226 13.4407 9.14918 13.5 9 13.5C8.85082 13.5 8.70774 13.4407 8.60225 13.3352C8.49676 13.2298 8.4375 13.0867 8.4375 12.9375V9.5625H5.0625C4.91332 9.5625 4.77024 9.50324 4.66475 9.39775C4.55926 9.29226 4.5 9.14918 4.5 9C4.5 8.85082 4.55926 8.70774 4.66475 8.60225C4.77024 8.49676 4.91332 8.4375 5.0625 8.4375H8.4375V5.0625C8.4375 4.91332 8.49676 4.77024 8.60225 4.66475C8.70774 4.55926 8.85082 4.5 9 4.5Z" />
                            </g>
                            </svg>
              <h6>Add Property</h6>
            </Link>
          </li>
          <li className={isActive("/faqs")}>
            <Link to="/dashboard/faqs">
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                            <g clipPath="url(#clip0_920_495)">
                                <path d="M9 16.875C6.91142 16.875 4.90838 16.0453 3.43153 14.5685C1.95468 13.0916 1.125 11.0886 1.125 9C1.125 6.91142 1.95468 4.90838 3.43153 3.43153C4.90838 1.95468 6.91142 1.125 9 1.125C11.0886 1.125 13.0916 1.95468 14.5685 3.43153C16.0453 4.90838 16.875 6.91142 16.875 9C16.875 11.0886 16.0453 13.0916 14.5685 14.5685C13.0916 16.0453 11.0886 16.875 9 16.875ZM9 18C11.3869 18 13.6761 17.0518 15.364 15.364C17.0518 13.6761 18 11.3869 18 9C18 6.61305 17.0518 4.32387 15.364 2.63604C13.6761 0.948212 11.3869 0 9 0C6.61305 0 4.32387 0.948212 2.63604 2.63604C0.948212 4.32387 0 6.61305 0 9C0 11.3869 0.948212 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18Z" />
                                <path d="M5.91235 6.50925C5.91081 6.54558 5.91672 6.58184 5.92971 6.61581C5.9427 6.64977 5.9625 6.68072 5.9879 6.70674C6.01329 6.73277 6.04374 6.75333 6.07738 6.76715C6.11101 6.78097 6.14712 6.78777 6.18347 6.78713H7.1116C7.26685 6.78713 7.3906 6.66 7.41085 6.50588C7.5121 5.76787 8.01835 5.23013 8.9206 5.23013C9.69235 5.23013 10.3988 5.616 10.3988 6.54412C10.3988 7.2585 9.9781 7.587 9.31322 8.0865C8.5561 8.63663 7.95647 9.279 7.99922 10.3219L8.0026 10.566C8.00378 10.6398 8.03393 10.7102 8.08655 10.762C8.13917 10.8137 8.21003 10.8428 8.28385 10.8427H9.19622C9.27082 10.8427 9.34235 10.8131 9.3951 10.7604C9.44784 10.7076 9.47747 10.6361 9.47747 10.5615V10.4434C9.47747 9.63562 9.7846 9.4005 10.6137 8.77163C11.2988 8.25075 12.0132 7.6725 12.0132 6.45863C12.0132 4.75875 10.5777 3.9375 9.0061 3.9375C7.58072 3.9375 6.01922 4.60125 5.91235 6.50925ZM7.66397 12.9926C7.66397 13.5922 8.1421 14.0355 8.80022 14.0355C9.48535 14.0355 9.95672 13.5922 9.95672 12.9926C9.95672 12.3716 9.48422 11.9351 8.7991 11.9351C8.1421 11.9351 7.66397 12.3716 7.66397 12.9926Z" />
                            </g>
                            </svg>
              <h6>FAQs</h6>
            </Link>
          </li>
          */}
          {/* Add more list items as needed */}
          {/* <li className={`${pathname === "/subscription"?"active":""}`}> 
                    <Link to="/subscription">
                      
                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                        <path d="M3.375 2.25V7.40925L11.25 15.2843L16.4093 10.125L8.53425 2.25H3.375ZM2.25 2.25C2.25 1.95163 2.36853 1.66548 2.5795 1.4545C2.79048 1.24353 3.07663 1.125 3.375 1.125H8.53425C8.83259 1.12506 9.1187 1.24363 9.32963 1.45462L17.2046 9.32963C17.4155 9.54059 17.534 9.82669 17.534 10.125C17.534 10.4233 17.4155 10.7094 17.2046 10.9204L12.0454 16.0796C11.8344 16.2905 11.5483 16.409 11.25 16.409C10.9517 16.409 10.6656 16.2905 10.4546 16.0796L2.57962 8.20463C2.36863 7.9937 2.25006 7.70759 2.25 7.40925V2.25Z" />
                        <path d="M6.1875 5.625C6.03832 5.625 5.89524 5.56574 5.78975 5.46025C5.68426 5.35476 5.625 5.21168 5.625 5.0625C5.625 4.91332 5.68426 4.77024 5.78975 4.66475C5.89524 4.55926 6.03832 4.5 6.1875 4.5C6.33668 4.5 6.47976 4.55926 6.58525 4.66475C6.69074 4.77024 6.75 4.91332 6.75 5.0625C6.75 5.21168 6.69074 5.35476 6.58525 5.46025C6.47976 5.56574 6.33668 5.625 6.1875 5.625ZM6.1875 6.75C6.63505 6.75 7.06428 6.57221 7.38074 6.25574C7.69721 5.93928 7.875 5.51005 7.875 5.0625C7.875 4.61495 7.69721 4.18572 7.38074 3.86926C7.06428 3.55279 6.63505 3.375 6.1875 3.375C5.73995 3.375 5.31072 3.55279 4.99426 3.86926C4.67779 4.18572 4.5 4.61495 4.5 5.0625C4.5 5.51005 4.67779 5.93928 4.99426 6.25574C5.31072 6.57221 5.73995 6.75 6.1875 6.75ZM1.125 7.97175C1.12506 8.27009 1.24363 8.5562 1.45463 8.76713L9.84375 17.1562L9.79537 17.2046C9.58441 17.4155 9.29831 17.534 9 17.534C8.70169 17.534 8.41559 17.4155 8.20463 17.2046L0.329625 9.32963C0.118632 9.1187 6.37171e-05 8.83259 0 8.53425L0 3.375C0 3.07663 0.118526 2.79048 0.329505 2.5795C0.540483 2.36853 0.826631 2.25 1.125 2.25V7.97175Z" />
                        </svg>
                        <h6>Subscription</h6>
                       
                    </Link>
                    </li> */}
                    {/* <li className={`${pathname === "/message"?"active":""}`}> 
                    <Link to="/message">
                       
                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                        <path d="M9.52875 1.48283C9.36598 1.39616 9.1844 1.35083 9 1.35083C8.8156 1.35083 8.63402 1.39616 8.47125 1.48283L1.72125 5.08283C1.54127 5.17866 1.39073 5.32161 1.28571 5.49638C1.18068 5.67115 1.12514 5.87118 1.125 6.07508V6.9942L7.59375 10.8755L9 10.0317L10.4062 10.8755L16.875 6.9942V6.07508C16.8749 5.87118 16.8193 5.67115 16.7143 5.49638C16.6093 5.32161 16.4587 5.17866 16.2787 5.08283L9.52875 1.48283ZM16.875 8.30595L11.4998 11.5313L16.875 14.7567V8.30595ZM16.8356 16.046L9 11.3423L1.16437 16.0448C1.22909 16.2832 1.37046 16.4937 1.56666 16.6437C1.76286 16.7938 2.003 16.8751 2.25 16.8751H15.75C15.997 16.8751 16.2371 16.7938 16.4333 16.6437C16.6295 16.4937 16.7709 16.2843 16.8356 16.046ZM1.125 14.7556L6.50025 11.5302L1.125 8.30595V14.7556ZM7.94137 0.489454C8.26719 0.315726 8.63076 0.224854 9 0.224854C9.36924 0.224854 9.73281 0.315726 10.0586 0.489454L16.8086 4.08945C17.1685 4.28136 17.4695 4.56749 17.6794 4.91724C17.8892 5.26699 18 5.6672 18 6.07508V15.7501C18 16.3468 17.7629 16.9191 17.341 17.3411C16.919 17.763 16.3467 18.0001 15.75 18.0001H2.25C1.65326 18.0001 1.08097 17.763 0.65901 17.3411C0.237053 16.9191 1.12544e-08 16.3468 1.12544e-08 15.7501V6.07508C-4.07775e-05 5.6672 0.110791 5.26699 0.320641 4.91724C0.530491 4.56749 0.831466 4.28136 1.19138 4.08945L7.94137 0.489454Z" />
                        </svg>
                        <h6>Message</h6>
                     
                    </Link>
                    </li> */}
                    <button className="logout">
                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                    <g clipPath="url(#clip0_998_2016)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.75 14.0625C6.75 14.2117 6.80926 14.3548 6.91475 14.4602C7.02024 14.5657 7.16332 14.625 7.3125 14.625H16.3125C16.4617 14.625 16.6048 14.5657 16.7102 14.4602C16.8157 14.3548 16.875 14.2117 16.875 14.0625V3.9375C16.875 3.78832 16.8157 3.64524 16.7102 3.53975C16.6048 3.43426 16.4617 3.375 16.3125 3.375H7.3125C7.16332 3.375 7.02024 3.43426 6.91475 3.53975C6.80926 3.64524 6.75 3.78832 6.75 3.9375V6.1875C6.75 6.33668 6.69074 6.47976 6.58525 6.58525C6.47976 6.69074 6.33668 6.75 6.1875 6.75C6.03832 6.75 5.89524 6.69074 5.78975 6.58525C5.68426 6.47976 5.625 6.33668 5.625 6.1875V3.9375C5.625 3.48995 5.80279 3.06072 6.11926 2.74426C6.43572 2.42779 6.86495 2.25 7.3125 2.25H16.3125C16.7601 2.25 17.1893 2.42779 17.5057 2.74426C17.8222 3.06072 18 3.48995 18 3.9375V14.0625C18 14.5101 17.8222 14.9393 17.5057 15.2557C17.1893 15.5722 16.7601 15.75 16.3125 15.75H7.3125C6.86495 15.75 6.43572 15.5722 6.11926 15.2557C5.80279 14.9393 5.625 14.5101 5.625 14.0625V11.8125C5.625 11.6633 5.68426 11.5202 5.78975 11.4148C5.89524 11.3093 6.03832 11.25 6.1875 11.25C6.33668 11.25 6.47976 11.3093 6.58525 11.4148C6.69074 11.5202 6.75 11.6633 6.75 11.8125V14.0625Z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.164279 9.39823C0.111895 9.34598 0.0703346 9.2839 0.0419773 9.21557C0.0136201 9.14723 -0.000976563 9.07397 -0.000976562 8.99998C-0.000976563 8.92599 0.0136201 8.85273 0.0419773 8.78439C0.0703346 8.71605 0.111895 8.65398 0.164279 8.60173L3.53928 5.22673C3.59158 5.17443 3.65367 5.13294 3.722 5.10464C3.79033 5.07634 3.86357 5.06177 3.93753 5.06177C4.01149 5.06177 4.08473 5.07634 4.15306 5.10464C4.22139 5.13294 4.28348 5.17443 4.33578 5.22673C4.38808 5.27903 4.42956 5.34111 4.45787 5.40945C4.48617 5.47778 4.50074 5.55102 4.50074 5.62498C4.50074 5.69894 4.48617 5.77218 4.45787 5.84051C4.42956 5.90884 4.38808 5.97093 4.33578 6.02323L1.9204 8.43748H11.8125C11.9617 8.43748 12.1048 8.49674 12.2103 8.60223C12.3158 8.70772 12.375 8.85079 12.375 8.99998C12.375 9.14916 12.3158 9.29224 12.2103 9.39773C12.1048 9.50322 11.9617 9.56248 11.8125 9.56248H1.9204L4.33578 11.9767C4.38808 12.029 4.42956 12.0911 4.45787 12.1594C4.48617 12.2278 4.50074 12.301 4.50074 12.375C4.50074 12.4489 4.48617 12.5222 4.45787 12.5905C4.42956 12.6588 4.38808 12.7209 4.33578 12.7732C4.28348 12.8255 4.22139 12.867 4.15306 12.8953C4.08473 12.9236 4.01149 12.9382 3.93753 12.9382C3.86357 12.9382 3.79033 12.9236 3.722 12.8953C3.65367 12.867 3.59158 12.8255 3.53928 12.7732L0.164279 9.39823Z" />
                    </g>
                    </svg>
                    <h6 onClick={handleLogOut}>{t("tableForms.labels.logout")}</h6>
                </button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
