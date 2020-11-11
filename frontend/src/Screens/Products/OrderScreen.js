import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import { getOrderById } from '../../actions/order'
import Loader from '../../components/Loader'
import { PayPalButton } from 'react-paypal-button-v2'

const OrderScreen = ({ match }) => {

    const orderId = match.params.id

    const getOrder = useSelector(state => state.getOrder)
    const { loading, error, order } = getOrder

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrderById(orderId))
    }, [dispatch, orderId])

    return loading ? <Loader /> : error ? <Message> {error} </Message> : (
        <section className="py-5">
            <div className="container">
                <h2>Shipping</h2>
                <div className="row">
                    <div className="col-md-8">
                        <p>Address: <strong className="mx-1">
                            {order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}
                            </strong></p>
                            <p>Name: <strong> {order.user.name} </strong></p>
                            <p>Email: <strong> {order.user.email} </strong></p>
                        <h2 className="mt-4">Payment Method</h2>
                        <p>Method: <strong className="text-success"> {order.paymentMethod} </strong></p> 
                        {order.isPaid ? <Message> Paid at {order.paidAt} </Message> : <Message variant="danger">Not Paid Yet</Message>}
                        <h2 className="mt-4">Order Items</h2>
                        <div className="list-group">
                          {order.orderItems.length === 0 ? (<Message variant="danger">Your Cart is Empty</Message>) : (
                              order.orderItems.map(item => (
                                <div className="list-group-item">
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
                               <h6 className="col">Items Price</h6>
                               <h6 className="col"> ${order.itemsPrice.toFixed(2)} </h6>
                           </div>
                           <hr />
                           <div className="row">
                               <h6 className="col">Shipping Price</h6>
                               <h6 className="col"> ${order.shippingPrice.toFixed(2)} </h6>
                           </div>
                           <hr />
                           <div className="row">
                               <h6 className="col">Tax Price</h6>
                               <h6 className="col"> ${order.taxPrice.toFixed(2)} </h6>
                           </div>
                           <hr />
                           <div className="row text-success">
                               <h6 className="col">Total Price</h6>
                               <h6 className="col"> ${order.totalPrice.toFixed(2)} </h6>
                           </div>
                        </div>   
                        {!order.isPaid && (
                               <PayPalButton amount={order.totalPrice} />
                           )}                     
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OrderScreen
