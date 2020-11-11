import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_RESET, CREATE_PRODUCT_SUCCESS, CREATE_REVIEW_FAIL, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, GET_PRODUCTS_FAIL, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, SINGLE_PRODUCT_FAIL, SINGLE_PRODUCT_REQUEST, SINGLE_PRODUCT_SUCCESS } from "../actions/constants"

export const getProducts = (state = { products: [] }, action) => {
    const { type, payload } = action
    switch(type) {
        case GET_PRODUCTS_REQUEST:
            return { loading: true, products: [] }
        case GET_PRODUCTS_SUCCESS:
            return { loading: false, products: payload.products, page: payload.page, pages: payload.pages }
        case GET_PRODUCTS_FAIL:
            return { loading: false, error: payload }
        default:
            return state            
    }
} 

export const getSingleProduct = (state = { product: { reviews: [] } }, action) => {
    const { type, payload } = action
    switch(type) {
        case SINGLE_PRODUCT_REQUEST:
            return { ...state, loading: true }
        case SINGLE_PRODUCT_SUCCESS:
            return { loading: false, product: payload }
        case SINGLE_PRODUCT_FAIL:
            return { loading: false, error: payload }
        default:
            return state            
    }
}

export const createProduct = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case CREATE_PRODUCT_REQUEST:
            return { loading: true }
        case CREATE_PRODUCT_SUCCESS:
            return { loading: false, success: true }
        case CREATE_PRODUCT_FAIL:
            return { loading: false, error: payload }
        case CREATE_PRODUCT_RESET:
            return {}    
        default:
            return state            
    }
}

export const createReview = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case CREATE_REVIEW_REQUEST:
            return { loading: true }
        case CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case CREATE_REVIEW_FAIL:
            return { loading: false, error: payload }
        default:
            return state            
    }
}

export const deleteReview = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case DELETE_REVIEW_REQUEST:
            return { loading: true }
        case DELETE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case DELETE_REVIEW_FAIL:
            return { loading: false, error: payload }
        default:
            return state            
    }
}