import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import i18n from "../i18n";


// Define the base URL
const baseUrl = "https://realestate-api.tetane.com/";

const servicesApi = createApi({
  reducerPath: "servicesApi",
  tagTypes: ["admins", "roles",'cites', "food-basket", 'areas', 'developers','amenites','services', 'types','permisions'],
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
      headers.set("lang", i18n.language);
      
  


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


    gitCity: builder.query<unknown,{page?:number, per_page?:number}>({
      query: ({page, per_page}) => `admin/city?page=${page}&per_page${per_page}`,
      providesTags: ["cites"],
    }),
    gitDeveloper: builder.query<any,{page?:number, per_page?:number}>({
      query: ({page, per_page}) => `admin/developer?page=${page}&per_page${per_page}`,
      providesTags: ["developers"],
    }),

    getPermissions: builder.query<any,{page?:number, per_page?:number}>({
      query: ({page, per_page}) => `admin/permission?page=${page}&per_page${per_page}`,
      providesTags: ["roles"],
    }),

   
  
    
  
  creatRecord: builder.mutation<any, { url: string;  formData: any; inValid: string[] }>({
    query: ({ formData,  url }) => ({
      url: `${url}`,
      method: 'POST',
      body: formData,
    }),
  //@ts-ignore
    invalidatesTags: (result, error, { inValid }:{inValid:string[]}) => {
      // Map the `inValid` array to a format expected by `invalidatesTags`
     
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
   

  getRecords: builder.query<unknown, { page?:number, per_page?:number,url:string, searchKeyword?: string,city_id?:string,developer_id?:string, area_id?:string, inValid: string[]  }>({
    query: ({ page, per_page , url, searchKeyword, city_id, area_id, developer_id}) => `${url}?${searchKeyword? `query=${searchKeyword}` :''}&${city_id? `city_id=${city_id}` :''}&${area_id? `area_id=${area_id}` :''}&${developer_id? `developer_id=${developer_id}` :''}&${per_page? `per_page=${per_page}&page=${page}` : ''}`,
    //@ts-ignore
    providesTags: (result, error, { inValid }:{inValid:string[]}) => {
      // Map the `inValid` array to a format expected by `invalidatesTags`
      console.log(inValid)
      return inValid; 
    },
    keepUnusedDataFor: 0,
    
  }),



  findRecord: builder.query<any, any>({
    query: ({ id, url }) => `${url}/${id}`,
    keepUnusedDataFor: 0,
    
  }),

  editRecord: builder.mutation<any, { url: string; id: string; formData: any; inValid: string[], method?:string }>({
    query: ({ formData, id, url , method}) => ({
      url: `${url}/${id}`,
      method: `${method? method: "POST"}`,
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


  deleteRecord: builder.mutation<any, {id:string, url:string, inValid:string[]}>({
    query: ({id, url}) => ({
      url: `${url}/${id}`,
      method: "DELETE",
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
 useFindRecordQuery, useEditRecordMutation, useCreatRecordMutation, useGetRecordsQuery, useDeleteRecordMutation, useGitCityQuery, useGitDeveloperQuery
} = servicesApi;
export default servicesApi;
