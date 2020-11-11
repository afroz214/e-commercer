import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addShippingAddress } from '../../actions/cart'
import Checkout from '../../components/Checkout'

const Shipping = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <section className="py-5">
          <Checkout step1 step2 />
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h2 className="mt-3">Shipping Address</h2>
                        <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" className="form-control" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Postal Code</label>
                            <input type="text" className="form-control" placeholder="Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input type="text" className="form-control" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-dark">CONTINUE</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Shipping
