import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userRegister, userUpdate, userDeleteAccount, userLogin, userProfile, userEmailUpdate, userPhotoUpdate, userChangePassword } from './reducers/user'
import { createReview, getProducts, getSingleProduct, createProduct, deleteReview } from './reducers/product'
import { cart } from './reducers/cart'
import { createOrder, getOrder, userOrder } from './reducers/order'

const reducer = combineReducers({
    userRegister,
    userLogin,
    userProfile,
    userEmailUpdate,
    userPhotoUpdate,
    userChangePassword,
    userDeleteAccount,
    getProducts,
    getSingleProduct,
    cart,
    createOrder,
    getOrder,
    userOrder,
    createProduct,
    createReview,
    deleteReview,
    userUpdate
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store