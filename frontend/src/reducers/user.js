import { CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_RESET, CHANGE_PASSWORD_SUCCESS, DELETE_ACCOUNT_FAIL, DELETE_ACCOUNT_REQUEST, DELETE_ACCOUNT_SUCCESS, EMAIL_UPDATE_FAIL, EMAIL_UPDATE_REQUEST, EMAIL_UPDATE_RESET, EMAIL_UPDATE_SUCCESS, GET_PROFILE_FAIL, GET_PROFILE_REQUEST, GET_PROFILE_RESET, GET_PROFILE_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT, PHOTO_UPDATE_FAIL, PHOTO_UPDATE_REQUEST, PHOTO_UPDATE_RESET, PHOTO_UPDATE_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_RESET, REGISTER_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS } from "../actions/constants"

export const userRegister = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case REGISTER_USER_REQUEST:
            return { loading: true }
        case REGISTER_USER_SUCCESS:
            return { loading: false, success: true }
        case REGISTER_USER_FAIL:
            return { loading: false, error: payload }
        case REGISTER_USER_RESET:
            return {}    
        default:
            return state            
    }
}

export const userLogin = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case LOGIN_USER_REQUEST:
            return { loading: true }
        case LOGIN_USER_SUCCESS:
            return { loading: false, userInfo: payload }
        case LOGIN_USER_FAIL:
            return { loading: false, error: payload }
        case LOGOUT:
            return {}    
        default:
            return state            
    }
}

export const userProfile = (state = { profile: { websites: {} } }, action) => {
    const { type, payload } = action
    switch(type) {
        case GET_PROFILE_REQUEST:
            return { ...state, loading: true }
        case GET_PROFILE_SUCCESS:
            return { loading: false, profile: payload }
        case GET_PROFILE_FAIL:
            return { loading: false, error: payload }
        case GET_PROFILE_RESET:
            return { profile: {} }    
        default:
            return state            
    }
}

export const userEmailUpdate = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case EMAIL_UPDATE_REQUEST:
            return { loading: true }
        case EMAIL_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case EMAIL_UPDATE_FAIL:
            return { loading: false, error: payload }
        case EMAIL_UPDATE_RESET:
            return {}
        default:
            return state                
    }
}

export const userPhotoUpdate = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case PHOTO_UPDATE_REQUEST:
            return { loading: true }
        case PHOTO_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case PHOTO_UPDATE_FAIL:
            return { loading: false, error: payload }
        case PHOTO_UPDATE_RESET:
            return {}
        default:
            return state                
    }
}

export const userChangePassword = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case CHANGE_PASSWORD_REQUEST:
            return { loading: true }
        case CHANGE_PASSWORD_SUCCESS:
            return { loading: false, success: true }
        case CHANGE_PASSWORD_FAIL:
            return { loading: false, error: payload }
        case CHANGE_PASSWORD_RESET:
            return {}
        default:
            return state                
    }
}


export const userDeleteAccount = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case DELETE_ACCOUNT_REQUEST:
            return { loading: true }
        case DELETE_ACCOUNT_SUCCESS:
            return { loading: false, success: true }
        case DELETE_ACCOUNT_FAIL:
            return { loading: false, error: payload }
        default:
            return state                
    }
}

export const userUpdate = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case UPDATE_USER_REQUEST:
            return { loading: true }
        case UPDATE_USER_SUCCESS:
            return { loading: false, success: true }
        case UPDATE_USER_FAIL:
            return { loading: false, error: payload }
        case UPDATE_USER_RESET:
            return {}    
        default:
            return state                
    }
}
