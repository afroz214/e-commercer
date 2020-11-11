import React, { useState } from 'react'

const SearchBox = ({ history }) => {

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/products')
        }
    }

    return (
        <div>
            <form className="inline mt-3 ml-4" onSubmit={submitHandler}>
            <div className="row no-gutters">
                <div className="col-9">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search..." value={keyword} onChange={e => setKeyword(e.target.value)} />
                    </div>
                </div>
                <div className="col-1 ml-2">
                    <button type="submit" className="btn btn-outline-success">Search</button>
                </div>
            </div>
        </form>
        </div>
    )
}

export default SearchBox
