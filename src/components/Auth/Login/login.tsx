import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "./login.css";
import { IoIosEye,IoIosEyeOff } from "react-icons/io"
import { useAdminloginMutation } from "../../../apis/authSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

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
const {t} = useTranslation()
  const navigate = useNavigate()
  const [toastData, setToastData] = useState<any>({});
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("language");

    document.documentElement.dir = savedLanguage
      ? savedLanguage === "ar"
        ? "rtl"
        : "ltr"
      : "ltr";
  }, []);
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
    <div className="login-container">
    <div className="overlay"> </div>
  
    <div className="login-wrapper">
      <div className="login-page">
        <div className="login-content">
          <div className="login-header">
            <h4 className="modal-title" id="logInModal01Label">
              {t("auth.login.title")}
            </h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-col-12 gap-4">
              <div className="">
                <div className="form-inner">
                  <label>{t("auth.login.labels.email")}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                    placeholder={t("auth.login.placeholders.email")}
                  />
                </div>
              </div>
              <div className="">
                <div className="form-inner   ">
                  <label>{t("auth.login.labels.password")}</label>
                  <div className="relative">

                  <input
                    id="password6"
                    type={passwordVisible ? "text" : "password"}
                    value={formData.password}
                    name="password"
                    required
                    onChange={handleChange}
                    placeholder={t("auth.login.placeholders.password")}
                    />
                  {!passwordVisible ? <IoIosEye onClick={togglePasswordVisibility} className="absolute text-primary size-5 top-[17px] ltr:right-[20px]" /> : <IoIosEyeOff onClick={togglePasswordVisibility} className="absolute text-primary size-5 top-[17px] ltr:right-[20px]" />}
                    </div>
                </div>
              </div>
              <div className="">
                <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                  <Link to="/forgetPass" className="forgot-pass">
                    {t("auth.login.links.forgotPassword")}
                  </Link>
                </div>
              </div>
              <div className="">
                <div className="form-inner">
                  <button className="primary-btn2" type="submit">
                    {t("auth.login.buttons.submit")}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Login;
