import { formLabelClasses } from "@mui/material";
import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../configs";

export const postData = createAsyncThunk(
  'postCandidate',
  async (data, thunkAPI) => {
    return  await axios.post(`${baseUrl}api/candidate`,data).then(response => response.data)
    .catch(error => thunkAPI.rejectWithValue(error?.response?.data || error))
  }
)


export const counterSlice = createSlice({
  name: "candidateSubmission",
  initialState: {
    data: null,
    error: null,
    success: null,
    loading : false
  },
  reducers: {
    
    clear: (state) => {
      
      state.data= null
      state.error= null
      state.success= null
      state.loading = false
    },
   
   
  },
  extraReducers: (builder) => {
    //Post candidate
    builder.addCase(postData.pending, (state, action) => {
      state.loading = true;
    })
     
   
    builder.addCase(postData.fulfilled, (state, action) => {
    
     
      state.data = action.payload
      state.error=null
      state.success=true
      state.loading = false

    })
    builder.addCase(postData.rejected, (state, action) => {
      console.log(action);  
      state.error = action.payload?.message? action.payload.message : action.error.message
      state.loading = false
    })

  },
});

// Action creators are generated for each case reducer function
export const {clear } =
  counterSlice.actions;

export default counterSlice.reducer;
