import {AUTH_START, AUTH_FAIL, AUTH_SUCCESS, LOGOUT} from './constants'

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {...state, loading: true, error: null}
    case AUTH_FAIL:
      return {...state, error: action.payload, loading: false}
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload.token,
        userId: action.payload.userId,
      }
    case LOGOUT:
      return {...state, token: null, userId: null}
    default:
      return state
  }
}
