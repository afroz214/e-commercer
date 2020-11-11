import axios from 'axios'
import { CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_RESET, CHANGE_PASSWORD_SUCCESS, DELETE_ACCOUNT_FAIL, DELETE_ACCOUNT_REQUEST, DELETE_ACCOUNT_SUCCESS, EMAIL_UPDATE_FAIL, EMAIL_UPDATE_REQUEST, EMAIL_UPDATE_RESET, EMAIL_UPDATE_SUCCESS, GET_PROFILE_FAIL, GET_PROFILE_REQUEST, GET_PROFILE_RESET, GET_PROFILE_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT, PHOTO_UPDATE_REQUEST, PHOTO_UPDATE_RESET, PHOTO_UPDATE_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_RESET, REGISTER_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from './constants'

export const registeraUser = (datas) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users/register', datas, config)
        dispatch({ type: REGISTER_USER_SUCCESS })
        dispatch({ type: LOGIN_USER_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const loginUser = (datas) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_USER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users/login', datas, config)
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const getProfile = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_PROFILE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                jwtToken: userInfo.token
            }
        }
        const { data } = await axios.get('/api/users/profile', config)
        dispatch({
            type: GET_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_PROFILE_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const emailUpdate = (datas) => async (dispatch, getState) => {
    try {
        dispatch({ type: EMAIL_UPDATE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                jwtToken: userInfo.token
            }
        }
        await axios.put('/api/users', datas, config)
        dispatch({ type: EMAIL_UPDATE_SUCCESS })
        dispatch({ type: EMAIL_UPDATE_RESET })
    } catch (error) {
        dispatch({
            type: EMAIL_UPDATE_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const photoUpdate = (datas) => async (dispatch, getState) => {
    try {
        dispatch({ type: PHOTO_UPDATE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                jwtToken: userInfo.token
            }
        }
        await axios.put('/api/users/photoupload', datas, config)
        dispatch({ type: PHOTO_UPDATE_SUCCESS })
        dispatch({ type: PHOTO_UPDATE_RESET })
    } catch (error) {
        dispatch({
            type: PHOTO_UPDATE_RESET,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const changePassword = (datas) => async (dispatch, getState) => {
    try {
        dispatch({ type: CHANGE_PASSWORD_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                jwtToken: userInfo.token
            }
        }
        await axios.put('/api/users/changepassword', datas, config)
        dispatch({ type: CHANGE_PASSWORD_SUCCESS })
        dispatch({ type: CHANGE_PASSWORD_RESET })
    } catch (error) {
        dispatch({
            type: CHANGE_PASSWORD_RESET,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const deleteAccount = () => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_ACCOUNT_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config ={
            headers: {
                jwtToken: userInfo.token
            }
        }
        await axios.delete('/api/users', config)
        dispatch({ type: DELETE_ACCOUNT_SUCCESS })
        dispatch(logout())
    } catch (error) {
        dispatch({
            type: DELETE_ACCOUNT_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const updateUser = (datas) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                jwtToken: userInfo.token
            }
        }
        const { data } = await axios.put('/api/users/website', datas, config)
        dispatch({ type: UPDATE_USER_SUCCESS })
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}



export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: GET_PROFILE_RESET })
    dispatch({ type: REGISTER_USER_RESET })
    dispatch({ type: LOGOUT })
}