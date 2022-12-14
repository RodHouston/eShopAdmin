import { createSlice } from '@reduxjs/toolkit';



export const productSlice = createSlice({
  name: 'product',
  initialState:{
      products: [],
      isFetching: false,
      error:false,
      extraPhotos:[]
  },
  reducers: {
      //get all
    getProductStart: (state) => {
      state.isFetching = true 
      state.error = false
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false
      state.products = action.payload
    },
    getProductFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
      //get delete
    deleteProductStart: (state) => {
      state.isFetching = true 
      state.error = false
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false
      state.products.splice(
          state.products.findIndex((item) => item._id === action.payload),
          1
      )
    },
    deleteProductFailure: (state) => {
      state.isFetching = false
      state.error = true
    },

// update product
    updateProductStart: (state) => {
      state.isFetching = true 
      state.error = false
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },

    updateProductFailure: (state) => {
      state.isFetching = false
      state.error = true
    },

// Add product
    addProductStart: (state) => {
      state.isFetching = true 
      state.error = false 
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false
      state.products.push(action.payload)
    },

    addProductFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
    //Add Photo 
    addPhotoStart: (state) => {
      state.isFetching = true 
      state.error = false 
    },
    addPhotoSuccess: (state, action) => {
      state.isFetching = false
      state.extraPhotos.push(action.payload)
    },

    addPhotoFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
    addPhotos: (state, action) => {
      console.log("insde");
      console.log(action.payload);
      state.extraPhotos.push(action.payload)
    },
    clearXPhotos: (state) => {
      state.extraPhotos = []
    }
  },
});

export const { getProductStart, getProductSuccess, getProductFailure, 
  deleteProductStart, deleteProductSuccess, deleteProductFailure,
updateProductSuccess, updateProductStart,updateProductFailure, 
addProductSuccess, addProductStart, addProductFailure, addPhotoStart, 
addPhotoSuccess, addPhotoFailure, addPhotos, clearXPhotos} = productSlice.actions;

export default productSlice.reducer;