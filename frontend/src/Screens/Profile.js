import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProfile } from '../actions/user'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Profile = () => {

    const userProfile = useSelector(state => state.userProfile)
    const { loading, error, profile } = userProfile

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])

    return (
        <section className="py-5 mt-5">
            <div className="container">
                {loading ? <Loader /> : error ? <Message> {error} </Message> : (
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <img src={profile.avatar} className="img-fluid rounded-circle post-img" alt="No Profile Pic" />
                            <Link to="/edit-photo" className="btn btn-primary my-3 btn-block">Photo</Link>
                            <Link to="/change-password" className="btn btn-danger my-3 btn-block">Change Password</Link>
                            <Link to="/delete-account" className="btn btn-danger my-3 btn-block">Close Account</Link>
                        </div>
                        <div className="col-md-8 text-center card card-body h-100 mt-5">
                        <h3> {profile.name} <Link to="/edit-profile" className="fas fa-edit"></Link> </h3>
                        <h4> {profile.email} <Link to="/edit-email" className="fas fa-edit"></Link> </h4>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Profile
