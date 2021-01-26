import React, {Component} from 'react'
import {orderProvider} from 'utils/order-provider'
import {Order} from './ui/order'

type OrderProps = Record<never, any>
type OrderState = {
  loading: boolean
  orders: any[]
}

export class Orders extends Component<OrderProps, OrderState> {
  state = {
    orders: [],
    loading: true,
  }

  componentDidMount() {
    orderProvider
      .get('/orders.json')
      .then((response) => {
        const orders = Object.keys(response.data).reduce<any[]>((acc, key) => {
          acc.push({key, ...response.data[key]})
          return acc
        }, [])
        this.setState({orders: orders})
      })
      .catch((error) => {
        throw new Error('Erorr')
      })
      .finally(() => this.setState({loading: false}))
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order: any) => (
          <Order key={order?.key} ingredients={order.ingredients} price={order.price} />
        ))}
      </div>
    )
  }
}
