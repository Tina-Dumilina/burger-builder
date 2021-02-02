import React, {Component} from 'react'
import {History} from 'history'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {ContactData} from 'features/contact-data'
import {CheckoutSummary} from './ui/checkout-summary'
import {Ingredients} from 'types'

type CheckoutProps = {
  history: History
  location: Location
  ingredients: Record<Ingredients, number>
}

type CheckoutState = Record<never, never>

class CheckoutComponent extends Component<CheckoutProps, CheckoutState> {
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
          ingredients={this.props.ingredients}
          cancelCheckout={this.cancelCheckout}
          continueCheckout={this.continueCheckout}
        />
        <Route path="/checkout/contact-data" component={ContactData} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.burger.ingredients,
})

export const Checkout = connect(mapStateToProps)(CheckoutComponent)
