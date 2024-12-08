import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { User, LoginResponse } from "../types/AuthTypes";
import i18n from "../i18n";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://real-estate.luxurylivinghomes.ae/",
    prepareHeaders: (headers) => {
      // const token = localStorage.getItem("token");

      // headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      headers.set("Accept-Language", i18n.language);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    corporateRegister: builder.mutation<any, any>({
      query: (formData) => ({
        url: "register/corporate/",
        method: "POST",
        body: formData,
      }),
    }),
    userRegister: builder.mutation<any, any>({
      query: (formData) => ({
        url: "register/individual/",
        method: "POST",
        body: formData,
      }),
    }),
    activation: builder.mutation<any, any>({
      query: (formData) => ({
        url: "register/activate/",
        method: "POST",
        body: formData,
      }),
    }),

    verify: builder.mutation<any, any>({
      query: (code) => ({
        url: "/verify",
        method: "POST",
        body: code,
      }),
    }),

    Adminlogin: builder.mutation<any, any>({
        query: (formData) => ({
            url: `admin/auth/login`,
            method: 'POST',
            body: formData,
        }),

        transformResponse: (response, meta) => {
            console.log(meta?.response?.status);
          
            return { status: meta?.response?.status, response };
        },
        transformErrorResponse: (response, meta) => {
   
            return { status: meta?.response?.status, response };
        },
    }),
    forgetPassword: builder.mutation<any, any>({
        query: (formData) => ({
            url: `admin/auth/resetPassword`,
            method: 'POST',
            body: formData,
        }),

        transformResponse: (response, meta) => {
            console.log(meta?.response?.status);
          
            return { status: meta?.response?.status, response };
        },
        transformErrorResponse: (response, meta) => {
   
            return { status: meta?.response?.status, response };
        },
    }),
    confirmCode: builder.mutation<any, any>({
        query: (formData) => ({
            url: `admin/auth/confirmPinCode`,
            method: 'POST',
            body: formData,
        }),

        transformResponse: (response, meta) => {
            console.log(meta?.response?.status);
          
            return { status: meta?.response?.status, response };
        },
        transformErrorResponse: (response, meta) => {
   
            return { status: meta?.response?.status, response };
        },
    }),
    resetPassword: builder.mutation<any, any>({
        query: (formData) => ({
            url: `admin/auth/confirmPassword`,
            method: 'POST',
            body: formData,
        }),

        transformResponse: (response, meta) => {
            console.log(meta?.response?.status);
          
            return { status: meta?.response?.status, response };
        },
        transformErrorResponse: (response, meta) => {
   
            return { status: meta?.response?.status, response };
        },
    }),

    
    logout: builder.mutation<any, void>({
        query: () => {
          const token = localStorage.getItem("auth_data");
          
       
         return {
            url: `admin/auth/logout`,
            method: 'POST',
            headers: {
              //@ts-ignore
              Authorization: `Bearer ${JSON.parse(token).token}`,
            },
           
        }},

        transformResponse: (response, meta) => {
            console.log(meta?.response?.status);
          
            return { status: meta?.response?.status, response };
        },
        transformErrorResponse: (response, meta) => {
   
            return { status: meta?.response?.status, response };
        },
    }),

    
   
  
    changePassword: builder.mutation<any, any>({
      query: (formData) => {
        // Retrieve auth_data from localStorage and parse it
        const authData = JSON.parse(localStorage.getItem("auth_data") || "{}");

        // Get the access token from the parsed auth_data
        const accessToken = authData.access;

        return {
          url: "user/change-password/",
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    deleteAccount: builder.mutation<any, any>({
      query: (formData) => {
        // Retrieve auth_data from localStorage and parse it
        const authData = JSON.parse(localStorage.getItem("auth_data") || "{}");

        // Get the access token from the parsed auth_data
        const accessToken = authData.access;

        return {
          url: "user/delete-account/",
          method: "DELETE",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),

   
  }),
});

export const {
  useAdminloginMutation,
  useCorporateRegisterMutation,
  useUserRegisterMutation,
  useConfirmCodeMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useForgetPasswordMutation,
  useActivationMutation,
  useDeleteAccountMutation,
  useVerifyMutation,
 
  useChangePasswordMutation,
 
} = authApi;