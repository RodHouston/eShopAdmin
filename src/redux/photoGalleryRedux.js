import { createSlice } from '@reduxjs/toolkit';



export const photoGallerySlice = createSlice({
  name: 'gal',
  initialState:{
      galleries: [],
      isFetching: false,
      error:false,
  },
  reducers: {
      //get all
    getPhotoToGalleryStart: (state) => {
      state.isFetching = true 
      state.error = false
    },
    getPhotoToGallerySuccess: (state, action) => {   
      console.log("here in gal");   
      console.log(action.payload);
      state.isFetching = false
      state.galleries = action.payload
    },
    getPhotoToGalleryFailure: (state) => {
      state.isFetching = false
      state.error = true
    },

      //get delete
    deletePhotoToGalleryStart: (state) => {
      state.isFetching = true 
      state.error = false
    },
    deletePhotoToGallerySuccess: (state, action) => {
      state.isFetching = false
      state.galleries.splice(
          state.galleries.findIndex((item) => item._id === action.payload),
          1
      )
    },
    deletePhotoToGalleryFailure: (state) => {
      state.isFetching = false
      state.error = true
    },

// update PhotoToGallery
    updatePhotoToGalleryStart: (state) => {
      state.isFetching = true 
      state.error = false
    },
    updatePhotoToGallerySuccess: (state, action) => {
      state.isFetching = false
      state.galleries[
        state.galleries.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.photo;
    },

    updatePhotoToGalleryFailure: (state) => {
      state.isFetching = false
      state.error = true
    },

// Add PhotoToGallery
    addPhotoToGalleryStart: (state) => {
      state.isFetching = true 
      state.error = false
    },
    addPhotoToGallerySuccess: (state, action) => {
      state.isFetching = false
      state.galleries.push(action.payload)
    },

    addPhotoToGalleryFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
  },
});

export const { getPhotoToGalleryStart, getPhotoToGallerySuccess, getPhotoToGalleryFailure, 
  deletePhotoToGalleryStart, deletePhotoToGallerySuccess, deletePhotoToGalleryFailure,
updatePhotoToGallerySuccess, updatePhotoToGalleryStart,updatePhotoToGalleryFailure, addPhotoToGallerySuccess, addPhotoToGalleryStart, addPhotoToGalleryFailure} = photoGallerySlice.actions;

export default photoGallerySlice.reducer;