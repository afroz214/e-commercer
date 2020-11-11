import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAccount } from '../actions/user'
import Loader from '../components/Loader'
import Message from '../components/Message'

const DeleteAccount = ({ history }) => {

    const dispatch = useDispatch()

    const userDeleteAccount = useSelector(state => state.userDeleteAccount)
    const { loading, error, success } = userDeleteAccount

    useEffect(() => {
        if (success) {
            history.push('/login')
        }
    }, [history, success])

    const deleteAccountHandler = () => {
        dispatch(deleteAccount())
    }

    return (
        <section className="py-5 mt-5">
            <div className="bg-dark py-4">
            <div className="container bg-dark text-white">
                <h2>DELETE ACCOUNT</h2>
            </div>
            </div>
            <div className="container">
                <div className="my-5">
                    {loading && <Loader />}
                    {error && <Message variant="danger"> {error} </Message>}
                </div>
                <p className="lead"><strong>Make Sure Before Delete ? This Cannot Be Undone</strong></p> 
                <button onClick={deleteAccountHandler} className="btn btn-danger btn-lg">CLOSE ACCOUNT</button>    
            </div>
        </section>
    )
}

export default DeleteAccount
