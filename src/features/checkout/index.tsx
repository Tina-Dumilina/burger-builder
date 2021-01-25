import React, {Component} from 'react'
import {History} from 'history'
import {CheckoutSummary} from './ui/checkout-summary'
import {Ingredients} from 'types'

type CheckoutProps = {
  history: History
  location: Location
}

type CheckoutState = {
  ingredients: Record<Ingredients, number>
}

export class Checkout extends Component<CheckoutProps, CheckoutState> {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
  }

  cancelCheckout = () => {
    this.props.history.goBack()
  }

  continueCheckout = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancelCheckout={this.cancelCheckout}
          continueCheckout={this.continueCheckout}
        />
      </div>
    )
  }
}
