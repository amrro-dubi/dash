import {  useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";



import { toast } from "react-toastify";

import { z } from "zod";
import { useTranslation } from "react-i18next";
import { useValidationMessages } from "../components/Auth/authValidation";
import { useChangePasswordMutation } from "../apis/authSlice";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
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
   confirmPassword:string;
 
     current_password:string
};
const initalData = {
  
  password: "",
  confirmPassword:"",
  current_password:""
};
const ChangePassword = () => {
  const {t} = useTranslation()
  const [formData, setFormData ] = useState<loginFormData>(initalData);
  const [passwordVisible, setPasswordVisible] = useState(false);
 
//   const {token} = locatoin.state
  const validationMessages = useValidationMessages();
console.log(validationMessages)
  const navigate = useNavigate()
  const [toastData, setToastData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  console.log(errors)
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [changePassword, { isLoading }] = useChangePasswordMutation();
  
  useEffect(() => {
    if (toastData?.data?.status === 200) {
      toast.success("password changed succesfully!", {});
      // dispatch(authActions.setToken(JSON.stringify(toastData?.data?.data)))

      
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
   
    const result = formSchema(validationMessages).safeParse(formData);
    // phoneSchema.safeParse(phone);

    if (!result.success) {
      // @ts-ignore
      setErrors(result.error.formErrors.fieldErrors);
      return;
    }
    const requestFormData  = new FormData()

 
    requestFormData.append('password',formData.password)
    // requestFormData.append('token',token)
    requestFormData.append('password_confirmation',formData.confirmPassword)
    requestFormData.append('current_password',formData.current_password)
    requestFormData.append('_method',"patch")

    const data = await changePassword(requestFormData);
console.log(data)
    if (data?.data?.status === 200) {
      setFormData(initalData);
    }

    setToastData(data);
  };
  return (
    <div className="">
   
  
    <div className="flex !w-full">
      <div className="login-page">
        <div className="login-content !w-[50%]">
          <div className="flex flex-col mb-[40px] ">
            <h4 className="font-bold text-[20px]" id="logInModal01Label">
            {t("auth.resetPassword.changeTitle")}
            </h4>
          </div>
  
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
            <div className="">
                                       <div className="form-inner   ">
                                         <label>{t("auth.resetPassword.labels.current")}</label>
                                         <div className="relative">
                       
                                         <input
                                           id="password6"
                                           type={passwordVisible ? "text" : "password"}
                                           value={formData.current_password}
                                           name="current_password"
                                           required
                                           onChange={handleChange}
                                           placeholder={t("auth.login.placeholders.password")}
                                           />
                                         {!passwordVisible ? <IoIosEye onClick={togglePasswordVisibility} className="absolute text-primary size-5 top-[17px] ltr:right-[20px]" /> : <IoIosEyeOff onClick={togglePasswordVisibility} className="absolute text-primary size-5 top-[17px] ltr:right-[20px]" />}
                                           </div>
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
                            <div className="form-inner   ">
                              
                              <label>{t("auth.resetPassword.labels.confirmPassword")}</label>
                              <div className="relative">
            
                              <input
                                id="password6"
                                type={passwordVisible ? "text" : "password"}
                                value={formData.confirmPassword}
                                name="confirmPassword"
                                required
                                onChange={handleChange}
                                placeholder={t("auth.resetPassword.placeholders.confirmPassword")}
                              />
                              {!passwordVisible ? <IoIosEye onClick={togglePasswordVisibility} className="absolute text-primary size-5 top-[17px] ltr:right-[20px]" /> : <IoIosEyeOff onClick={togglePasswordVisibility} className="absolute text-primary size-5 top-[17px] ltr:right-[20px]" />}
                                </div>
                                {errors.confirmPassword && (
                                <p className="text-[#FF0000] text-[12px]">
                                  {errors.confirmPassword}
                                </p>
                              )}
                            </div>
                          </div>
             
  
              <div className="">
                <div className="form-inner">
                  <button className="primary-btn2" type="submit">
                    {t("auth.resetPassword.buttons.change")}
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

export default ChangePassword;
