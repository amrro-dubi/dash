import SelectComponent from '@/uitils/SelectComponent'
import React from 'react'

const MessageModal = () => {
  return (
    <div className="modal massage-modal fade" id="massageModal01" tabIndex={-1} aria-hidden="true">
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x" /></button>
        <div className="modal-body">
          <div className="modal-author-wrapper">
            <div className="row g-lg-4 gy-5">
              <div className="col-lg-6 d-flex align-items-center">
                <div className="author-area">
                  <div className="author-img">
                    <img src="/assets/img/inner-page/modal-author.png" alt="modal-author" />
                  </div>
                  <div className="author-content">
                    <h6>Natrison Mongla</h6>
                    <span>CEO &amp; Founder</span>
                    <ul>
                      <li><a href="https://www.facebook.com/"><i className="bx bxl-facebook" /></a></li>
                      <li><a href="https://twitter.com/"><i className="bx bxl-twitter" /></a></li>
                      <li><a href="https://www.linkedin.com/"><i className="bx bxl-linkedin" /></a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="contact-info">
                  <div className="single-contact" id="emailAdresss" data-whatsapp={+990737621432} data-emails="https://api.whatsapp.com/send?phone=990737621432&text=Hello this is the starting message">
                    <a><span><i className="bx bxl-whatsapp" />+99073762</span></a>
                  </div>
                  <div className="single-contact">
                    <a href="mailto:info@example.com"><span><i className="bx bx-at" /> info@example.com</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form>
            <h5 className="main-title">Your Details</h5>
            <div className="row">
              <div className="col-md-6 mb-30">
                <div className="form-inner">
                  <label>First Name*</label>
                  <input type="text" placeholder="Ex- Rocky " />
                </div>
              </div>
              <div className="col-md-6 mb-30">
                <div className="form-inner">
                  <label>Last Name*</label>
                  <input type="text" placeholder="Jhon" />
                </div>
              </div>
              <div className="col-md-6 mb-30">
                <div className="form-inner">
                  <label>Email Address*</label>
                  <input type="email" placeholder="info@gmail.com" />
                </div>
              </div>
              <div className="col-md-6 mb-30">
                <div className="form-inner">
                  <label>Phone Number*</label>
                  <input id="phone" type="tel" name="phone" placeholder='Phone Number' />
                </div>
              </div>
              <div className="col-md-6 mb-30">
                <div className="form-inner">
                  <label>Your Address*</label>
                  <input type="text" placeholder="Ex- Rocky " />
                </div>
              </div>
              <div className="col-md-6 mb-30">
                <div className="form-inner">
                  <label>Where did you hear us?*</label>
                  <SelectComponent options={["Facebook","Twitter","Instagram","LinkedIn"]} />
                </div>
              </div>
              <div className="col-md-12 mb-30">
                <div className="form-inner">
                  <label>Message*</label>
                  <textarea placeholder="Your message here" defaultValue={""} />
                </div>
              </div>
            </div>
            <h5 className="main-title">Your Preferred Date &amp; Time</h5>
            <div className="row">
              <div className="col-md-6 mb-30">
                <div className="form-inner">
                  <label>Your Date*</label>
                  <input type="date" id="datepicker2" placeholder="02 April, 2023" />
                  
                </div>
              </div>
              <div className="col-md-6 mb-30">
                <div className="form-inner">
                  <label>Viewing Time*</label>
                  <SelectComponent options={["10 : 00 am","11 : 00 am","12 : 00 am","01 : 00 am","02 : 00 am","03 : 00 am","04 : 00 am","05 : 00 am","06 : 00 am"]} placeholder={"Select Time"} />

                </div>
              </div>
              <div className="col-12">
                <div className="col-lg-12">
                  <div className="form-inner">
                    <label className="containerss">
                      <input type="checkbox" />
                      <span className="checkmark" />
                      <span className="stars">
                        By submitting this form, I agree to terms of Conditions.
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-btn-group  pt-30">
              <button className="primary-btn2" type="submit">Submit Now</button>
              <button className="primary-btn2 two" type="button" data-bs-dismiss="modal" aria-label="Close">Cancle</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default MessageModal
