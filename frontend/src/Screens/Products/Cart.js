import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../../actions/cart'
import Message from '../../components/Message'

const Cart = ({ match, location, history }) => {

    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (productId) {
           dispatch(addToCart(productId, qty)) 
        }
    }, [dispatch, productId, qty])

    const checkoutHandler = () => {
        history.push('/shipping')
    }

    return (
        <section className="py-5">
            <div className="bg-dark py-3 text-white mb-3">
                <div className="container">
                   <h2>Shopping Cart</h2>
                </div>
            </div>
            <div className="container">
                {cartItems.length === 0 ? (<>
                    <Message variant="danger"> Your Cart is Empty </Message>
                    <Link to="/products" className="btn btn-danger">Keep Shopping</Link>
                </>) : (
                    <div className="row">
                        <div className="col-md-8">
                        <div className="list-group">
                        {cartItems.map(item => (
                            <div className="list-group-item my-2 p-0 align-items-center p-2" key={item.product}>
                                <div className="row">
                                    <div className="col-3">
                                        <img src={item.image} className="img-fluid w-100 h-100" alt="myinebv" />
                                    </div>
                                    <div className="col-3">
                                       <strong>{item.name}</strong>
                                       <p className="text-muted"> By {item.username} </p>
                                    </div>
                                    <div className="col-2 text-danger">
                                       <strong>${item.price}</strong>
                                    </div>
                                    <div className="col-2">
                                       <select className="form-control" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                           {[...Array(item.countInStock).keys()].map(x => (
                                               <option key={x+1} value={x+1}> {x+1} </option>
                                           ))}
                                       </select>
                                    </div>
                                    <div className="col-2">
                                        <button disabled={!userInfo} onClick={() => dispatch(removeFromCart(item.product))} className="btn"><i className="fas fa-trash text-danger"></i></button>
                                        {!userInfo && <p>You need to Login First <Link to="/login">Log In</Link></p>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="card text-center p-0 list-group">
                            <h3 className="list-group-item">Subtotals ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items </h3>
                            <h4 className="list-group-item">Price: <strong className="mx-4">${cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2)}</strong> </h4>
                            <div className="list-group-item">
                            <button onClick={checkoutHandler} disabled={cartItems.length === 0} className="btn btn-dark btn-block p-3">Proceed To Checkout</button>
                            </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Cart
