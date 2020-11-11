import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { singleProduct, addReview, removeReview } from '../../actions/product'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

const Product = ({ match, history }) => {

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const getSingleProduct = useSelector(state => state.getSingleProduct)
    const { loading, error, product } = getSingleProduct

    const createReview = useSelector(state => state.createReview)
    const { loading:loadingReview, error:errorReview, success } = createReview

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const deleteReview = useSelector(state => state.deleteReview)
    const { success:successReview } = deleteReview

    useEffect(() => {
        dispatch(singleProduct(match.params.id))
    }, [dispatch, match, success, successReview])

    const addToCartHandler = (id) => {
        history.push(`/cart/${product._id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addReview(match.params.id, { rating, comment }))
    }

    return (
        <section className="py-5">
            <div className="container">
                <Link to="/products" className="btn btn-dark mb-4">Go Back To Product</Link>
                {loading ? <Loader /> : error ? <Message variant="danger"> {error} </Message> : (
                    <div className="row">
                    <div className="col-md-6">
                        <img src={product.image} className="img-fluid w-100 post-img" />
                    </div>
                    <div className="col-md-3 mt-4">
                        <h3 className=""> {product.name} </h3>
                        <p><i className="fas fa-star text-warning"></i> {Number(product.rating).toFixed(1)} stars ({ product.numReviews }) reviews </p>
                        <h4>Price: <strong> ${product.price} </strong></h4>
                        <p className="text-muted">Created At: {Date(product.createdAt).substring(0, 15)} </p>
                    </div>
                    <div className="col-md-3 card card-body h-100">
                        <h4>Price: <h4 className="d-inline float-right"> ${product.price} </h4></h4>
                        <hr />
                        <h4>Status: <h4 className="d-inline float-right"> {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</h4> </h4>
                        <hr />
                        {product.countInStock > 0 && (
                            <>
                            <div className="row">
                                <div className="col">
                                    <h4>Qty:</h4>
                                </div>
                                <div className="col">
                                    <select className="form-control" value={qty} onChange={e => setQty(e.target.value)}>
                                        {[...Array(product.countInStock).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}> {x + 1} </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <hr />
                            </>
                        )}
                        <button onClick={addToCartHandler} disabled={product.countInStock === 0 || !userInfo} className="btn btn-dark btn-block p-2">Add To Cart</button>
                        {!userInfo && <p>You need to <Link to="/login">Login</Link> first</p>}
                    </div>
                </div>
                )}
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="py-2">Reviews <span><i className="fas fa-star text-warning"></i> {Number(product.rating).toFixed(1)} Stars </span><span> ({product.numReviews}) reviews </span> </h3>
                        {product.reviews.length === 0 && <h6 className="text-primary">No Reviews</h6>}
                        <div className="list-group">
                        {product.reviews.map(review => (
                            <div className="list-group-item" key={review._id}>
                            <p className="m-0 p-0 mb-1"><strong> {review.name}</strong> {userInfo === null ? <></> : userInfo && userInfo.user._id === review.user.toString() && (<button onClick={() => dispatch(removeReview(match.params.id, review._id))} className="btn float-right"><i className="fas fa-trash text-danger"></i></button>)} </p>
                            <p className="m-0 p-0"> {review.rating.toFixed(1)} <i className="fas fa-star text-warning mx-1"></i>Stars</p>
                            <p className="m-0 p-0"> {review.comment} </p>
                            </div>
                        ))}
                        </div>
                        {userInfo && product.reviews.find(r => r.user.toString() === userInfo.user._id) ? (
                            <p className="text-success">You have Reviewed in this</p>
                        ) : (
                            <>
                            {errorReview && <Message variant="danger"> {errorReview} </Message>}
                            {userInfo && (
                                <>
                                <h3 className="mt-4">Write A Customer Review</h3>
                            <form onSubmit={submitHandler}>
                                <label className="p-0 m-0">Rating</label>
                                <div className="form-group">
                                <select className="form-control" value={rating} onChange={e => setRating(e.target.value)}>
                                    <option value="">Select...</option>
                                    <option value="1">1 = VERY POOR</option>
                                    <option value="2">2 = POOR</option>
                                    <option value="3">3 = GOOD</option>
                                    <option value="4">4 = VERY GOOD</option>
                                    <option value="5">5 = EXCELLENT</option>
                                </select>
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" rows="4" placeholder="Say Something About This Product..." value={comment} onChange={e => setComment(e.target.value)}></textarea>
                                </div>
                                <button type="submit" className="btn btn-dark">Submit</button>
                            </form>
                                </>
                            )}
                            {loadingReview && <Loader />}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Product
