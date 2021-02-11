import {MAKE_ORDER_SUCCESS, MAKE_ORDER_FAIL, MAKE_ORDER_START} from './constants'

const initialState = {
  loading: false,
  finished: false,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_ORDER_START:
      return {
        ...state,
        loading: true,
      }
    case MAKE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        finished: true,
      }
    case MAKE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
