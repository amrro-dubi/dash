import { configureStore } from "@reduxjs/toolkit";
import modalSlice from './modelSlice'
import permisionsReducer from './permisions'

import { authApi } from "../apis/authSlice";
import servicesApi from "../apis/serveces";


// import { homeApi } from "@/src/api/HomeApiSlice";
// import { catApi } from "../api/Categories";
const store = configureStore({
    reducer: {
         
        Model: modalSlice,
        permissions: permisionsReducer,
      
      
        // [amaduesApi.reducerPath]: amaduesApi.reducer,
        // cart:cartReducer,
        [servicesApi.reducerPath]: servicesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        // [catApi.reducerPath]: catApi.reducer,
    },
    middleware: (getDefaultMiddleware:any) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(
           authApi.middleware,
           servicesApi.middleware
          
        ),
});

// setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export default store;