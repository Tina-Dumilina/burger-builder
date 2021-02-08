import {MAKE_ORDER_SUCCESS, MAKE_ORDER_FAIL, MAKE_ORDER_START} from './constants'

const initialState = {
  status: 'initial',
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_ORDER_START:
      return {
        ...state,
        status: 'loading',
      }
    case MAKE_ORDER_SUCCESS:
      return {
        ...state,
        status: 'success',
      }
    case MAKE_ORDER_FAIL:
      return {
        ...state,
        status: 'error',
      }
    default:
      return state
  }
}
