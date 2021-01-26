import React, {Component} from 'react'
import {History} from 'history'
import {Route} from 'react-router-dom'
import {ContactData} from 'features/contact-data'
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
      salad: 1,
      bacon: 1,
      cheese: 1,
      meat: 1,
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
        <Route
          path="/checkout/contact-data"
          render={(props) => <ContactData ingredients={this.state.ingredients} {...props} />}
        />
      </div>
    )
  }
}
