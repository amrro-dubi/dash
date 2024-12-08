import { configureStore } from "@reduxjs/toolkit";

import modelReducer from "./modelSlice";
import { authApi } from "../apis/authSlice";


// import { homeApi } from "@/src/api/HomeApiSlice";
// import { catApi } from "../api/Categories";
const store = configureStore({
    reducer: {
     
        Model: modelReducer,
      
      
        // [amaduesApi.reducerPath]: amaduesApi.reducer,
        // cart:cartReducer,
        // [homeApi.reducerPath]: homeApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        // [catApi.reducerPath]: catApi.reducer,
    },
    middleware: (getDefaultMiddleware:any) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(
           authApi.middleware
          
        ),
});

// setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export default store;