import React, {Component} from 'react'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {Layout} from 'ui/layout'
import {Checkout} from 'features/checkout'
import {BurgerBuilder} from 'features/burger-builder'
import {Orders} from 'features/orders'
import {Auth, authCheckState} from 'features/auth'
import {Logout} from 'features/logout'
import {ErrorBoundary} from 'ui/error-boundary'
import './index.css'

type AppProps = {
  authCheckState: () => void
  isAuthenticated: boolean
}

type AppState = Record<never, any>
class AppComponent extends Component<AppProps, AppState> {
  componentDidMount() {
    this.props.authCheckState()
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <ErrorBoundary>
            <Switch>
              <Route path="/" exact component={BurgerBuilder} />
              {this.props.isAuthenticated && (
                <>
                  <Route path="/checkout" component={Checkout} />
                  <Route path="/orders" component={Orders} />
                  <Route path="/logout" component={Logout} />
                </>
              )}
              {!this.props.isAuthenticated && <Route path="/auth" component={Auth} />}
              <Redirect to="/" />
            </Switch>
          </ErrorBoundary>
        </Layout>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
})

const mapDispatchToProps = (dispatch) => ({
  authCheckState: () => dispatch(authCheckState()),
})

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent)
