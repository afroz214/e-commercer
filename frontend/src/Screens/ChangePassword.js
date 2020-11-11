import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../actions/user'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ChangePassword = ({ history }) => {

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const dispatch = useDispatch()

    const userChangePassword = useSelector(state => state.userChangePassword)
    const { loading, error, success } = userChangePassword

    useEffect(() => {
        if (success) {
            history.push('/profile')
        }
    }, [success, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(changePassword({ currentPassword, newPassword }))
    }

    

    return (
        <section className="py-5 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        {error && <Message variant="danger"> {error} </Message>}
                        <h2 className="mb-4">Change Password</h2>
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Current Password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-block btn-danger">SUBMIT</button>
                        </form>
                        { loading && <Loader /> }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ChangePassword
