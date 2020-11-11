import { ADD_PAYMENT_METHOD, ADD_SHIPPING_ADDRESS, ADD_TO_CART, CLEAR_TO_CART, REMOVE_TO_CART } from "../actions/constants"

export const cart = (state = { cartItems: [], shippingAddress: {} }, action) => {
    const { type, payload } = action
    switch(type) {
        case ADD_TO_CART:

            const item = payload

            const existItem = state.cartItems.find(x => x.product === item.product)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_TO_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== payload)
            }
        case CLEAR_TO_CART:
            return { cartItems: [], shippingAddress: {} }    
        case ADD_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: payload
            } 
        case ADD_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: payload
            }           
        default:
            return state    
    }
}