import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from 'features/auth'

type LogoutProps = {
  logout: () => void
}

type LogoutState = Record<never, any>

class LogoutComponent extends Component<LogoutProps, LogoutState> {
  componentDidMount() {
    this.props.logout()
  }

  render() {
    return <Redirect to="/" />
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
})

export const Logout = connect(null, mapDispatchToProps)(LogoutComponent)
