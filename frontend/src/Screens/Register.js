import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registeraUser } from '../actions/user'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Register = ({ history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, success } = userRegister

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Make sure your both passwords are same')
        } else {
            dispatch(registeraUser({ name, email, password }))
        }
    }

    if (success) {
        history.push('/products')
    }

    return (
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h2 className="mb-4"><i className="fas fa-user-plus mx-4 text-primary"></i>New User? Register</h2>
                        {error && <Message variant="danger"> {error} </Message>}
                        {message && <Message variant="danger"> {message} </Message>}
                        <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        </div>
                        <button className="btn btn-block btn-primary">SUBMIT</button>
                        </form>
                        { loading  && <Loader />}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
