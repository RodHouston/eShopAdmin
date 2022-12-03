import { publicRequest, userRequest } from "../RequestMethods"
import { addDesignFailure, addDesignStart, addDesignSuccess, deleteDesignFailure, deleteDesignStart, deleteDesignSuccess, getDesignFailure, getDesignStart, getDesignSuccess, updateDesignFailure, updateDesignStart, updateDesignSuccess } from "./designRedux"
import { deleteProductFailure, deleteProductStart, deleteProductSuccess, 
    getProductFailure, getProductStart, getProductSuccess,
    updateProductFailure, updateProductStart, updateProductSuccess,
addProductSuccess,addProductStart, addProductFailure } from "./productRedux"
import { getUserByIdStart, getUserByIdSuccess, getUserByIdFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, getUsersFailure, getUsersStart, getUsersSuccess, loginFailure, loginStart, loginSuccess, logOut, updateUserFailure, updateUserStart, updateUserSuccess } from "./userRedux"

export const login = async (dispatch, user)=>{
    dispatch(loginStart())
    try {
        
        const res = await publicRequest.post("/auth/login", user)
        console.log("inside login catch");
        dispatch(loginSuccess(res.data));
    } catch (error) {
        
        dispatch(loginFailure())
    }
}
export const logout = async (dispatch)=>{    
    try {
        // const res = await publicRequest.post("/auth/logout", user)
        dispatch(logOut());
    } catch (error) {
        
    }
}


export const getProducts = async (dispatch)=>{
    dispatch(getProductStart())
    try {
        const res = await publicRequest.get("/products")
        dispatch(getProductSuccess(res.data));
    } catch (error) {
        dispatch(getProductFailure())
    }
}


export const updateProducts = async (id, product, dispatch)=>{
    dispatch(updateProductStart())
    try {
        // console.log('in update product apicall');
        //update
        const res = await userRequest.put(`/products/${id}`, product)
        // console.log(res.data.wholeSalePrice);
        dispatch(updateProductSuccess({id, product}));
    } catch (error) {
        dispatch(updateProductFailure())
    }
}


export const deleteProducts = async (id, product, dispatch)=>{
    dispatch(deleteProductStart())
    try {
        const res = await userRequest.delete(`/products/${id}`)
        dispatch(deleteProductSuccess(id, product));
    } catch (error) {
        dispatch(deleteProductFailure())
    }
}


 
export const addProducts = async ( product, dispatch)=>{
    dispatch(addProductStart())
    try {
        // console.log("inside add product");
        const res = await userRequest.post(`/products`, product)
        // console.log("after add product");
        dispatch(addProductSuccess(res.data));
    } catch (error) {
        dispatch(addProductFailure())
    }
}




// //////// GET DESIGNS ///////////
export const getDesigns = async (dispatch)=>{
    dispatch(getDesignStart())
    console.log('here');
    try {
        const res = await publicRequest.get("/designs")
        // console.log(res.data);
        dispatch(getDesignSuccess(res.data));
    } catch (error) {
        dispatch(getDesignFailure())
    }
}


export const updateDesigns = async (id, design, dispatch)=>{
    dispatch(updateDesignStart())
    
    try {
        console.log('in update product apicall');
        //update
        const res = await userRequest.put(`/designs/${id}`, design)
        // console.log(res);
        dispatch(updateDesignSuccess({id, design}));
    } catch (error) {
        dispatch(updateDesignFailure())
    }
}


export const deleteDesigns = async (id, design, dispatch)=>{
    dispatch(deleteDesignStart())
    try {
        const res = await userRequest.delete(`/designs/${id}`)
        dispatch(deleteDesignSuccess(id, design));
    } catch (error) {
        dispatch(deleteDesignFailure())
    }
}

export const addDesigns = async ( design, dispatch)=>{
    dispatch(addDesignStart())
    try {
        const res = await userRequest.post(`/designs`, design)
        dispatch(addDesignSuccess(res.data));
    } catch (error) {
        dispatch(addDesignFailure())
    }
}



//////GET USERS////////
export const getUsers = async (dispatch)=>{
    dispatch(getUsersStart())
    try {
        console.log("in get user apiCAll");
        const res = await userRequest.get("/users")
        dispatch(getUsersSuccess(res.data));
    } catch (error) {
        dispatch(getUsersFailure())
    }
}

export const getUserById = async (id, user, dispatch)=>{
    dispatch(getUserByIdStart())
    try {
        const res = await userRequest.get(`/users/find/${id}`)
        dispatch(getUserByIdSuccess(res.data));
    } catch (error) {
        console.log(error);
        dispatch(getUserByIdFailure())
    }
}

export const updateUser = async (id, user, dispatch)=>{
    dispatch(updateUserStart())
    try {
        //update
        
        const res = await userRequest.put(`/users/${id}`, user)
        // console.log("in api call update user");
        dispatch(updateUserSuccess(res.data));
    } catch (error) {
        dispatch(updateUserFailure())
    }
}


export const deleteUser = async (id, user, dispatch)=>{
    dispatch(deleteUserStart())
    try {
        const res = await userRequest.delete(`/users/${id}`)
        dispatch(deleteUserSuccess(id, user));
    } catch (error) {
        dispatch(deleteUserFailure())
    }
}


