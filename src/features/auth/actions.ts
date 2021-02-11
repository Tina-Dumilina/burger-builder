import {authProvider} from 'utils/auth-provider'
import {AUTH_START, AUTH_FAIL, AUTH_SUCCESS, LOGOUT} from './constants'

export const authStart = () => ({type: AUTH_START})

export const authSuccess = (token, userId) => ({
  type: AUTH_SUCCESS,
  payload: {token, userId},
})

export const authFail = (error) => ({type: AUTH_FAIL, payload: error})

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')
  return {type: LOGOUT}
}

export const checkAuthTimeout = (expiresIn) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, expiresIn)
  }
}

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart())
    const url = isSignUp
      ? '/accounts:signUp?key=AIzaSyCvRwRLjeC4xjvL-dt3wMSlUfHy6mdUAu4'
      : '/accounts:signInWithPassword?key=AIzaSyCvRwRLjeC4xjvL-dt3wMSlUfHy6mdUAu4'
    authProvider
      .post(url, {
        email,
        password,
        returnSecureToken: true,
      })
      .then((response) => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        const token = response.data.idToken
        const userId = response.data.localId
        localStorage.setItem('token', token)
        localStorage.setItem('expirationDate', expirationDate.toString())
        localStorage.setItem('userId', userId)
        dispatch(authSuccess(token, userId))
        dispatch(checkAuthTimeout(response.data.expiresIn * 1000))
      })
      .catch((error) => dispatch(authFail(error.response)))
  }
}

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate =
        localStorage.getItem('expirationDate') !== null
          ? new Date(localStorage.getItem('expirationDate') as string)
          : null
      if (expirationDate !== null && expirationDate > new Date()) {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId))
        dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()))
      } else {
        dispatch(logout())
      }
    }
  }
}
