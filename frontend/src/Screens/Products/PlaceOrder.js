import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearToCart, removeFromCart } from '../../actions/cart'
import Checkout from '../../components/Checkout'
import Message from '../../components/Message'
import { orderCreate } from '../../actions/order'
import Loader from '../../components/Loader'

const PlaceOrder = ({ history }) => {

    const cart = useSelector(state => state.cart) 
    const { cartItems, shippingAddress, paymentMethod } = cart

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const createOrder = useSelector(state => state.createOrder)
    const { loading, error, success, order } = createOrder

    cart.itemsPrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2)

    cart.shippingPrice = (cart.itemsPrice > 500 ? 0 : 100).toFixed(2)

    cart.taxPrice = (cart.itemsPrice * .30).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const dispatch = useDispatch()

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch(clearToCart())
        }
    }, [success, history, order, dispatch])

    const submitHandler = () => {
        dispatch(orderCreate({
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <section className="py-5">
            <Checkout step1 step2 step3 step4 />
            <div className="container">
                <h2>Shipping</h2>
                <div className="row">
                    <div className="col-md-8">
                        <p>Address: <strong className="mx-1">
                            {shippingAddress.address},{shippingAddress.city},{shippingAddress.postalCode},{shippingAddress.country}
                            </strong></p>
                            <p>Name: <strong> {userInfo.user.name} </strong></p>
                            <p>Email: <strong> {userInfo.user.email} </strong></p>
                        <h2 className="mt-4">Payment Method</h2>
                        <p>Method: <strong className="text-success"> {paymentMethod} </strong></p> 
                        <h2 className="mt-4">Order Items</h2>
                        <div className="list-group">
                          {cartItems.length === 0 ? (<Message variant="danger">Your Cart is Empty</Message>) : (
                              cartItems.map(item => (
                                <div className="list-group-item" key={item.product}>
                                <div className="row">
                                    <div className="col-2">
                                        <img src={item.image} className="img-fluid w-100" />
                                    </div>
                                    <div className="col-4">
                                        {item.name}
                                    </div>
                                    <div className="col-4">
                                        ${item.price} x {item.qty} = ${item.price * item.qty}
                                    </div>
                                    <div className="col-2">
                                        <button className="btn" onClick={() => dispatch(removeFromCart(item.product))}><i className="fas fa-trash text-danger"></i></button>
                                    </div>
                                </div>
                            </div>
                              ))
                          )}    
                        </div>   
                    </div>
                    <div className="col-md-4">
                        <div className="card card-body text-center">
                           <h2>Order Summary</h2>
                           <hr />
                           <div className="row">
                               <div className="col-6">
                                   <h6>Items Price</h6>
                                </div>
                               <h6 className="col-6"> ${cart.itemsPrice} </h6>
                               <p className="ml-3">(Item Price <strong>above $500</strong> No Shipping Price)</p>
                           </div>
                           <hr />
                           <div className="row">
                               <h6 className="col">Shipping Price</h6>
                               <h6 className="col"> ${cart.shippingPrice} </h6>
                           </div>
                           <hr />
                           <div className="row">
                               <h6 className="col">Tax Price</h6>
                               <h6 className="col"> ${cart.taxPrice} </h6>
                           </div>
                           <hr />
                           <div className="row text-success">
                               <h6 className="col">Total Price</h6>
                               <h6 className="col"> ${cart.totalPrice} </h6>
                           </div>
                           <hr />
                           <button onClick={submitHandler} disabled={!paymentMethod || cartItems.length === 0} className="btn btn-dark btn-block mb-2">Place Order</button>
                           {!paymentMethod && <p className="text-danger">Make Sure You have Choosed The Payment Method</p>}
                           { error && <Message variant="danger"> {error} </Message> }
                           { loading && <Loader /> }
                        </div>                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PlaceOrder
