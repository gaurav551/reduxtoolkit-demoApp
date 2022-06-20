import { createSlice } from "@reduxjs/toolkit";


export const alertModalSlice = createSlice({
  name: "counter",
  initialState: {
    isOpen: false,
    type: null,
    message: null,
    linkText: null,
    link : null
  },
  reducers: {
   
    showModal: (state,action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.linkText = action.payload.linkText;
      state.link = action.payload.link
    },
    hideModal: (state) => {
        state.isOpen = false;
        state.type= null;
        state.message=null;
        state.linkText= null;
        state.link=  null
      },
   
   
   
  },
  
});

// Action creators are generated for each case reducer function
export const { showModal,hideModal } =
  alertModalSlice.actions;

export default alertModalSlice.reducer;
