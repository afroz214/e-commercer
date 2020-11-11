import React from 'react'
import { NavLink } from 'react-router-dom'

const Checkout = ({ step1, step2, step3, step4 }) => {

    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto mb-4">
                <h6 className="mb-2">Checkout Steps</h6>
                <div className="card">
                        <div className="row no-gutters">
                            <div className="col">
                                {step1 ? <NavLink to="/login" className="link btn text-primary">Login</NavLink> : <button disabled>Login</button>}
                            </div>
                            <div className="col">
                                {step2 ? <NavLink to="/shipping" className="link btn text-primary">Shipping</NavLink> : <button className="btn text-muted" disabled>Shipping</button>}
                            </div>
                            <div className="col">
                                {step3 ? <NavLink to="/payment" className="link btn text-primary">Payment</NavLink> : <button disabled className="btn text-muted">Payment</button>}
                            </div>
                            <div className="col">
                                {step4 ? <NavLink to="/placeorder" className="link btn text-primary">Order</NavLink> : <button disabled className="btn text-muted">Order</button>}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Checkout
