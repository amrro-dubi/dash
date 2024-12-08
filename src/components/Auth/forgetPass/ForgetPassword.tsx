import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import "../Login/login";

import { toast } from "react-toastify";
import { useForgetPasswordMutation } from "../../../apis/authSlice";

type loginFormData = {
  email: string;
};
const initalData = {
  email: "",
};
const ForgetPassword = () => {
  const [formData, setFormData] = useState<loginFormData>(initalData);

  const navigate = useNavigate();
  const [toastData, setToastData] = useState<any>({});

  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  useEffect(() => {
    if (toastData?.data?.status === 200) {
      toast.success("Code sent succesfully!", {});
      // dispatch(authActions.setToken(JSON.stringify(toastData?.data?.data)))

    
      setToastData({});
      navigate("/confirmCode", {state:{email:formData.email}})
    
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

    const forgetFormData = new FormData();

    forgetFormData.append("email", formData.email);

    const data = await forgetPassword(forgetFormData);
    console.log(data);
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
          <div className="login-content">
            <div className="login-header">
              <h4 className="modal-title" id="logInModal01Label">
                Forget Password
              </h4>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-12">
                  <div className="form-inner">
                    <label>Enter your email address*</label>
                    <input
                      type="email"
                      name="email"
                      required
                      onChange={handleChange}
                      placeholder="Type email"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                    <Link to="/" className="forgot-pass">
                      Remember Password?
                    </Link>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-inner">
                    <button className="primary-btn2" type="submit">
                      Send
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

export default ForgetPassword;
