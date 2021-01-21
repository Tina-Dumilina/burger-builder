import React, {Component} from 'react'
import {Layout} from 'ui/layout'
import {BurgerBuilder} from 'features/burger-builder'
import {ErrorBoundary} from 'ui/error-boundary'
import './index.css'

export class App extends Component {
  render() {
    return (
      <Layout>
        <ErrorBoundary>
          <BurgerBuilder />
        </ErrorBoundary>
      </Layout>
    )
  }
}
