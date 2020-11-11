import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { allProducts } from '../../actions/product'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Paginate from '../../components/Paginate'

const Products = ({ match }) => {

    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const getProducts = useSelector(state => state.getProducts)
    const { loading, error, products, page, pages } = getProducts

    useEffect(() => {   
        dispatch(allProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <section className="py-5 ">
            <div className="bg-primary text-white py-2 mb-4">
                <div className="container">
                <h2>New Products {userInfo && userInfo.user.isAdmin && <Link to="/create-product" className="btn btn-success float-right">Create Product</Link>} </h2>
                </div>
            </div>
                { loading ? <Loader /> : error ? <Message variant="danger"> {error} </Message> : (
            <div className="container">
                <div className="row">
                    {products.map(product => (
                        <div className="col-md-3" key={product._id}>
                            <div className="card m-2 card-body">
                        <Link to={`/product/${product._id}`} className="link">
                        <img src={product.image} className="img-fluid w-100 product-img" alt="No-Image" />
                        <p className="pt-2 lead"> {product.name} </p>
                        <p> {product.brand} </p>
                        </Link>
                        <p><i className="fas fa-star text-warning"></i> {product.rating.toFixed(1)} stars ({ product.numReviews }) reviews </p>
                        <h4><strong> ${product.price} </strong> </h4>
                        </div>                       
                    </div>
                    ))}
                </div>
                <div className="my-3 justify-content-center">
                    <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''} />
                </div>
            </div>
                ) }
        </section>
    )
}

export default Products
