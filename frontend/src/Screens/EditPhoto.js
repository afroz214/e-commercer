import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { photoUpdate } from '../actions/user'

const EditPhoto = ({ history }) => {

    const [file, setFile] = useState(null)

    const dispatch = useDispatch()

    const userPhotoUpdate = useSelector(state => state.userPhotoUpdate)
    const { success } = userPhotoUpdate

    const onChangeHandler = (e) => {
         setFile(e.target.files[0])
    }

    useEffect(() => {
        if (success) {
            history.push('/profile')
        }
    }, [success, history])

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('avatar', file)
        dispatch(photoUpdate(formData))
    }

    return (
        <section className="py-5 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h2 className="mb-4">Photo Upload</h2>
                        <form onSubmit={submitHandler}>
                        <input type="file" className="form-control mb-2" onChange={onChangeHandler} />
                        <button type="submit" className="btn btn-block btn-secondary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditPhoto
