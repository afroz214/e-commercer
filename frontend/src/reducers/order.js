import { USER_ORDER_REQUEST, USER_ORDER_FAIL, USER_ORDER_RESET, USER_ORDER_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "../actions/constants"

export const createOrder = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case CREATE_ORDER_REQUEST:
            return { loading: true }
        case CREATE_ORDER_SUCCESS:
            return { loading: false, success: true, order: payload }
        case CREATE_ORDER_FAIL:
            return { loading: false, error: payload }
        default:
            return state            
    }
}

export const getOrder = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    const { type, payload } = action
    switch(type) {
        case GET_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_ORDER_SUCCESS:
            return {
                loading: false,
                order: payload
            }    
        case GET_ORDER_FAIL:
            return {
                loading: false,
                error: payload
            } 
        default:
            return state       
    }
}

export const userOrder = (state = { orders: [] }, action) => {
    const { type, payload } = action
    switch(type) {
        case USER_ORDER_REQUEST:
            return { loading: true, orders: [] }
        case USER_ORDER_SUCCESS:
            return { loading: false, orders: payload }
        case USER_ORDER_FAIL:
            return { loading: false, error: payload }
        case USER_ORDER_RESET:
            return { orders: [] }
        default:
            return state                
    }
}