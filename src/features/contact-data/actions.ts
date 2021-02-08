import {orderProvider} from 'utils/order-provider'
import {MAKE_ORDER_SUCCESS, MAKE_ORDER_FAIL, MAKE_ORDER_START} from './constants'

export const makeOrderStart = () => ({type: MAKE_ORDER_START})

export const makeOrder = (data) => {
  return (dispatch) => {
    dispatch(makeOrderStart())
    orderProvider
      .post('/orders.json', data)
      .then((response) => dispatch(makeOrderSuccess(response.data.name, data)))
      .catch((error) => dispatch(makeOrderFail(error)))
  }
}

export const makeOrderSuccess = (id, data) => ({
  type: MAKE_ORDER_SUCCESS,
  payload: {id, data},
})

export const makeOrderFail = (error) => ({type: MAKE_ORDER_FAIL, payload: error})
