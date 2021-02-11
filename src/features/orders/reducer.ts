import {FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAIL} from './constants'

const initialState = {
  loading: false,
  orders: [],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS_START:
      return {...state, loading: true}
    case FETCH_ORDERS_SUCCESS:
      return {...state, loading: false, orders: action.payload}
    case FETCH_ORDERS_FAIL:
      return {...state, loading: false}
    default:
      return state
  }
}
