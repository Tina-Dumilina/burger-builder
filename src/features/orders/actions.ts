import {orderProvider} from 'utils/order-provider'
import {FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAIL} from './constants'

function adaptOrders(data) {
  return Object.keys(data).reduce<any[]>((acc, key) => {
    acc.push({key, ...data[key]})
    return acc
  }, [])
}
export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart())
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
    orderProvider
      .get(`/orders.json${queryParams}`)
      .then((response) => dispatch(fetchOrdersSuccess(adaptOrders(response.data))))
      .catch((error) => dispatch(fetchOrdersFail(error)))
  }
}

export const fetchOrdersStart = () => ({type: FETCH_ORDERS_START})

export const fetchOrdersSuccess = (data) => ({type: FETCH_ORDERS_SUCCESS, payload: data})

export const fetchOrdersFail = (error) => ({type: FETCH_ORDERS_FAIL, payload: error})
