

import {Link} from 'react-router-dom'
import { Suspense } from 'react'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import img1 from '../../assets/img/dashboard/icon/love-icon.svg'

const Home = () => {
    const {openSidebar} = useSelector((state:RootState)=> state.Model)


  return (
    <Suspense fallback={<div>LOADING....</div>}>
    <div className={`main-content ${openSidebar?"slide":""}`}>
                <div className="row">
                <div className="col-xl-9 col-lg-7">
                    <div className="main-content-title-profile mb-50">
                    <div className="main-content-title">
                        <h3>Hi, Egens! </h3>
                        <img src={img1} alt="" />
                    </div>
                    <div className="profile">
                        <a href="#">
                        View Profile
                        <svg xmlns="http://www.w3.org/2000/svg" width={8} height={8} viewBox="0 0 8 8">
                            <path d="M6.669 2.27202L0.94102 8L0 7.05898L5.72731 1.331H0.679478V0H8V7.32052H6.669V2.27202Z" />
                        </svg>
                        </a>
                    </div>
                    </div>
                    <div className="counter-area">
                    <div className="row g-3">
                        <div className="col-xl-3 col-md-6">
                        <div className="counter-single">
                            <div className="counter-icon">
                            <img src="../../assets/img/dashboard/icon/counter-active-property-icon.svg" alt="" />
                            </div>
                            <div className="counter-content">
                            <p>Active Property</p>
                            <div className="number">
                                <h3 className="counter">20</h3>
                                <span>+</span>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                        <div className="counter-single two">
                            <div className="counter-icon">
                            <img src="/assets/img/dashboard/icon/counter-expire-property-icon.svg" alt="" />
                            </div>
                            <div className="counter-content">
                            <p>Expire Property</p>
                            <div className="number">
                                <h3 className="counter">30</h3>
                                <span>+</span>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                        <div className="counter-single three">
                            <div className="counter-icon">
                            <img src="/assets/img/dashboard/icon/counter-pending-property-icon.svg" alt="" />
                            </div>
                            <div className="counter-content">
                            <p>Pending Property</p>
                            <div className="number">
                                <h3 className="counter">05</h3>
                                <span>+</span>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                        <div className="counter-single four">
                            <div className="counter-icon">
                            <img src="/assets/img/dashboard/icon/counter-delete-property-icon.svg" alt="" />
                            </div>
                            <div className="counter-content">
                            <p>Delete Property</p>
                            <div className="number">
                                <h3 className="counter">10</h3>
                                <span>+</span>
                            </div>
                            </div>
                            <img src="/assets/img/dashboard/icon/counter-area-top-vector.svg" alt="" className="counter-area-vector" />
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="recent-listing-area">
                    <h6>My Recent Listing</h6>
                    <div className="recent-listing-table">
                        <table className="eg-table2">
                        <thead>
                            <tr>
                            <th>Property Info</th>
                            <th>When Added</th>
                            <th>Favourite</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td data-label="Property Info">
                                <div className="property-info-wrapper">
                                <div className="property-info-img">
                                    <img src="/assets/img/dashboard/property-info-img1.png" alt="" />
                                </div>
                                <div className="property-info-content">
                                    <div className="location">
                                    <Link to="/property-list/left-sidebar"><a><i className="bi bi-geo-alt" />  Panama City</a></Link>
                                    </div>
                                    <h6><Link to="/property-list/left-sidebar"><a>Willow Creek Residence</a></Link></h6>
                                    <Link to="/property-list/deatils1">
                                        <a  className="view-details">
                                            <img src="/assets/img/dashboard/icon/view-details-icon.svg" alt="" />
                                            View Details
                                        </a>
                                    </Link>
                                </div>
                                </div>
                            </td>
                            <td data-label="When Added" className="table-product">
                                <span>02 April, 2023</span>
                            </td>
                            <td data-label="Favourite">
                                <span>100 person</span>
                            </td>
                            <td data-label="Action">
                                <ul className="action-buttons">
                                <li><img src="/assets/img/dashboard/icon/action-edit-btn.svg" alt="" /></li>
                                <li><img src="/assets/img/dashboard/icon/action-delete-btn.svg" alt="" /></li>
                                </ul>
                            </td>
                            </tr>
                            <tr>
                            <td data-label="Property Info">
                                <div className="property-info-wrapper">
                                <div className="property-info-img">
                                    <img src="/assets/img/dashboard/property-info-img2.png" alt="" />
                                </div>
                                <div className="property-info-content">
                                    <div className="location">
                                    <Link to="/property-list/left-sidebar"><a><i className="bi bi-geo-alt" />  Panama City</a></Link>
                                    </div>
                                    <h6><Link to="/property-list/left-sidebar"><a>Harmony House</a></Link></h6>
                                    <Link to="/property-list/deatils1">
                                        <a  className="view-details">
                                            <img src="/assets/img/dashboard/icon/view-details-icon.svg" alt="" />
                                            View Details
                                        </a>
                                    </Link>
                                </div>
                                </div>
                            </td>
                            <td data-label="When Added" className="table-product">
                                <span>05 April, 2023</span>
                            </td>
                            <td data-label="Favourite">
                                <span>22 person</span>
                            </td>
                            <td data-label="Action">
                                <ul className="action-buttons">
                                <li><img src="/assets/img/dashboard/icon/action-edit-btn.svg" alt="" /></li>
                                <li><img src="/assets/img/dashboard/icon/action-delete-btn.svg" alt="" /></li>
                                </ul>
                            </td>
                            </tr>
                            <tr>
                            <td data-label="Property Info">
                                <div className="property-info-wrapper">
                                <div className="property-info-img">
                                    <img src="/assets/img/dashboard/property-info-img3.png" alt="" />
                                </div>
                                <div className="property-info-content">
                                    <div className="location">
                                    <Link to="/property-list/left-sidebar"><a><i className="bi bi-geo-alt" />  Panama City</a></Link>
                                    </div>
                                    <h6><Link to="/property-list/left-sidebar"><a>Sunflower Cottage</a></Link></h6>
                                    <Link to="/property-list/deatils1">
                                        <a  className="view-details">
                                            <img src="/assets/img/dashboard/icon/view-details-icon.svg" alt="" />
                                            View Details
                                        </a>
                                    </Link>
                                </div>
                                </div>
                            </td>
                            <td data-label="When Added" className="table-product">
                                <span>08 july, 2023</span>
                            </td>
                            <td data-label="Favourite">
                                <span>16 person</span>
                            </td>
                            <td data-label="Action">
                                <ul className="action-buttons">
                                <li><img src="/assets/img/dashboard/icon/action-edit-btn.svg" alt="" /></li>
                                <li><img src="/assets/img/dashboard/icon/action-delete-btn.svg" alt="" /></li>
                                </ul>
                            </td>
                            </tr>
                            <tr>
                            <td data-label="Property Info">
                                <div className="property-info-wrapper">
                                <div className="property-info-img">
                                    <img src="/assets/img/dashboard/property-info-img4.png" alt="" />
                                </div>
                                <div className="property-info-content">
                                    <div className="location">
                                    <Link to="/property-list/left-sidebar"><a><i className="bi bi-geo-alt" />  Panama City</a></Link>
                                    </div>
                                    <h6><Link to="/property-list/left-sidebar"><a>Sunset Retreat</a></Link></h6>
                                    <Link to="/property-list/deatils1">
                                        <a  className="view-details">
                                            <img src="/assets/img/dashboard/icon/view-details-icon.svg" alt="" />
                                            View Details
                                        </a>
                                    </Link>
                                </div>
                                </div>
                            </td>
                            <td data-label="When Added" className="table-product">
                                <span>10 july, 2023</span>
                            </td>
                            <td data-label="Favourite">
                                <span>06 person</span>
                            </td>
                            <td data-label="Action">
                                <ul className="action-buttons">
                                <li><img src="/assets/img/dashboard/icon/action-edit-btn.svg" alt="" /></li>
                                <li><img src="/assets/img/dashboard/icon/action-delete-btn.svg" alt="" /></li>
                                </ul>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                        <div className="pagination-area">
                        <ul className="paginations">
                            <li className="page-item active">
                            <a href="#">1</a>
                            </li>
                            <li className="page-item">
                            <a href="#">2</a>
                            </li>
                            <li className="page-item">
                            <a href="#">3</a>
                            </li>
                        </ul>
                        <ul className="paginations-buttons">
                            <li>
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width={7} height={14} viewBox="0 0 7 14">
                                <path d="M0 7.00008L7 0L2.54545 7.00008L7 14L0 7.00008Z" />
                                </svg>
                                Prev
                            </a>
                            </li>
                            <li>
                            <a href="#">
                                Next
                                <svg xmlns="http://www.w3.org/2000/svg" width={7} height={14} viewBox="0 0 7 14" fill="none">
                                <path d="M7 7.00008L0 0L4.45455 7.00008L0 14L7 7.00008Z" />
                                </svg>
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-5">
                    <div className="property-details-img">
                    <div className="property-details-content">
                        <p>Featured Property</p>
                        <h6>Sunflower Cottage</h6>
                        <Link to="/product-list/details1"><a  className="primary-btn3">View Details</a></Link>
                    </div>
                    </div>
                    <div className="message-area">
                    <div className="message-area-title">
                        <h6>Message For You</h6>
                    </div>
                    <ul className="message-list">
                        <li>
                        <div className="author-area">
                            <div className="author-img">
                            <img src="/assets/img/dashboard/message-author-img1.png" alt="" />
                            </div>
                            <div className="author-content">
                            <div className="author-title">
                                <h6>Jacoline Franqly,</h6>
                                <span>02 April, 2023</span>
                            </div>
                            <p>Love how this home is flooded with natural light.</p>
                            </div>
                        </div>
                        </li>
                        <li>
                        <div className="author-area">
                            <div className="author-img">
                            <img src="/assets/img/dashboard/message-author-img2.png" alt="" />
                            </div>
                            <div className="author-content">
                            <div className="author-title">
                                <h6>Daniel Scoot,</h6>
                                <span>06 April, 2023</span>
                            </div>
                            <p>Love how this home is flooded with natural light.</p>
                            </div>
                        </div>
                        </li>
                        <li>
                        <div className="author-area">
                            <div className="author-img">
                            <img src="/assets/img/dashboard/message-author-img3.png" alt="" />
                            </div>
                            <div className="author-content">
                            <div className="author-title">
                                <h6>Robert Smith,</h6>
                                <span>08 February, 2023</span>
                            </div>
                            <p>Love how this home is flooded with natural light.</p>
                            </div>
                        </div>
                        </li>
                        <li>
                        <div className="author-area">
                            <div className="author-img">
                            <img src="/assets/img/dashboard/message-author-img4.png" alt="" />
                            </div>
                            <div className="author-content">
                            <div className="author-title">
                                <h6>Jandip Saha,</h6>
                                <span>10 July, 2023</span>
                            </div>
                            <p>Love how this home is flooded with natural light.</p>
                            </div>
                        </div>
                        </li>
                        <li>
                        <div className="author-area">
                            <div className="author-img">
                            <img src="/assets/img/dashboard/message-author-img2.png" alt="" />
                            </div>
                            <div className="author-content">
                            <div className="author-title">
                                <h6>Jhon Abraham,</h6>
                                <span>22 May, 2023</span>
                            </div>
                            <p>Love how this home is flooded with natural light.</p>
                            </div>
                        </div>
                        </li>
                        <li>
                        <div className="author-area">
                            <div className="author-img">
                            <img src="/assets/img/dashboard/message-author-img5.png" alt="" />
                            </div>
                            <div className="author-content">
                            <div className="author-title">
                                <h6>Khuwsani Dip,</h6>
                                <span>01 May, 2023</span>
                            </div>
                            <p>Love how this home is flooded with natural light.</p>
                            </div>
                        </div>
                        </li>
                        <li>
                        <div className="author-area">
                            <div className="author-img">
                            <img src="/assets/img/dashboard/message-author-img2.png" alt="" />
                            </div>
                            <div className="author-content">
                            <div className="author-title">
                                <h6>Smith Mike,</h6>
                                <span>12 July, 2023</span>
                            </div>
                            <p>Love how this home is flooded with natural light.</p>
                            </div>
                        </div>
                        </li>
                    </ul>
                    <a href="#" className="view-message">
                        View All Message
                        <svg xmlns="http://www.w3.org/2000/svg" width={8} height={8} viewBox="0 0 8 8">
                        <path d="M6.669 2.27202L0.94102 8L0 7.05898L5.72731 1.331H0.679478V0H8V7.32052H6.669V2.27202Z" />
                        </svg>
                    </a>
                    </div>
                </div>
                </div>
            </div>
    </Suspense>
  )
}

export default Home
