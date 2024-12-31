import { createSlice } from "@reduxjs/toolkit";
type AuthModelState = {
  openSidebar: boolean;
  openModelMenu: boolean;

};

const initialState: AuthModelState = {
    openSidebar: true,
  openModelMenu: false,

};

const modalSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setOpenSidebar: (state: AuthModelState) => {
      console.log(state.openSidebar)
      state.openSidebar = !state.openSidebar;
    },

    closeAuthModel: (state: AuthModelState) => {
      state.openSidebar = false;
    },

    openModelMenu: (state: AuthModelState) => {
      state.openModelMenu = true;
    },

    closeModelMenu: (state: AuthModelState) => {
      state.openModelMenu = false;
    },

    
  },
});

export const modelActions = modalSlice.actions;
export default modalSlice.reducer;