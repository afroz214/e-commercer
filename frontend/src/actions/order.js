import axios from 'axios'
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, USER_ORDER_FAIL, USER_ORDER_REQUEST, USER_ORDER_SUCCESS } from './constants'

export const orderCreate = (datas) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config ={ 
            headers: {
                'Content-Type': 'application/json',
                jwtToken: userInfo.token
            }
        }
        const { data } = await axios.post('/api/orders', datas, config)
        dispatch({ 
            type: CREATE_ORDER_SUCCESS,
            payload: data        
        })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const getOrderById = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ORDER_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config ={ 
            headers: {
                jwtToken: userInfo.token
            }
        }
        const { data } = await axios.get(`/api/orders/${id}`, config)
        dispatch({ 
            type: GET_ORDER_SUCCESS,
            payload: data        
        })
    } catch (error) {
        dispatch({
            type: GET_ORDER_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const ordersUser = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_ORDER_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = { 
            headers: {
                jwtToken: userInfo.token
            }
        }
        const { data } = await axios.get('/api/orders', config)
        dispatch({
            type: USER_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_ORDER_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

