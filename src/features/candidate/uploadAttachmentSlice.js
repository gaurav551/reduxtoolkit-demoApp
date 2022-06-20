import { formLabelClasses } from "@mui/material";
import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../configs";

export const uploadAttachment = createAsyncThunk(
  'uploadAttachment',
  async (data, thunkAPI) => {
    const resposne = await axios.post(`${baseUrl}api/candidate/uploadAttachments`,data)
    return resposne.data
  }
)

export const counterSlice = createSlice({
  name: "upload",
  initialState: {
    data: null,
    error: null,
    success: null,
    loading : false
  },
  reducers: {
    
    clear: (state) => {
      state.value= 0
      state.data= null
      state.error= null
      state.success= null
      state.loading = false
    },
   
   
  },
  extraReducers: (builder) => {
    builder.addCase(uploadAttachment.pending, (state, action) => {
      state.loading = true;
    })
     
    // Add reducers for additional action types here, and handle loading state as needed
       builder.addCase(uploadAttachment.fulfilled, (state, action) => {
      // Add user to the state array
     
      state.data = action.payload
      state.error=null
      state.success=true
      state.loading = false

    })
    builder.addCase(uploadAttachment.rejected, (state, action) => {
      console.log(action)
      state.error = action.error.message
      state.loading = false
    })
  },
});

// Action creators are generated for each case reducer function
export const {clear } =
  counterSlice.actions;

export default counterSlice.reducer;
