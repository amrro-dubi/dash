import { createSlice , PayloadAction} from "@reduxjs/toolkit";
type permisionsState = {
  permissions: any 
  

};

const initialState: permisionsState = {
  permissions: {}
  

};

const permisionsSlice = createSlice({
  name: "permisions",
  initialState,
  reducers: {
    setPermissions: (state: permisionsState, action:PayloadAction) => {
      console.log(action.payload)
      state.permissions = action.payload
    },

    

    
  },
});

export const permissionsActions = permisionsSlice.actions;
export default permisionsSlice.reducer;