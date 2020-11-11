import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../actions/user'
import Message from '../components/Message'
import Loader from '../components/Loader'

const Login = ({ history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo, error, loading } = userLogin

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(loginUser({ email, password }))
    }

    if (userInfo) {
        history.push('/products')
    }

    return (
        <section className="py-5">
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h2 className="mb-4"><i className="fas fa-user-plus mx-4 text-primary"></i>LOGIN</h2>
                    {error && <Message variant="danger"> {error} </Message>}
                    <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
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

export default Login
