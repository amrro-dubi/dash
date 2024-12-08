import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useValidationMessages } from "../authValidation";


import { toast } from "react-toastify";
import {  useResetPasswordMutation } from "../../../apis/authSlice";
import { z } from "zod";
const formSchema = (message: any) =>
  z
    .object({
      password: z
        .string()
      ,
       confirmPassword: z.string(),
    })
    .refine(
      (data) => {
        // Check if password matches password_confirmation
        return data.password === data.confirmPassword;
      },
      {
        message: message.confirmPass,
        path: ["confirmPassword"], // Specify the path to the field being validated
      }
    );
type loginFormData = {
  
  password: string;
   confirmPassword:string
};
const initalData = {
  
  password: "",
  confirmPassword:""
};
const ResetPassword = () => {
  const [formData, setFormData ] = useState<loginFormData>(initalData);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const locatoin = useLocation()
  const {token} = locatoin.state
  const validationMessages = useValidationMessages();
console.log(validationMessages)
  const navigate = useNavigate()
  const [toastData, setToastData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  
  useEffect(() => {
    if (toastData?.data?.status === 200) {
      toast.success("password changed succesfully!", {});
      // dispatch(authActions.setToken(JSON.stringify(toastData?.data?.data)))

      
      setToastData({});
      navigate("/");
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
   
    const result = formSchema(validationMessages).safeParse(formData);
    // phoneSchema.safeParse(phone);

    if (!result.success) {
      // @ts-ignore
      setErrors(result.error.formErrors.fieldErrors);
      return;
    }
    const loginFormData  = new FormData()

 
    loginFormData.append('password',formData.password)
    loginFormData.append('token',token)
    loginFormData.append('password_confirmation',formData.confirmPassword)

    const data = await resetPassword(loginFormData);
console.log(data)
    if (data?.data?.status === 200) {
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
               Reset your password
              </h4>
            </div>
            <form  onSubmit={handleSubmit}>
              <div className="row g-4">
              
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
               
                <div className="col-md-12">
                  <div className="form-inner">
                    <label>Confirm Password*</label>
                    <input
                      id="password6"
                      type={passwordVisible ? "text" : "password"}
                      value={formData.confirmPassword}
                      name="confirmPassword"
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
                {errors.confirmPassword && (
  <div className="alert alert-danger" role="alert">
    {errors.confirmPassword}
  </div>
)}

                <div className="col-lg-12">
                  <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                    <Link to="/forgetPass" className="forgot-pass">
                      Back?
                    </Link>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-inner">
                    <button className="primary-btn2" type="submit">
                      Reset
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

export default ResetPassword;
