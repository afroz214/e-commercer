import axios from 'axios'
import { ADD_PAYMENT_METHOD, ADD_SHIPPING_ADDRESS, ADD_TO_CART, CLEAR_TO_CART, FAIL_TO_CART, REMOVE_TO_CART } from './constants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                jwtToken: userInfo.token
            }
        }
        const { data } = await axios.get(`/api/products/${id}`, config)
        dispatch({
            type: ADD_TO_CART,
            payload: {
                username: data.user.name,
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        dispatch({ type: FAIL_TO_CART })
    }
}

export const addShippingAddress = (datas) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADD_SHIPPING_ADDRESS,
            payload: datas
        })
        localStorage.setItem('shippingAddress', JSON.stringify(getState().cart.shippingAddress))
    } catch (error) {
        dispatch({
            type: FAIL_TO_CART
        })
    }
}

export const addPaymentMethod = (datas) => (dispatch) => {
    dispatch({
        type: ADD_PAYMENT_METHOD,
        payload: datas
    })
    localStorage.setItem('paymentMethod', JSON.stringify(datas))
} 

export const removeFromCart = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REMOVE_TO_CART,
            payload: id
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        dispatch({
            type: FAIL_TO_CART
        })
    }
}

export const clearToCart = () => async (dispatch) => {
    localStorage.removeItem('cartItems')
    dispatch({ type: CLEAR_TO_CART })
}