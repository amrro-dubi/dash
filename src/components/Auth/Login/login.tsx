import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./login.css";

import { useAdminloginMutation } from "../../../apis/authSlice";
import { toast } from "react-toastify";

type loginFormData = {
  email: string;
  password: string;
};
const initalData = {
  email: "",
  password: "",
};
const Login = () => {
  const [formData, setFormData ] = useState<loginFormData>(initalData);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate()
  const [toastData, setToastData] = useState<any>({});
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [Adminlogin, { isLoading }] = useAdminloginMutation();
  useEffect(()=>{

    const userData = localStorage.getItem('auth_data')
    if(userData){
     navigate('/home')
    }
  },[])
  useEffect(() => {
    if (toastData?.data?.status === 200) {
      toast.success("login succesfully!", {});
      // dispatch(authActions.setToken(JSON.stringify(toastData?.data?.data)))

      localStorage.setItem(
        "auth_data",
        // @ts-ignore
        JSON.stringify(toastData?.data?.response?.data?.admin)
      );
      setToastData({});
      navigate("/home");
      // Remove the authPopup from localStorage and close the modal
    }
    if (toastData?.error?.status === 422) {

      toast.error(toastData?.error?.response?.data?.message, {});
      setToastData({});
    }
    if (toastData?.error?.status === 400) {

      toast.error("password wrong!", {});
      // toast.error(toastData?.error?.response?.data?.message, {});
      setToastData({});
    }
    if (toastData?.error?.data?.status === 500) {
      toast.error(toastData?.error?.data?.message, {});
      setToastData({});
    }

    if (isLoading) {
      toast.loading("Loading...", {
        toastId: "loginLoadingToast",
        autoClose: false,
      });
    } else {
      toast.dismiss("loginLoadingToast");
    }
  }, [toastData, isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //   const goForgetPasswordPage = () => {
  //     props.openForgetPass();
  //     dispatch(modelActions.setIsLoginToFalse());
  //     dispatch(modelActions.setSignupTofalse());
  //   };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.email = formData.email.trim();

    const loginFormData  = new FormData()

    loginFormData.append('email',formData.email)
    loginFormData.append('password',formData.password)

    const data = await Adminlogin(loginFormData);
console.log(data)
    if (data?.data?.status_code === 200) {
      setFormData(initalData);
    }

    setToastData(data);
  };
  return (
    <div className="w-100  login-container">
      <div className="overlay"> </div>

      <div className="login-wrapper">
        <div className="login-page">
          {/* <div className="login-img">
              <img src={loginImage} alt="" />
              <div className="logo">
                <Link to="/"><a><img src={logo} alt="" /></a></Link>
              </div>
            </div> */}
           
          <div className="login-content">
            <div className="login-header">
              <h4 className="modal-title" id="logInModal01Label">
                Log In
              </h4>
            </div>
            <form  onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-12">
                  <div className="form-inner">
                    <label>Enter your email address*</label>
                    <input type="email" name="email" required onChange={handleChange} placeholder="Type email" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-inner">
                    <label>Password*</label>
                    <input
                      id="password6"
                      type={passwordVisible ? "text" : "password"}
                      value={formData.password}
                      name="password"
                      required
                      onChange={handleChange}
                      placeholder="*** ***"
                    />
                    <i
                      className={`bi bi-${
                        passwordVisible ? "eye" : "eye-slash"
                      }`}
                      onClick={togglePasswordVisibility}
                      id="togglePassword"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                    <Link to="/forgetPass" className="forgot-pass">
                      Forget Password?
                    </Link>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-inner">
                    <button className="primary-btn2" type="submit">
                      Log In
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="terms-conditon">
                  <p>By sign up,you agree to the <a href="#">‘terms &amp; conditons’</a></p>
                </div>
                <ul className="social-icon">
                  <li><a href="#"><img src={googleIcon} alt="" /></a></li>
                  <li><a href="#"><img src={faceIcon} alt="" /></a></li>
                  <li><a href="#"><img src={twitterIcon} alt="" /></a></li>
                </ul> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
