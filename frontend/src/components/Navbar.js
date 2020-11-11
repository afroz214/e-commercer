import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Route } from 'react-router-dom'
import { logout } from '../actions/user'
import SearchBox from './SearchBox'

const Navbar = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark p-0">
           <div className="container">
             <a href="/#" className="navbar-brand">Shopping App</a>
             <Route render={({ history }) => <SearchBox history={history} />} />
             <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                 <span className="navbar-toggler-icon"></span>
             </button>
             <div className="navbar-collapse collapse" id="navbarCollapse">
                 <ul className="navbar-nav ml-auto text-secondary">
                     {userInfo ? (
                         <>
                         <NavLink to="/products" exact className="nav-item nav-link mx-2">Products</NavLink>
                         { userInfo && userInfo.user && (
                             <li className="nav-item dropdown">
                                 <a href="#" className="nav-link dropdown-toggle text-white mx-2" data-toggle="dropdown"> {userInfo.user.name} </a>
                                <div className="dropdown-menu">
                                    <Link to="/profile" className="dropdown-item">Profile</Link>
                                    <Link to="/cart" className="dropdown-item">Cart</Link>
                                    <Link to="/orderlist" className="dropdown-item">Order List</Link>
                                </div>
                             </li>
                         ) }
                         <NavLink onClick={logoutHandler} to="/login" exact className="nav-item nav-link">Logout</NavLink>
                         </>                     
                     ) : (
                         <>
                         <NavLink to="/products" exact className="nav-item nav-link">Products</NavLink> 
                        <NavLink to="/register" exact className="nav-item nav-link mx-2">Register</NavLink>
                        <NavLink to="/login" exact className="nav-item nav-link">Login</NavLink>
                        </>
                     )}
                 </ul>
             </div>
           </div> 
        </nav>
    )
}

export default Navbar




