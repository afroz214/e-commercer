import React, { useEffect, useState } from 'react'
import { addProduct } from '../../actions/product'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import axios from 'axios'
import Message from '../../components/Message'
import { CREATE_PRODUCT_RESET } from '../../actions/constants'

const AddProduct = ({ history }) => {

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const createProduct = useSelector(state => state.createProduct)
    const { success, loading, error } = createProduct

    const uploadHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/products/uploadimage', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    useEffect(() => {
        if (success) {
            history.push('/products')
            dispatch({ type: CREATE_PRODUCT_RESET })
        }
    }, [success, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addProduct({ name, image, price, brand, category, countInStock, description }))
    }

    return (
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        {error && <Message> {error} </Message>}
                        <h2 className="my-4">Create Product</h2>
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="file" className="form-control" onChange={uploadHandler} />
                                {uploading && <Loader />}
                            </div>
                            <div className="form-group">
                                <input type="Number" className="form-control" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Brand" value={brand} onChange={e => setBrand(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="Number" className="form-control" placeholder="Count In Stock" value={countInStock} onChange={e => setCountInStock(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-success btn-block">SUBMIT</button>
                        </form>
                        {loading && <Loader />}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddProduct
