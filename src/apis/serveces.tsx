import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL
const baseUrl = "https://real-estate.luxurylivinghomes.ae/";

const servicesApi = createApi({
  reducerPath: "servicesApi",
  tagTypes: ["admins", "roles", "food-basket"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("auth_data")
      if(token){
        const parsedToken = JSON.parse(token)
        headers.set(
          "Authorization",
          `Bearer ${parsedToken.token}`
        );
      }
      headers.set("Accept", "application/json");
      headers.set("lang", "ar");
      
  

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAdmins: builder.query<any, any>({
      query: ({ page, per_page }) => `admin/admin?per_page=${per_page}&page=${page}`,
      providesTags: ["admins"],
    }),

    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `admin/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admins"],
      transformResponse: (response, meta) => {
        console.log(meta?.response?.status);
      
        return { status: meta?.response?.status, response };
    },
    transformErrorResponse: (response, meta) => {

        return { status: meta?.response?.status, response };
    },
    }),
    createAdmin: builder.mutation<any, any>({
      query: (formData) => ({
          url: `admin/admin`,
          method: 'POST',
          body: formData,
      }),
      invalidatesTags: ["admins"],
      transformResponse: (response, meta) => {
          console.log(meta?.response?.status);
        
          return { status: meta?.response?.status, response };
      },
      transformErrorResponse: (response, meta) => {
 
          return { status: meta?.response?.status, response };
      },
  }),
    editAdmin: builder.mutation<any, any>({
      query: ({formData, id}) => ({
          url: `admin/admin/${id}`,
          method: 'POST',
          body: formData,
      }),
      invalidatesTags: ["admins"],
      transformResponse: (response, meta) => {
          console.log(meta?.response?.status);
        
          return { status: meta?.response?.status, response };
      },
      transformErrorResponse: (response, meta) => {
 
          return { status: meta?.response?.status, response };
      },
  }),

    getRoles: builder.query<any,{page?:number, per_page?:number}>({
      query: ({page, per_page}) => `admin/role?page=${page}&per_page${per_page}`,
      providesTags: ["roles"],
    }),
    createRole: builder.mutation<any, any>({
      query: (formData) => ({
          url: `admin/role`,
          method: 'POST',
          body: formData,
      }),
      invalidatesTags: ["roles"],
      transformResponse: (response, meta) => {
          console.log(meta?.response?.status);
        
          return { status: meta?.response?.status, response };
      },
      transformErrorResponse: (response, meta) => {
 
          return { status: meta?.response?.status, response };
      },
  }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `admin/role/${id}`,
        method: "DELETE",
      }),
      
      transformResponse: (response, meta) => {
        console.log(meta?.response?.status);
      
        return { status: meta?.response?.status, response };
    },
    transformErrorResponse: (response, meta) => {

        return { status: meta?.response?.status, response };
    },
      invalidatesTags: ["roles"],
    }),


    getPermissions: builder.query<any,{page?:number, per_page?:number}>({
      query: ({page, per_page}) => `admin/permission?page=${page}&per_page${per_page}`,
      providesTags: ["roles"],
    }),

   
   
   
    
  
   
   
  
  
  }),
});

export const {
  useGetAdminsQuery,
  useDeleteAdminMutation,
  useGetRolesQuery,
  useCreateAdminMutation,
  useEditAdminMutation,
  useGetPermissionsQuery,
  useCreateRoleMutation, useDeleteRoleMutation
} = servicesApi;
export default servicesApi;
