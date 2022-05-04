import { publicRequest, userRequest } from "../RequestMethods"
import { deleteProductFailure, deleteProductStart, deleteProductSuccess, 
    getProductFailure, getProductStart, getProductSuccess,
    updateProductFailure, updateProductStart, updateProductSuccess,
addProductSuccess,addProductStart, addProductFailure } from "./productRedux"
import { loginFailure, loginStart, loginSuccess, logOut } from "./userRedux"

export const login = async (dispatch, user)=>{
    dispatch(loginStart())
    try {
        const res = await publicRequest.post("/auth/login", user)
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
        //update
        // const res = await userRequest.update(`/products/${id}`)
        dispatch(updateProductSuccess({id, product}));
    } catch (error) {
        dispatch(updateProductFailure())
    }
}


export const deleteProducts = async (id, product, dispatch)=>{
    dispatch(deleteProductStart())
    try {
        // const res = await userRequest.delete(`/products/${id}`)
        dispatch(deleteProductSuccess(id, product));
    } catch (error) {
        dispatch(deleteProductFailure())
    }
}

export const addProducts = async ( product, dispatch)=>{
    dispatch(addProductStart())
    try {
        const res = await userRequest.post(`/products`, product)
        dispatch(addProductSuccess(res.data));
    } catch (error) {
        dispatch(addProductFailure())
    }
}