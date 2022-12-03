import { createSlice  } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
       currentUser: null,
       editUser: null,
       users: [],
       isFetching: false,
       error: false
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state, action)=>{
          console.log("inside log in ");
            state.isFetching=false;
            state.currentUser=action.payload;
        },
        loginFailure:(state)=>{
            state.isFetching=false;
            state.error = true;
        },    
        
        logOut: (state) => {
            state.currentUser = null
        },
     //get all
     getUsersStart: (state) => {
        state.isFetching = true     
        state.error = false
      },
      getUsersSuccess: (state, action) => {
        // console.log('here');
        // console.log(action.payload);
        state.isFetching = false
        state.users = action.payload
      },
      getUsersFailure: (state) => {
        state.isFetching = false
        state.error = true
      },
      //GET ONE USER BY ID
      getUserByIdStart: (state) => {
        state.isFetching = true     
        state.error = false
      },
      getUserByIdSuccess: (state, action) => {       
        state.isFetching = false
        state.editUser = action.payload
      },
      getUserByIdFailure: (state) => {
        state.isFetching = false
        state.error = true
      },
        //get delete
      deleteUserStart: (state) => {
        state.isFetching = true 
        state.error = false
      },
      deleteUserSuccess: (state, action) => {
        state.isFetching = false
        state.users.splice(
            state.users.findIndex((item) => item._id === action.payload),
            1
        )
      },
      deleteUserFailure: (state) => {
        state.isFetching = false
        state.error = true
      },
  
  // update user
      updateUserStart: (state) => {
        state.isFetching = true 
        state.error = false
      },
      updateUserSuccess: (state, action) => {
        state.isFetching = false
        state.users[
          state.users.findIndex((item) => item._id === action.payload.id)
        ] = action.payload.product;
      },
  
      updateUserFailure: (state) => {
        state.isFetching = false
        state.error = true
      },
  
  
    },
  });
export const { loginStart, loginSuccess, loginFailure , logOut, getUsersSuccess,getUsersStart,getUsersFailure, getUserByIdSuccess, getUserByIdStart, getUserByIdFailure,
deleteUserSuccess,deleteUserStart, deleteUserFailure, updateUserStart, updateUserSuccess, updateUserFailure} = userSlice.actions;
export default userSlice.reducer;