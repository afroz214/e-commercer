import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPaymentMethod } from '../../actions/cart'
import Checkout from '../../components/Checkout'

const Payment = ({ history }) => {

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addPaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <section className="py-5">
            <Checkout step1 step2 step3 />
            <div className="bg-dark py-2">
                <h2 className="text-center text-white">Choose Payment Method</h2>
            </div>
            <div className="container text-center">
                <form onSubmit={submitHandler}>
               <div className="form-check">
                   <input type="radio" className="form-check-input" name="paymentMethod" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} checked />
                   <label className="form-check-label">PayPal</label>
               </div>
               <div className="form-check">
                   <input type="radio" className="form-check-input" name="paymentMethod" value="Credit Card" onChange={e => setPaymentMethod(e.target.value)} />
                   <label className="form-check-label">Credit Card</label>
               </div>
               <button type="submit" className="btn btn-dark">Proceed To Payment</button>
               </form>
            </div>
        </section>
    )
}

export default Payment
