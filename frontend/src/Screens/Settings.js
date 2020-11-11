import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProfile } from '../actions/user'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Settings = () => {

    const dispatch = useDispatch()

    const userProfile = useSelector(state => state.userProfile)
    const { profile, loading, error } = userProfile

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])

    return (
        <section className="py-5">
            <div className="container">
                <div className="row">
                    { loading ? <Loader /> : error ? <Message> {error} </Message> : (
                        <div className="col-md-2 card card-body mx-auto">
                        <div className="text-center">
                            <img src={profile.avatar} className="img-fluid rounded-circle w-100" alt="No-Image" />
                            <h4 className="my-2"> {profile.name} </h4>
                            <h5 className="my-2"> {profile.email} </h5>
                            <Link to="/edit-profile" className="btn btn-block btn-dark">Edit Profile</Link>
                        </div>
                      </div>
                    ) }
                </div>
            </div>
        </section>
    )
}

export default Settings
