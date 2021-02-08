import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Loading} from 'ui/loading'
import {Order} from './ui/order'
import {fetchOrders} from './actions'

type OrderProps = {
  orders: any[]
  loading: boolean
  fetchOrders: () => void
}

type OrderState = Record<never, any>

class OrdersComponent extends Component<OrderProps, OrderState> {
  componentDidMount() {
    this.props.fetchOrders()
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
})

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: () => dispatch(fetchOrders()),
})

export const Orders = connect(mapStateToProps, mapDispatchToProps)(OrdersComponent)
export {reducer} from './reducer'
