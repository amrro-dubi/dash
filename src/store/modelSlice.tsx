import { createSlice } from "@reduxjs/toolkit";
type AuthModelState = {
  openSidebar: boolean;
  openModelMenu: boolean;
  isLogin: boolean;
  userLogin: string | null;
  signUp: boolean;
};

const initialState: AuthModelState = {
    openSidebar: true,
  openModelMenu: false,
  isLogin: true,
  userLogin: null,
  signUp: false,
};

const ModelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setOpenSidebar: (state: AuthModelState) => {
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

    setIsLoginToTrue: (state: AuthModelState) => {
      state.isLogin = true;
    },
    SetToken: (state: AuthModelState, action: any) => {
      state.userLogin = action.payload;
    },
    setIsLoginToFalse: (state: AuthModelState) => {
      state.isLogin = false;
    },

    setSignupTofalse: (state: AuthModelState) => {
      state.signUp = false;
    },

    setSignupTotrue: (state: AuthModelState) => {
      state.signUp = true;
    },
  },
});

export const modelActions = ModelSlice.actions;
export default ModelSlice.reducer;