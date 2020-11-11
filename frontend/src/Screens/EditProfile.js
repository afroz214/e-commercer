import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_USER_RESET } from '../actions/constants'
import { getProfile, updateUser } from '../actions/user'
import Loader from '../components/Loader'

const EditProfile = ({ history }) => {

    const userProfile = useSelector(state => state.userProfile)
    const { profile } = userProfile

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading, success, error } = userUpdate

    const [name, setName] = useState(profile.name)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!profile.name) {
            dispatch(getProfile())
        } else {
            setName(profile.name)
        }
    }, [dispatch, profile])

    if (success) {
        history.push('/profile')
        dispatch({ type: UPDATE_USER_RESET })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ name }))
    }

    return (
        <section className="py-5 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h2 className="mb-3">Edit Profile</h2>
                        <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <button className="btn btn-primary">Submit</button>
                        </form>
                        {loading && <Loader />}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditProfile
