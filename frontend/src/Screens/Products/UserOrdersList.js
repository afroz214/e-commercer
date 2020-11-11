import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ordersUser } from '../../actions/order'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

const UserOrdersList = () => {

    const dispatch = useDispatch()

    const userOrder = useSelector(state => state.userOrder)
    const { loading, error, orders } = userOrder

    useEffect(() => {
        dispatch(ordersUser())
    }, [dispatch])

    return loading ? <Loader /> : error ? <Message> {error} </Message> : (
        <section className="py-5">
            <div className="bg-dark py-2 text-white">
                <div className="container">
                    <h1>Order Lists</h1>
                </div>
            </div>
            <div className="container">
                {orders.length === 0 ? 
                <div className="my-4">
                    <Message variant="danger">No Orders Yet</Message>
                </div>
                : (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>PRICE</th>
                                <th>PAYMENT METHOD</th>
                                <th>IS PAID</th>
                                <th></th>
                            </tr>
                        </thead>
                        {orders.map(order => (
                            <tbody>
                                <tr>
                                    <td> {order._id} </td>
                                    <td> ${order.totalPrice.toFixed(2)} </td>
                                    <td> {order.paymentMethod} </td>
                                    <td> {order.isPaid ? <p className="text-success">Yes</p> : <p className="text-danger">No</p>} </td>
                                    <td><Link to={`/order/${order._id}`} className="btn btn-secondary">Details</Link></td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                )}
            </div>
        </section>
    )
}

export default UserOrdersList
