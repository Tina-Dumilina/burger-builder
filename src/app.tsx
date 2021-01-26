import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {Layout} from 'ui/layout'
import {Checkout} from 'features/checkout'
import {BurgerBuilder} from 'features/burger-builder'
import {Orders} from 'features/orders'
import {ErrorBoundary} from 'ui/error-boundary'
import './index.css'

export class App extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <ErrorBoundary>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
          </ErrorBoundary>
        </Layout>
      </BrowserRouter>
    )
  }
}
