import React, {Component} from 'react'
import {Layout} from 'ui/layout'
import {BurgerBuilder} from 'features/burger-builder'
import './index.css'
export class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder />
      </Layout>
    )
  }
}
