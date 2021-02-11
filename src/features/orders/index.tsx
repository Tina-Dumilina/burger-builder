import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Loading} from 'ui/loading'
import {Order} from './ui/order'
import {fetchOrders} from './actions'

type OrderProps = {
  orders: any[]
  loading: boolean
  token: string
  userId: string
  fetchOrders: (token: string, userId: string) => void
}

type OrderState = Record<never, any>

class OrdersComponent extends Component<OrderProps, OrderState> {
  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId)
  }

  render() {
    return this.props.loading ? (
      <Loading />
    ) : (
      <div>
        {this.props.orders?.map((order: any) => (
          <Order key={order?.key} ingredients={order.ingredients} price={order.price} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders.orders,
  loading: state.orders.loading,
  token: state.auth.token,
  userId: state.auth.userId,
})

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
})

export const Orders = connect(mapStateToProps, mapDispatchToProps)(OrdersComponent)
export {reducer} from './reducer'
