import { createSlice } from '@reduxjs/toolkit';



export const designSlice = createSlice({
  name: 'design',
  initialState:{
      designs: [],
      isFetching: false,
      error:false,
  },
  reducers: {
      //get all
    getDesignStart: (state) => {
      state.isFetching = true 
      state.error = false
    },
    getDesignSuccess: (state, action) => {
      state.isFetching = false
      state.designs = action.payload
    },
    getDesignFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
      //get delete
    deleteDesignStart: (state) => {
      state.isFetching = true 
      state.error = false
    },
    deleteDesignSuccess: (state, action) => {
      state.isFetching = false
      state.designs.splice(
          state.designs.findIndex((item) => item._id === action.payload),
          1
      )
    },
    deleteDesignFailure: (state) => {
      state.isFetching = false
      state.error = true
    },

// update Design
    updateDesignStart: (state) => {
      state.isFetching = true 
      state.error = false
    },
    updateDesignSuccess: (state, action) => {
      state.isFetching = false
      state.designs[
        state.designs.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.design;
    },

    updateDesignFailure: (state) => {
      state.isFetching = false
      state.error = true
    },

// Add Design
    addDesignStart: (state) => {
      state.isFetching = true 
      state.error = false
    },
    addDesignSuccess: (state, action) => {
      state.isFetching = false
      state.designs.push(action.payload)
    },

    addDesignFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
  },
});

export const { getDesignStart, getDesignSuccess, getDesignFailure, 
  deleteDesignStart, deleteDesignSuccess, deleteDesignFailure,
updateDesignSuccess, updateDesignStart,updateDesignFailure, addDesignSuccess, addDesignStart, addDesignFailure} = designSlice.actions;

export default designSlice.reducer;