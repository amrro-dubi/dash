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
      // headers.set("Accept-Language", "ar");
      
  

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

    getRoles: builder.query<any, void>({
      query: () => `admin/role`,
      providesTags: ["roles"],
    }),

    deleteRole: builder.mutation({
      query: (id) => ({
        url: `admin/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admins"],
    }),

   
   
   
    
  
   
   
  
  
  }),
});

export const {
  useGetAdminsQuery,
  useDeleteAdminMutation,
  useGetRolesQuery,
  useCreateAdminMutation
} = servicesApi;
export default servicesApi;
