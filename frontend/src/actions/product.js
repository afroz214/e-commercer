import axios from 'axios'
import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_REVIEW_FAIL, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, GET_PRODUCTS_FAIL, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, SINGLE_PRODUCT_FAIL, SINGLE_PRODUCT_REQUEST, SINGLE_PRODUCT_SUCCESS } from './constants'

export const allProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCTS_REQUEST })
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
        dispatch({
            type: GET_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_PRODUCTS_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const singleProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_PRODUCT_REQUEST })
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type: SINGLE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_PRODUCT_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const addProduct = (datas) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_PRODUCT_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                jwtToken: userInfo.token
            }
        }
        await axios.post('/api/products', datas, config)
        dispatch({ type: CREATE_PRODUCT_SUCCESS })
    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const addReview = (id, datas) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_REVIEW_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                jwtToken: userInfo.token
            }
        }
        await axios.post(`/api/products/${id}/reviews`, datas, config)
        dispatch({ type: CREATE_REVIEW_SUCCESS })
    } catch (error) {
        dispatch({
            type: CREATE_REVIEW_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const removeReview = (productId, reviewId) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                jwtToken: userInfo.token
            }
        }
        await axios.delete(`/api/products/${productId}/${reviewId}/reviews`, config)
        dispatch({ type: DELETE_REVIEW_SUCCESS })
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}