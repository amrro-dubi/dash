import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL
const baseUrl = "https://real-estate.luxurylivinghomes.ae/";

const servicesApi = createApi({
  reducerPath: "servicesApi",
  tagTypes: ["admins", "roles",'cites', "food-basket"],
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

    getCites: builder.query<any, any>({
      query: ({ page, per_page }) => `admin/city?per_page=${per_page}&page=${page}`,
      providesTags: ["cites"],
      
    }),

    deleteCity: builder.mutation({
      query: (id) => ({
        url: `admin/city/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cites"],
      transformResponse: (response, meta) => {
        console.log(meta?.response?.status);
      
        return { status: meta?.response?.status, response };
    },
    transformErrorResponse: (response, meta) => {

        return { status: meta?.response?.status, response };
    },
    }),
    createCity: builder.mutation<any, any>({
      query: (formData) => ({
          url: `admin/city`,
          method: 'POST',
          body: formData,
      }),
      
      invalidatesTags: ["cites"],
      transformResponse: (response, meta) => {
          console.log(meta?.response?.status);
        
          return { status: meta?.response?.status, response };
      },
      transformErrorResponse: (response, meta) => {
 
          return { status: meta?.response?.status, response };
      },
  }),
    editCity: builder.mutation<any, any>({
      query: ({formData, id}) => ({
          url: `admin/city/${id}`,
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

  
    
  
   
   
  findRecord: builder.query<any, any>({
    query: ({ id, url }) => `${url}/${id}`,
    
    
  }),

  editRecord: builder.mutation<any, { url: string; id: string; formData: any; inValid: string[] }>({
    query: ({ formData, id, url }) => ({
      url: `${url}/${id}`,
      method: 'POST',
      body: formData,
    }),
  //@ts-ignore
    invalidatesTags: (result, error, { inValid }:{inValid:string[]}) => {
      // Map the `inValid` array to a format expected by `invalidatesTags`
      console.log(inValid)
      return inValid; 
    },
  
    transformResponse: (response, meta) => {
      console.log(meta?.response?.status);
      return { status: meta?.response?.status, response };
    },
  
    transformErrorResponse: (response, meta) => {
      return { status: meta?.response?.status, response };
    },
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
  useCreateRoleMutation, useDeleteRoleMutation,
  useGetCitesQuery,
  useCreateCityMutation, useDeleteCityMutation, useEditCityMutation,useFindRecordQuery, useEditRecordMutation
} = servicesApi;
export default servicesApi;
