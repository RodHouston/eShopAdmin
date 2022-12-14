import { createSlice } from '@reduxjs/toolkit';



export const categorySlice = createSlice({
  name: 'category',
  initialState:{
      categories: [],
      isFetching: false,
      error:false,      
  },
  reducers: {
      //get all
    getCategoryStart: (state) => {
      state.isFetching = true 
      state.error = false
    },
    getCategorySuccess: (state, action) => {
      state.isFetching = false
      state.categories = action.payload
    },
    getCategoryFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
      //get delete
    deleteCategoryStart: (state) => {
      state.isFetching = true 
      state.error = false
    },
    deleteCategorySuccess: (state, action) => {
      state.isFetching = false
      state.categories.splice(
          state.categories.findIndex((item) => item._id === action.payload),
          1
      )
    },
    deleteCategoryFailure: (state) => {
      state.isFetching = false
      state.error = true
    },

// update product
    updateCategoryStart: (state) => {
      state.isFetching = true 
      state.error = false
    },
    updateCategorySuccess: (state, action) => {
      state.isFetching = false
      state.categories[
        state.categories.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },

    updateCategoryFailure: (state) => {
      state.isFetching = false
      state.error = true
    },

// Add product
    addCategoryStart: (state) => {
      state.isFetching = true 
      state.error = false 
    },
    addCategorySuccess: (state, action) => {
      state.isFetching = false
      state.category.push(action.payload)
    },

    addCategoryFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
  },
});

export const { getCategoryStart, getCategorySuccess, getCategoryFailure, 
  deleteCategoryStart, deleteCategorySuccess, deleteCategoryFailure,
updateCategorySuccess, updateCategoryStart,updateCategoryFailure, 
addCategorySuccess, addCategoryStart, addCategoryFailure} = categorySlice .actions;

export default categorySlice .reducer;