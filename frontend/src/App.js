import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import store from './store'
import Navbar from './components/Navbar'
import Register from './Screens/Register'
import Login from './Screens/Login'
import Profile from './Screens/Profile'
import Settings from './Screens/Settings'
import EditProfile from './Screens/EditProfile'
import EditEmail from './Screens/EditEmail'
import EditPhoto from './Screens/EditPhoto'
import ChangePassword from './Screens/ChangePassword'
import DeleteAccount from './Screens/DeleteAccount'
import Products from './Screens/Products/Products'
import Product from './Screens/Products/Product'
import Cart from './Screens/Products/Cart'
import Shipping from './Screens/Products/Shipping'
import Payment from './Screens/Products/Payment'
import PlaceOrder from './Screens/Products/PlaceOrder'
import OrderScreen from './Screens/Products/OrderScreen'
import UserOrdersList from './Screens/Products/UserOrdersList'
import AddProduct from './Screens/Products/AddProduct'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Navbar />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/settings" exact component={Settings} />
      <Route path="/edit-profile" exact component={EditProfile} />
      <Route path="/edit-email" exact component={EditEmail} />
      <Route path="/edit-photo" exact component={EditPhoto} />
      <Route path="/change-password" exact component={ChangePassword} />
      <Route path="/delete-account" exact component={DeleteAccount} />
      <Route path="/products" exact component={Products} />
      <Route path="/search/:keyword" exact component={Products} />
      <Route path="/page/:pageNumber" exact component={Products} />
      <Route path="/search/:keyword/page/:pageNumber" exact component={Products} />
      <Route path="/product/:id" exact component={Product} />
      <Route path="/cart/:id?" exact component={Cart} />
      <Route path="/shipping" exact component={Shipping} />
      <Route path="/payment" exact component={Payment} />
      <Route path="/placeorder" exact component={PlaceOrder} />
      <Route path="/order/:id" exact component={OrderScreen} />
      <Route path="/orderlist" exact component={UserOrdersList} />
      <Route path="/create-product" exact component={AddProduct} />
      </BrowserRouter>
    </Provider>
  )
}

export default App
