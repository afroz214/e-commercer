import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProfile, emailUpdate } from '../actions/user'
import Loader from '../components/Loader'
import Message from '../components/Message'

const EditEmail = ({ history }) => {

    const userProfile = useSelector(state => state.userProfile)
    const { profile } = userProfile

    const userEmailUpdate = useSelector(state => state.userEmailUpdate)
    const { success, loading, error } = userEmailUpdate

    const [email, setEmail] = useState(profile.email)
    const [password, setPassowrd] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        if (!profile.email) {
            dispatch(getProfile())
        } else {
            setEmail(profile.email)
        }
        if (success) {
            history.push('/profile')
        }
    }, [dispatch, profile, success, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(emailUpdate({email, password}))
    }

    return (
        <section className="py-5 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h2 className="my-3">Update Email</h2>
                        {error && <Message variant="danger"> {error} </Message>}
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassowrd(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-block btn-secondary">SUBMIT</button>
                        </form>
                        {loading && <Loader />}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditEmail
