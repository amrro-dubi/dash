
import {Link} from 'react-router-dom';
import React, { useState } from 'react'

const SignUpModal = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
  
    const toggleConfirmPasswordVisibility = () => {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    };
  return (
    <div className="modal signUp-modal two fade" id="signUpModal01" tabIndex={-1} aria-labelledby="signUpModal01Label" aria-hidden="false">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-body">
        <div className="login-wrapper">
          <div className="login-img">
            <img src="/assets/img/home1/login-img.png" alt="" />
            <div className="logo">
              <Link to="/"><a><img src="/assets/img/logo.svg" alt="" /></a></Link>
            </div>
          </div>
          <div className="login-content">
            <div className="login-header">
              <h4 className="modal-title" id="signUpModal01Label">Sign Up</h4>
              <p>Already have an account? <button type="button" data-bs-toggle="modal" data-bs-target="#logInModal01">Log In</button></p>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x" /></button>
            </div>
            <form>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="form-inner">
                    <label>First Name*</label>
                    <input type="text" placeholder="Daniel" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-inner">
                    <label>Last Name*</label>
                    <input type="text" placeholder="Last name" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-inner">
                    <label>Enter your email address*</label>
                    <input type="email" placeholder="Type email" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-inner"> 
                    <label>Password*</label>
                    <input id="password1" type={passwordVisible ? 'text' : 'password'}value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*** ***" />
                    <i className={`bi bi-${passwordVisible? "eye":"eye-slash"}`} onClick={togglePasswordVisibility} id="togglePassword" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-inner">
                    <label>Confirm Password*</label>
                    <input id="password2" type={confirmPasswordVisible ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="*** ***" />
                    <i className={`bi bi-${confirmPasswordVisible?"eye":"eye-slash"}`}  onClick={toggleConfirmPasswordVisibility} id="togglePassword2" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-inner">
                    <button className="primary-btn2" type="submit">Sign Up Now</button>
                  </div>
                </div>
              </div>
              <div className="terms-conditon">
                <p>By sign up,you agree to the <a href="#">‘terms &amp; conditons’</a></p>
              </div>
              <ul className="social-icon">
                <li><a href="#"><img src="/assets/img/home1/icon/google.svg" alt="" /></a></li>
                <li><a href="#"><img src="/assets/img/home1/icon/facebook.svg" alt="" /></a></li>
                <li><a href="#"><img src="/assets/img/home1/icon/twiter.svg" alt="" /></a></li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default SignUpModal
